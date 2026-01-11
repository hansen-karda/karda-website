const { getCliClient } = require('sanity/cli')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

// INITIALIZE CLIENT
// Use CLI Client which inherits 'sanity exec --with-user-token' auth
const client = getCliClient({ apiVersion: '2023-05-03' })

const TARGET_URL = 'https://surplusrecord.com/listing/abb-2500-kva-pad-mount-distribution-transformers-34500-575y-332-3-phase-type-sps2-145-63-3-627522/';

// Stealth Headers to mimic a real browser
const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://google.com'
};

async function hunt() {
    console.log(`\n--- INITIATING HUNTER PROTOCOL ---`);
    console.log(`Target: ${TARGET_URL}`);

    try {
        // 1. EXECUTE SCRAPE
        console.log('Scraping Target...');
        const res = await fetch(TARGET_URL, { headers: HEADERS });

        if (!res.ok) {
            console.error(`SCRAPE BLOCKED: HTTP ${res.status}`);
            return;
        }

        const html = await res.text();
        const $ = cheerio.load(html);

        // 2. EXTRACT INTELLIGENCE
        // Title: Usually in h1 entry-title
        const title = $('h1').first().text().trim();
        if (!title) throw new Error('Could not find listing title');

        // Price: Look for typical patterns
        // Note: Surplus Record prices are often buried or "Request Quote", but we'll try patterns.
        let price = 0;
        const priceText = $('*:contains("$")').filter((i, el) => /^\$[\d,]+/.test($(el).text().trim())).first().text().trim();

        // Regex extraction for price anywhere in body text reasonable
        const priceMatch = html.match(/\$[\d,]+\d{2}/);
        if (priceMatch) {
            price = parseFloat(priceMatch[0].replace(/[$,]/g, ''));
        }

        // Extract Tech Specs from Table
        const specs = {};
        $('table tr').each((i, row) => {
            const key = $(row).find('td, th').eq(0).text().trim().toLowerCase();
            const val = $(row).find('td, th').eq(1).text().trim();
            if (key) specs[key] = val;
        });

        // Location 
        let location = 'USA';
        // Surplus Record usually puts location in a table row or adjacent text
        // Try finding "Location:"
        const locationMatch = $('body').text().match(/Location:\s*([A-Za-z\s,]+)/);
        if (locationMatch && locationMatch[1]) {
            location = locationMatch[1].trim().toUpperCase();
        } else if (specs['location']) {
            location = specs['location'].toUpperCase();
        }

        const primaryVoltage = specs['primary voltage'] || '34.5kV';
        const secondaryVoltage = specs['secondary voltage'] || '575V';
        const capacity = specs['capacity'] || '2500 kVA';

        // Image Extraction (Meta Tags are most reliable)
        const imageUrl = $('meta[property="og:image"]').attr('content') ||
            $('.woocommerce-product-gallery__image a').attr('href');

        console.log('Intelligence Acquired:');
        console.log(`Title: ${title}`);
        console.log(`Price: $${price}`);
        console.log(`Loc: ${location}`);
        console.log(`Img: ${imageUrl || 'None'}`);

        // 3. UPLOAD ASSET DOCUMENT

        const doc = {
            _type: 'inventory',
            id: 'TR-SURPLUS-2500',
            name: '2500 kVA ABB SURPLUS',
            title: title,
            description: `Auto-captured from Surplus Record. ${capacity} unit. Located in ${location}.`,
            status: 'AVAILABLE',
            price: price || 95000, // Fallback if scrape fails
            primary_voltage: primaryVoltage,
            secondary_voltage: secondaryVoltage,
            voltage: `${primaryVoltage} -> ${secondaryVoltage}`,
            impedance: '5.75%',
            location: location,
            weight: '12,500 LBS',
            mfgYear: '2019',
            lead_time: 'Immediate',
            specs: { efficiency: 98.5, load: 100, shielding: 60 },
        };

        console.log('Creating Asset Record...');

        // Attempt Image Upload
        let imageAssetId = null;
        if (imageUrl) {
            console.log(`Attempting visual capture...`);
            try {
                const imgRes = await fetch(imageUrl, { headers: HEADERS });
                if (imgRes.ok) {
                    const buffer = await imgRes.buffer();
                    const asset = await client.assets.upload('image', buffer, { filename: 'hunter_asset.jpg' });
                    imageAssetId = asset._id;
                    console.log(`Visual Captured: ${imageAssetId}`);
                }
            } catch (e) {
                console.warn(`Visual capture failed: ${e.message}`);
            }
        }

        if (imageAssetId) {
            doc.images = [{
                _type: 'image',
                key: 'main',
                asset: { _type: 'reference', _ref: imageAssetId }
            }];
        }

        // SAVE TO SANITY
        const sanityRes = await client.createOrReplace({
            _id: 'inventory-TR-SURPLUS-2500',
            ...doc
        });

        console.log(`Success: Asset Created (${sanityRes._id})`);
        console.log('--- MISSION COMPLETE ---');

    } catch (err) {
        console.error('HUNTER FAILED:', err.message);
    }
}

hunt();
