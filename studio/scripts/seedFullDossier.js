const { createClient } = require('@sanity/client');
const fetch = require('node-fetch'); // CommonJS import

// Initialize Client (Auth needed for write)
const client = createClient({
    projectId: 'l2w4m5p0',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN,
})

// --- THE ASSET DOSSIER ---
const targetAsset = {
    name: '2500 kVA ABB INDUSTRIAL 575V',
    title: 'ABB SPS2 34.5kV Industrial Pad-Mount',
    description: 'Heavy-duty ABB SPS2 Series unit. High-voltage 34.5kV Primary to 575Y/332V Industrial Secondary. Ideal for heavy manufacturing, mining, or 600V-class facility expansions. 3-Phase, Loop Feed configuration.',
    price: 95000,
    status: 'AVAILABLE',
    voltage: '34.5kV Delta -> 575Y/332V',
    impedance: '5.75%',
    location: 'PITTSBURGH, PA',
    weight: '13,500 LBS',
    mfgYear: '2015',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Padmount_transformer_open.jpg/800px-Padmount_transformer_open.jpg',
    pdfUrl: 'http://www.debenhamenergy.com/Links/ABB_Transformer_Brochure.pdf'
};

async function uploadImageFromUrl(url, name) {
    if (!url) return null;
    console.log(`Downloading: ${name}...`);
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
        const buffer = await res.buffer();
        const asset = await client.assets.upload('image', buffer, { filename: `${name}.jpg` });
        console.log(`Image Uploaded: ${asset._id}`);
        return asset._id;
    } catch (err) {
        console.error(`Image failure: ${err.message}`);
        return null; // Don't block whole seed
    }
}

async function uploadPdfFromUrl(url, name) {
    if (!url) return null;
    console.log(`Downloading PDF: ${name}...`);
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
        const buffer = await res.buffer();
        const asset = await client.assets.upload('file', buffer, { filename: `${name}.pdf` });
        console.log(`PDF Uploaded: ${asset._id}`);
        return asset._id;
    } catch (err) {
        console.error(`PDF failure: ${err.message}`);
        return null;
    }
}

async function seedDossier() {
    console.log('--- EXECUTING OPERATION: ASSET CAPTURE (ABB 2500) ---');

    try {
        // 1. UPLOAD ARTIFACTS
        const imageId = await uploadImageFromUrl(targetAsset.imageUrl, 'ABB-2500-Padmount');
        // Schema might not support PDF file field nicely yet generally, but we'll upload the asset.
        const pdfId = await uploadPdfFromUrl(targetAsset.pdfUrl, 'ABB-Brochure');

        // 2. CONSTRUCT DOCUMENT
        const doc = {
            _type: 'inventory',
            // Generate deterministic ID
            id: 'TR-ABB-2500-PA',
            name: 'ABB',
            type: targetAsset.title,

            // Core
            price: `$${targetAsset.price.toLocaleString()}`,
            status: targetAsset.status,

            // Electrical
            kva: '2500',
            primary_voltage: '34.5kV Delta',
            secondary_voltage: '575Y/332V',
            impedance: targetAsset.impedance,
            frequency: '60Hz',
            cooling: 'ONAN',

            // Physical
            mfgYear: targetAsset.mfgYear,
            location: targetAsset.location,
            weight: targetAsset.weight,
            condition: 'RECONDITIONED',
            lead_time: 'Immediate',

            // Text
            desc: targetAsset.description,

            // Specs Matrix (Inferred)
            specs: { efficiency: 98.5, load: 100, shielding: 65 },

            // Media
            images: imageId ? [{
                _type: 'image',
                asset: { _type: 'reference', _ref: imageId }
            }] : [],

            // Note: If schema doesn't have a 'brochure' field, this might be ignored or error if strict.
            // We'll stick to images for now as primary visual.
        };

        // 3. CREATE DOCUMENT
        console.log('Creating Asset Record...');
        const res = await client.createOrReplace({
            _id: `inventory-TR-ABB-2500-PA`, // Sanity doc ID
            ...doc
        });

        console.log(`--- ASSET SECURED: ${res.id} ---`);
        console.log('--- MISSION COMPLETE ---');

    } catch (err) {
        console.error('CAPTURE FAILED:', err.message);
    }
}

seedDossier();
