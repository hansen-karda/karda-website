const { getCliClient } = require('sanity/cli')
const fetch = require('node-fetch')

// 1. INITIALIZE CLIENT (Using CLI Credentials)
// This automatically uses the token from 'sanity login'
const client = getCliClient({ apiVersion: '2023-05-03' })

// --- DATA ---
const asset = {
    _type: 'inventory',
    name: '2500 kVA ABB INDUSTRIAL',
    title: 'ABB SPS2 34.5kV Industrial Pad-Mount',
    description: 'Heavy-duty ABB SPS2 Series unit. High-voltage 34.5kV Primary to 575Y/332V Industrial Secondary. Ideal for heavy manufacturing or mining. Verified Surplus Record Listing.',
    status: 'AVAILABLE',
    price: 95000,
    voltage: '34.5kV Delta -> 575Y/332V',
    impedance: '5.75%',
    location: 'PITTSBURGH, PA',
    weight: '13,500 LBS',
    mfgYear: '2015',
    condition: 'RECONDITIONED',
    lead_time: 'Immediate',
    type: 'Transformer',
    primary_voltage: '34.5kV Delta',
    secondary_voltage: '575Y/332V',
    kva: '2500',
    cooling: 'ONAN',
    frequency: '60Hz',

    // Specs Matrix
    specs: { efficiency: 98.8, load: 100, shielding: 65 },

    // URLs to fetch
    imageUrl: 'https://images.unsplash.com/photo-1565514020125-028f9c182245?auto=format&fit=crop&q=80&w=1000'
};

async function resetAndSeed() {
    console.log('--- INITIATING SYSTEM RESET ---');

    try {
        // STEP 1: THE PURGE
        console.log('Fetching existing records...');
        const existing = await client.fetch('*[_type == "inventory"]{_id}');

        if (existing.length > 0) {
            console.log(`DELETING ${existing.length} RECORDS...`);
            const tx = client.transaction();
            existing.forEach(doc => tx.delete(doc._id));
            await tx.commit();
            console.log('Purge Complete. Database Grid Clear.');
        } else {
            console.log('Database already empty.');
        }

        // STEP 2: IMAGE UPLINK
        let imageId = null;
        if (asset.imageUrl) {
            console.log(`Acquiring visual data from: ${asset.imageUrl}`);
            const res = await fetch(asset.imageUrl);
            if (res.ok) {
                const buffer = await res.buffer();
                const imageAsset = await client.assets.upload('image', buffer, { filename: 'abb_padmount_visual.jpg' });
                imageId = imageAsset._id;
                console.log(`Visual Data Locked: ${imageId}`);
            } else {
                console.warn('Visual Uplink Failed: Signal lost.');
            }
        }

        // STEP 3: THE RE-SEED
        console.log('Creating Master Asset Record...');

        const doc = {
            ...asset,
            // Strip the utility URL field from the final doc
            imageUrl: undefined,

            // Generate Valid ID
            // "TR-ABB-2500"
            id: 'TR-ABB-2500-PA',

            // Attach Image Reference
            images: imageId ? [{
                _type: 'image',
                key: 'main_visual',
                asset: { _type: 'reference', _ref: imageId }
            }] : []
        };

        const result = await client.create(doc);
        console.log(`--- ASSET ONLINE: ${result.id} ---`);
        console.log('SYSTEM RESET COMPLETE.');

    } catch (err) {
        console.error('SYSTEM FAILURE:', err.message);
        console.error(err);
    }
}

resetAndSeed();
