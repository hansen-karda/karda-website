const { getCliClient } = require('sanity/cli')

// Initialize Client
const client = getCliClient({ apiVersion: '2023-05-03' })

const ASSET_ID = 'TR-ABB-2500-PA';

const deepData = {
    // Update Technical Specs Sub-Object
    techSpecs: {
        coolingClass: "ONAN (Oil Natural Air Natural)",
        oilType: "Mineral Oil (Type II Non-PCB)",
        windings: "Aluminum / Aluminum (SPS2 Standard)",
        tempRise: "65°C Industrial Standard",
        bil: "150 kV BIL (High Voltage)",
        taps: "± 2 x 2.5% (De-Energized)",
        dimensions: 'H 84" x W 92" x D 78"'
    },
    // Align Base Specs (ensure these are robust)
    primary_voltage: "34.5kV Delta",
    secondary_voltage: "575Y/332V",
    impedance: "5.75%",
    weight: "13,500 LBS"
};

async function executeDeepInjection() {
    console.log(`--- INITIATING DEEP DATA INJECTION ---`);
    console.log(`Target: ${ASSET_ID}`);

    try {
        // 1. Locate Document
        const query = `*[_type == "inventory" && id == "${ASSET_ID}"][0]._id`;
        const docId = await client.fetch(query);

        if (!docId) throw new Error(`Asset ${ASSET_ID} not found.`);

        console.log(`System ID Locked: ${docId}`);

        // 2. Inject Payload
        console.log('Injecting Engineering Payload...');
        const res = await client.patch(docId)
            .set(deepData)
            .commit();

        console.log(`--- INJECTION SUCCESSFUL ---`);
        console.log(`Asset Revision: ${res._rev}`);

    } catch (err) {
        console.error('INJECTION FAILED:', err.message);
    }
}

executeDeepInjection();
