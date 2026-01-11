export default {
    name: 'inventory',
    title: 'Inventory',
    type: 'document',
    groups: [
        { name: 'main', title: 'Main Details' },
        { name: 'technical', title: 'Technical Specs' },
        { name: 'logistics', title: 'Logistics & Condition' },
        { name: 'media', title: 'Media' }
    ],
    fields: [
        // --- MAIN DETAILS ---
        {
            name: 'id',
            title: 'Asset ID',
            type: 'string',
            group: 'main',
            description: 'Internal ID (e.g., TR-SUN-2500)'
        },
        {
            name: 'type',
            title: 'Title / Equipment Name',
            type: 'string',
            group: 'main',
            description: 'e.g., 2500 KVA Pad-Mounted Transformer'
        },
        {
            name: 'manufacturer',
            title: 'Manufacturer',
            type: 'string',
            group: 'main'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'string',
            group: 'main',
            initialValue: 'Inquire'
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            group: 'main',
            options: {
                list: [
                    { title: 'Available (Ready to Ship)', value: 'AVAILABLE' },
                    { title: 'Pending', value: 'PENDING' },
                    { title: 'Sold', value: 'SOLD' },
                    { title: 'Logistics Hold', value: 'HOLD' }
                ]
            }
        },

        // --- TECHNICAL SPECS ---
        {
            name: 'kva',
            title: 'KVA / MVA Rating',
            type: 'string',
            group: 'technical',
            description: 'e.g., 2500 KVA or 50 MVA'
        },
        {
            name: 'primary_voltage',
            title: 'Primary Voltage (HV)',
            type: 'string',
            group: 'technical',
            description: 'e.g., 14,400 Delta'
        },
        {
            name: 'secondary_voltage',
            title: 'Secondary Voltage (LV)',
            type: 'string',
            group: 'technical',
            description: 'e.g., 480Y/277'
        },
        {
            name: 'impedance',
            title: 'Impedance (%Z)',
            type: 'string',
            group: 'technical',
            description: 'e.g., 5.75%'
        },
        {
            name: 'frequency',
            title: 'Frequency',
            type: 'string',
            group: 'technical',
            initialValue: '60Hz',
            options: { list: ['60Hz', '50Hz'] }
        },
        {
            name: 'cooling',
            title: 'Cooling Class',
            type: 'string',
            group: 'technical',
            description: 'e.g., ONAN, KNAN, ONAF'
        },
        {
            name: 'specs',
            title: 'Performance Specs (Matrix)',
            type: 'object',
            group: 'technical',
            fields: [
                { name: 'efficiency', title: 'Efficiency (%)', type: 'number' },
                { name: 'load', title: 'Load Capacity (%)', type: 'number' },
                { name: 'shielding', title: 'Shielding (dB)', type: 'number' }
            ]
        },

        // --- LOGISTICS & CONDITION ---
        {
            name: 'mfgYear',
            title: 'Manufacturing Year',
            type: 'string',
            group: 'logistics'
        },
        {
            name: 'condition',
            title: 'Condition',
            type: 'string',
            group: 'logistics',
            options: {
                list: [
                    { title: 'New (Never Energized)', value: 'NEW' },
                    { title: 'Reconditioned', value: 'RECONDITIONED' },
                    { title: 'Remanufactured', value: 'REMAN' },
                    { title: 'Used (Tested)', value: 'USED' }
                ]
            }
        },
        {
            name: 'location',
            title: 'Current Location',
            type: 'string',
            group: 'logistics',
            description: 'City, State (e.g., Odessa, TX)'
        },
        {
            name: 'weight',
            title: 'Total Weight',
            type: 'string',
            group: 'logistics',
            description: 'e.g., 14,500 LBS'
        },
        {
            name: 'lead_time',
            title: 'Lead Time / Savings',
            type: 'string',
            group: 'logistics',
            description: 'e.g., Ready to Ship (Saves 50 Weeks)'
        },
        {
            name: 'warranty',
            title: 'Warranty',
            type: 'string',
            group: 'logistics',
            initialValue: '12 Months'
        },

        // --- MEDIA & DESC ---
        {
            name: 'desc',
            title: 'Description / Notes',
            type: 'text',
            group: 'main'
        },
        {
            name: 'images',
            title: 'Gallery',
            type: 'array',
            group: 'media',
            of: [{
                type: 'image',
                options: { hotspot: true }
            }],
            options: {
                layout: 'grid'
            }
        },
        {
            name: 'spec_sheet',
            title: 'PDF Spec Sheet',
            type: 'file',
            group: 'media'
        }
    ]
}
