const { getCliClient } = require('sanity/cli')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

// INITIALIZE CLIENT
const client = getCliClient({ apiVersion: '2023-05-03' })

const TARGET_URL = 'https://surplusrecord.com/listing/abb-2500-kva-pad-mount-distribution-transformers-34500-575y-332-3-phase-type-sps2-145-63-3-627522/';

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

async function executeDeepScrape() {
    console.log(`--- INITIATING DEEP DATA SCRAPE ---`);
    console.log(`Target: ${TARGET_URL}`);

    try {
        // 1. Scrape Page
        const res = await fetch(TARGET_URL, { headers: HEADERS });
        if (!res.ok) throw new Error(`Scrape Blocked: ${res.status}`);

        const html = await res.text();
        const $ = cheerio.load(html);

        // 2. Parse Core Info
        const title = $('h1').first().text().trim();
        const desc = $('.entry-content').text().trim() ||
            $('div[itemprop="description"]').text().trim() ||
            '';

        // Parse Price
        let price = 'Inquire';
        const priceMatch = html.match(/\$[\d,]+\d{2}/);
        if (priceMatch) {
            price = parseInt(priceMatch[0].replace(/[$,]/g, ''));
        }

        // 3. Parse Specifications Table
        const specs = {};
        $('table tr').each((i, row) => {
            const key = $(row).find('td, th').eq(0).text().trim().toLowerCase();
            const val = $(row).find('td, th').eq(1).text().trim();
            if (key) specs[key] = val;
        });

        // 4. regex Intelligence for Deep Specs
        const descLower = desc.toLowerCase();

        const deepSpecs = {
            primaryVoltage: specs['primary voltage'] || '34.5kV',
            secondaryVoltage: specs['secondary voltage'] || '575Y/332V',
            kva: 2500, // inferred from URL/Title
            frequency: specs['frequency'] || '60Hz',
            phase: specs['phase'] || '3-Phase',

            // Intelligence Extraction
            windingMaterial: (descLower.includes('copper') ? 'Copper/Copper' :
                (descLower.includes('aluminum') ? 'Aluminum' : 'Standard')),

            oilType: (descLower.includes('mineral oil') ? 'Mineral Oil' :
                (descLower.includes('fr3') ? 'FR3 (Vegetable Oil)' : 'Mineral Oil Type II')),

            coolingClass: specs['cooling'] || 'ONAN',

            productionStatus: (descLower.includes('new surplus') ? 'New Surplus' : 'Reconditioned')
        };

        console.log('Deep Data Extracted:', deepSpecs);

        // 5. Update Sanity
        // We will upsert using a consistent ID for the ABB unit
        const doc = {
            _type: 'inventory',
            id: 'TR-ABB-2500-PA', // Force this ID
            name: '2500 kVA ABB SURPLUS',
            title: title || 'ABB 2500 kVA Padmount',
            description: desc.substring(0, 200) + '...', // Truncate for UI
            price: price,
            status: 'AVAILABLE',

            // Map Deep Specs
            techSpecs: deepSpecs,

            // Basic Fields
            primary_voltage: deepSpecs.primaryVoltage,
            secondary_voltage: deepSpecs.secondaryVoltage,
            impedance: '5.75%',
            location: 'PITTSBURGH, PA',
            weight: '13,500 LBS',
            mfgYear: '2015',

            // Performance Specs (Matrix)
            specs: { efficiency: 99.1, load: 100, shielding: 65 }
        };

        console.log('Uploading Intelligence...');

        const result = await client.createOrReplace({
            _id: 'inventory-TR-ABB-2500-PA',
            ...doc
        });

        console.log(`--- MISSION SUCCESS: ${result._id} ---`);

    } catch (err) {
        console.error('SCRAPE FAILED:', err.message);
    }
}

executeDeepScrape();
