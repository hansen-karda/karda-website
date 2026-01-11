const { getCliClient } = require('sanity/cli')

// Initialize Client
const client = getCliClient({ apiVersion: '2023-05-03' })

const ASSET_ID = 'TR-ABB-2500-PA'; // Using the Inventory 'id' field to locate

const patchData = {
    description: "ABB SPS2 Series Pad-Mount. Type: SPS2-145-63-3. High-Voltage 34.5 kV Primary to 575Y/332V Industrial Secondary. Ideal for heavy manufacturing or mining applications.",
    // Update the Specs Object
    specs: {
        efficiency: 99.1,
        load: 100,
        shielding: 65,
        tempRise: "65°C",
        cooling: "ONAN (Oil Natural Air Natural)"
    },
    // Add New Technical Fields
    techSpecs: {
        windings: "Aluminum / Aluminum (Standard)",
        taps: "± 2 x 2.5% (High/Low)",
        fluid: "Mineral Oil (Type II)",
        bil: "150 kV BIL",
        gauges: "Liquid Level, Temp, Pressure-Vacuum"
    },
    mfgYear: "2015",
    weight: "13,500 LBS"
};

async function executePatch() {
    console.log(`--- INITIATING PATCH PROTOCOL: ${ASSET_ID} ---`);

    try {
        // 1. Locate Document by custom ID
        const query = `*[_type == "inventory" && id == "${ASSET_ID}"][0]._id`;
        const docId = await client.fetch(query);

        if (!docId) {
            throw new Error(`Asset ${ASSET_ID} not found.`);
        }

        console.log(`Target Identified. System ID: ${docId}`);

        // 2. Inject Data
        console.log('Injecting Technical Specifications...');
        const res = await client.patch(docId)
            .set(patchData)
            .commit();

        console.log(`--- PATCH SUCCESSFUL ---`);
        console.log(`Asset Revision: ${res._rev}`);

    } catch (err) {
        console.error('PATCH OPERATION FAILED:', err.message);
    }
}

executePatch();
