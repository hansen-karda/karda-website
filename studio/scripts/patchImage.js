const { getCliClient } = require('sanity/cli')
const fetch = require('node-fetch')

// Initialize Client
const client = getCliClient({ apiVersion: '2023-05-03' })

const ASSET_ID = 'TR-ABB-2500-PA';
const MAIN_URL = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Padmount_transformer_open.jpg';
const BACKUP_URL = 'https://placehold.co/800x600/102020/FBBF24.png?text=ABB+Padmount';

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

async function executeAirdrop() {
    console.log(`--- INITIATING VISUAL AIRDROP PROTOCOL ---`);
    console.log(`Target: ${ASSET_ID}`);

    try {
        // 1. Locate Document
        const query = `*[_type == "inventory" && id == "${ASSET_ID}"][0]._id`;
        const docId = await client.fetch(query);

        if (!docId) throw new Error(`Asset ${ASSET_ID} not found.`);

        // 2. Download Image (Try Main, then Backup)
        let res;
        let filename;

        console.log(`Attempting Main Frequency: ${MAIN_URL}`);
        try {
            res = await fetch(MAIN_URL, { headers: HEADERS });
            if (!res.ok) throw new Error(`Primary status: ${res.status}`);
            filename = 'abb_padmount_real.jpg';
        } catch (e) {
            console.warn(`Primary Uplink Failed: ${e.message}`);
            console.log(`Switching to Backup Generator: ${BACKUP_URL}`);
            res = await fetch(BACKUP_URL); // No headers needed for placeholder
            if (!res.ok) throw new Error(`Backup status: ${res.status}`);
            filename = 'abb_padmount_backup.png';
        }

        // 3. Upload to Sanity
        console.log('Uploading payload to Sanity Grid...');
        const imageAsset = await client.assets.upload('image', res.body, { filename });

        console.log(`Asset Locked: ${imageAsset._id}`);

        // 4. Patch Document
        console.log('Linking asset to inventory record...');
        await client.patch(docId)
            .set({
                images: [{
                    _type: 'image',
                    _key: 'main_visual_airdrop_' + Date.now(),
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset._id
                    }
                }]
            })
            .commit();

        console.log(`--- AIRDROP SUCCESSFUL ---`);

    } catch (err) {
        console.error('AIRDROP FAILED:', err.message);
    }
}

executeAirdrop();
