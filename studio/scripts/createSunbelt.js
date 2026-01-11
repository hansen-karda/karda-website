const { getCliClient } = require('sanity/cli')

// Initialize Client
const client = getCliClient({ apiVersion: '2023-05-03' })

// SUNBELT PAYLOAD
const sunbeltAsset = {
    _type: 'inventory',
    id: 'TR-SUNBELT-2500-TX',
    name: 'Sunbelt Solomon 2500 kVA',
    title: 'Sunbelt Solomon Multi-Tap Step-Up Padmount',
    description: 'Premium Reconditioned Unit by Sunbelt Solomon. Multi-Tap Primary voltage for versatile deployment. Ready for immediate load.',
    status: 'AVAILABLE',
    price: 68500,

    // Core Specs
    primary_voltage: '13.8 kV (Multi-Tap)',
    secondary_voltage: '480/277V',
    voltage: '13.8kV -> 480/277V',
    impedance: '5.75%',
    location: 'TEMPLE, TX',
    weight: '12,500 LBS',
    mfgYear: '2016',
    condition: 'RECONDITIONED',
    lead_time: 'Immediate',

    // Performance Matrix
    specs: { efficiency: 98.8, load: 100, shielding: 60 },

    // Deep Technical Specs
    techSpecs: {
        coolingClass: 'ONAN',
        oilType: 'Mineral Oil',
        windings: 'Aluminum / Aluminum',
        tempRise: '65°C',
        bil: '95 kV BIL',
        taps: '13.8 / 13.2 / 12.47 kV',
        dimensions: 'H 78" x W 88" x D 72"', // Estimated for 2500kVA
        productionStatus: 'Reconditioned'
    }
};

async function forgeSunbelt() {
    console.log(`--- INITIATING ASSET FORGE: SUNBELT ---`);
    console.log(`Target: ${sunbeltAsset.title}`);

    try {
        // Create Document
        const res = await client.createOrReplace({
            _id: 'inventory-TR-SUNBELT-2500-TX',
            ...sunbeltAsset
        });

        console.log(`--- ASSET ONLINE: ${res._id} ---`);
        console.log('Sunbelt Unit Successfully Deployed.');

    } catch (err) {
        console.error('FORGE FAILED:', err.message);
    }
}

forgeSunbelt();
