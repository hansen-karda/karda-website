import { createClient } from '@sanity/client'

// Initialize Client (using the config we know exists)
const client = createClient({
    projectId: 'l2w4m5p0',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN, // <--- Injection from 'sanity exec'
})

const realInventory = [
    {
        _type: 'inventory',
        name: '2500 kVA MADDOX PREMIUM',
        title: 'Maddox 2500 kVA Copper-Wound Padmount',
        description: 'New Surplus unit. Copper/Copper windings for maximum efficiency. 5-Legged Core design. Loop feed with bayonet fusing. Ready for immediate heavy-load deployment.',
        status: 'AVAILABLE',
        price: 62500,
        voltage: '12470 Delta -> 480Y/277',
        impedance: '5.75%',
        location: 'GREENVILLE, SC',
        weight: '14,246 LBS',
        mfgYear: '2025',
        specs: { efficiency: 99.2, load: 100, shielding: 70 },
        mainImage: undefined
    },
    {
        _type: 'inventory',
        name: '2500 kVA SUNBELT MULTI-TAP',
        title: 'Sunbelt Solomon Multi-Tap Step-Up Unit',
        description: 'Versatile Multi-Tap configuration (13.8kV / 13.2kV / 12.47kV). Ideal for sites with fluctuating grid requirements or Bitcoin mining deployments. Recently tested.',
        status: 'AVAILABLE',
        price: 45000,
        voltage: '13.8kV (Multi-Tap) -> 480V',
        impedance: '5.54%',
        location: 'TEMPLE, TX',
        weight: '12,600 LBS',
        mfgYear: '2022',
        specs: { efficiency: 98.9, load: 95, shielding: 60 },
        mainImage: undefined
    },
    {
        _type: 'inventory',
        name: '2500 kVA T&R UTILITY SPEC',
        title: 'T&R Electric Standard Distribution Pad',
        description: 'Reliable utility-grade unit. Reconditioned to IEEE standards. Dead front design. Perfect for commercial park distribution or solar tie-in.',
        status: 'AVAILABLE',
        price: 55000,
        voltage: '13200 Delta -> 480Y/277',
        impedance: '5.72%',
        location: 'COLMAN, SD',
        weight: '13,500 LBS',
        mfgYear: '2023',
        specs: { efficiency: 99.0, load: 90, shielding: 50 },
        mainImage: undefined
    }
];

// Helper to generate IDs
const generateId = (name) => {
    const parts = name.split(' ');
    // "2500 kVA MADDOX PREMIUM" -> "TR-MADDOX-2500"
    const kva = parts[0];
    const mfg = parts[2];
    return `TR-${mfg}-${kva}`;
};

async function seed() {
    console.log('--- STARTING DATABASE SEED ---');

    try {
        // 1. DELETE EXISTING INVENTORY
        console.log('Deleting existing inventory...');
        await client.delete({ query: '*[_type == "inventory"]' });
        console.log('Purge complete.');

        // 2. CREATE NEW ASSETS
        console.log('Seeding 3 Verified Assets...');

        for (const item of realInventory) {
            // Parse Voltage string into Primary/Secondary
            const voltageParts = item.voltage.split('->').map(s => s.trim());
            const primary = voltageParts[0] || item.voltage;
            const secondary = voltageParts[1] || 'TBD';

            // Map to Schema
            const doc = {
                _type: 'inventory',
                id: generateId(item.name),
                type: item.title, // User Title -> Schema Type (Title)
                manufacturer: item.name.split(' ')[2] || 'Generic',
                price: `$${item.price.toLocaleString()}`,
                status: item.status,

                // Tech Specs
                kva: '2500', // Inferred from all units being 2500
                primary_voltage: primary,
                secondary_voltage: secondary,
                impedance: item.impedance,
                frequency: '60Hz',
                cooling: 'ONAN',

                // Logistics
                mfgYear: item.mfgYear,
                location: item.location,
                weight: item.weight,
                condition: item.description.includes('New') ? 'NEW' : 'RECONDITIONED',
                lead_time: 'Ready to Ship',
                warranty: '12 Months',

                // Description
                desc: item.description,

                // New Matrix Specs
                specs: item.specs
            };

            const res = await client.create(doc);
            console.log(`Created: ${res.id} (${res.type})`);
        }

        console.log('--- SEED COMPLETE: 3 ASSETS LIVE ---');

    } catch (err) {
        console.error('Seed Failed:', err.message);
        if (!process.env.SANITY_AUTH_TOKEN) {
            console.error('HINT: Token is missing. Run with "sanity exec <script> --with-user-token"');
        }
    }
}

seed();
