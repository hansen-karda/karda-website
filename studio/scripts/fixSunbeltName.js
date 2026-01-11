const { getCliClient } = require('sanity/cli')

// Initialize Client
const client = getCliClient({ apiVersion: '2023-05-03' })

const ASSET_ID = 'TR-SUNBELT-2500-TX';

// Data Payload
const patchData = {
    // Current Schema uses 'type' for the main Title/Name
    type: "Sunbelt Solomon 2500 kVA Padmount",

    // Legacy/Projected fields (patching these as requested to ensure future compatibility)
    name: "Sunbelt 2500 kVA Reconditioned",
    title: "Sunbelt Solomon 2500 kVA Padmount",

    // Description field (Schema uses 'desc')
    desc: "Premium Reconditioned Unit by Sunbelt Solomon. Multi-Tap Primary (13.8kV) for versatile deployment. Ready for immediate load. Verified operational condition.",

    // Also patch description alias if strictly needed by some queries
    description: "Premium Reconditioned Unit by Sunbelt Solomon. Multi-Tap Primary (13.8kV) for versatile deployment. Ready for immediate load. Verified operational condition."
};

async function fixName() {
    console.log(`--- INITIATING NAME REPAIR: SUNBELT ---`);
    console.log(`Target: ${ASSET_ID}`);

    try {
        // 1. Locate Document
        const query = `*[_type == "inventory" && id == "${ASSET_ID}"][0]._id`;
        const docId = await client.fetch(query);

        if (!docId) throw new Error(`Asset ${ASSET_ID} not found.`);

        console.log(`System ID Locked: ${docId}`);

        // 2. Patch Document
        console.log('Injecting Correct Identity Data...');
        const res = await client.patch(docId)
            .set(patchData)
            .commit();

        console.log(`--- REPAIR SUCCESSFUL ---`);
        console.log(`Title set to: ${patchData.title}`);

    } catch (err) {
        console.error('REPAIR FAILED:', err.message);
    }
}

fixName();
