export default {
    name: 'inventory',
    title: 'Inventory',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'Asset ID',
            type: 'string',
            description: 'e.g., TR-PAD-2500'
        },
        {
            name: 'type',
            title: 'Type / Title',
            type: 'string',
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Available', value: 'AVAILABLE' },
                    { title: 'Pending', value: 'PENDING' },
                    { title: 'Acquiring', value: 'ACQUIRING' },
                    { title: 'Sold', value: 'SOLD' }
                ]
            }
        },
        {
            name: 'voltage',
            title: 'Voltage',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'string'
        },
        {
            name: 'specs',
            title: 'Specifications',
            type: 'object',
            fields: [
                { name: 'efficiency', type: 'number', title: 'Efficiency (%)' },
                { name: 'load_capacity', type: 'number', title: 'Load Capacity (%)' },
                { name: 'durability', type: 'number', title: 'Durability (%)' },
                { name: 'shielding', type: 'number', title: 'Shielding (%)' }
            ]
        },
        {
            name: 'desc',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'image',
            title: 'Asset Image',
            type: 'image',
            options: {
                hotspot: true
            }
        }
    ]
}
