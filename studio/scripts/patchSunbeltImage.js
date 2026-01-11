const { getCliClient } = require('sanity/cli')
const fetch = require('node-fetch')

// Initialize Client
const client = getCliClient({ apiVersion: '2023-05-03' })

const ASSET_ID = 'TR-SUNBELT-2500-TX';
const IMAGE_URL = 'https://placehold.co/800x600/71717a/FFFFFF.png?text=SUNBELT+SOLOMON+RECON'; // Grey Industrial Theme

async function executeVisualPatch() {
    console.log(`--- INITIATING VISUAL PATCH: SUNBELT ---`);
    console.log(`Target: ${ASSET_ID}`);

    try {
        // 1. Locate Document by custom ID
        const query = `*[_type == "inventory" && id == "${ASSET_ID}"][0]._id`;
        const docId = await client.fetch(query);

        if (!docId) throw new Error(`Asset ${ASSET_ID} not found.`);

        console.log(`System ID Locked: ${docId}`);

        // 2. Download Image
        console.log(`Downloading asset from: ${IMAGE_URL}`);
        const res = await fetch(IMAGE_URL);
        if (!res.ok) throw new Error(`Download Failed: ${res.status}`);

        // 3. Upload to Sanity
        console.log('Uploading payload to Sanity Grid...');
        const imageAsset = await client.assets.upload('image', res.body, {
            filename: 'sunbelt_recon_grey.png'
        });
        console.log(`Asset Locked: ${imageAsset._id}`);

        // 4. Patch Document
        console.log('Linking asset to inventory record...');
        await client.patch(docId)
            // We use 'images' array as per our schema to support gallery
            .set({
                images: [{
                    _type: 'image',
                    _key: 'main_visual_patch_' + Date.now(),
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset._id
                    }
                }]
            })
            .commit();

        console.log(`--- VISUAL PATCH SUCCESSFUL ---`);

    } catch (err) {
        console.error('PATCH FAILED:', err.message);
    }
}

executeVisualPatch();
