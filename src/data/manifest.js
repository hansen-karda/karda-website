import transformerImg from '../assets/transformer-1.png';

export const ASSET_MANIFEST = [
    {
        id: 'TR-PAD-2500',
        type: '2500 kVA PAD MOUNT TRANSFORMER',
        voltage: '12.47kV / 480V',
        status: 'AVAILABLE',
        price: '$45,000',
        specs: {
            efficiency: 98,
            load_capacity: 85,
            durability: 95,
            shielding: 60
        },
        desc: 'High-efficiency unit designed for crypto-mining clusters. Rapid deployment ready.',
        image: transformerImg
    },
    {
        id: 'TR-SUB-50M',
        type: '50 MVA SUBSTATION CLASS',
        voltage: '69kV / 13.8kV',
        status: 'PENDING',
        price: '$850,000',
        specs: {
            efficiency: 99,
            load_capacity: 100,
            durability: 90,
            shielding: 85
        },
        desc: 'Utility-grade substation core. Capable of powering regional infrastructure.',
        image: transformerImg
    },
    {
        id: 'SW-VAC-38',
        type: '38kV VACUUM BREAKER',
        voltage: '38kV',
        status: 'AVAILABLE',
        price: '$12,500',
        specs: {
            efficiency: 95,
            load_capacity: 70,
            durability: 98,
            shielding: 50
        },
        desc: 'High-cycle recloser system. Critical fault protection for downstream assets.',
        image: transformerImg
    },
    {
        id: 'TR-DIS-500',
        type: '500 kVA DISTRIBUTION UNIT',
        voltage: '4160V / 480V',
        status: 'ACQUIRING',
        price: '$18,000',
        specs: {
            efficiency: 92,
            load_capacity: 60,
            durability: 80,
            shielding: 40
        },
        desc: 'Standard distribution node. modular and stackable for localized grids.',
        image: transformerImg
    }
];
