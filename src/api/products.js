/**
 * Products Mock Service
 * 48 Realistic mock products with full details and simulated network delay
 */

export const MOCK_PRODUCTS = [
  // 1-10: Smartphones
  {
    id: 'prod-001',
    title: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
    price: 15400000,
    oldPrice: 17200000,
    discount: 10,
    category: 'smartphones',
    rating: 4.9,
    reviewsCount: 142,
    seller: 'iSpace Official',
    description: 'A17 Pro chip, aerospace-grade titanium design, 48MP main camera system with 5x telephoto lens.',
    specs: {
      screen: '6.7" Super Retina XDR OLED 120Hz',
      ram: '8GB',
      storage: '256GB',
      battery: '4422 mAh',
      os: 'iOS 17'
    },
    stock: 18,
    location: 'Toshkent',
    createdAt: '2024-03-01T10:00:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-002',
    title: 'Samsung Galaxy S24 Ultra 12/512GB Titanium Gray',
    price: 14200000,
    oldPrice: 16000000,
    discount: 11,
    category: 'smartphones',
    rating: 4.8,
    reviewsCount: 98,
    seller: 'Samsung Brand Shop',
    description: 'Galaxy AI is here. Epic camera with 200MP sensor, built-in S Pen, and Snapdragon 8 Gen 3 for Galaxy.',
    specs: {
      screen: '6.8" Dynamic AMOLED 2X 120Hz',
      ram: '12GB',
      storage: '512GB',
      battery: '5000 mAh',
      os: 'Android 14, One UI 6.1'
    },
    stock: 12,
    location: 'Samarqand',
    createdAt: '2024-03-05T12:30:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-003',
    title: 'Xiaomi 14 Ultra 16/512GB Leica Photography Kit',
    price: 12800000,
    oldPrice: 14500000,
    discount: 12,
    category: 'smartphones',
    rating: 4.7,
    reviewsCount: 64,
    seller: 'Xiaomi Store UZ',
    description: 'Leica Quad Camera with 1-inch sensor, stepless variable aperture, Snapdragon 8 Gen 3 flagship power.',
    specs: {
      screen: '6.73" LTPO AMOLED 120Hz',
      ram: '16GB',
      storage: '512GB',
      battery: '5000 mAh 90W HyperCharge',
      os: 'Xiaomi HyperOS'
    },
    stock: 7,
    location: 'Toshkent',
    createdAt: '2024-02-28T09:15:00Z',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-004',
    title: 'Google Pixel 8 Pro 128GB Obsidian',
    price: 10500000,
    oldPrice: 11900000,
    discount: 12,
    category: 'smartphones',
    rating: 4.8,
    reviewsCount: 75,
    seller: 'Pixel Point',
    description: 'Google Tensor G3 chip with Google AI, incredible computational photography and 7 years of OS updates.',
    specs: {
      screen: '6.7" Super Actua display 120Hz',
      ram: '12GB',
      storage: '128GB',
      battery: '5050 mAh',
      os: 'Android 14'
    },
    stock: 14,
    location: 'Fargʻona',
    createdAt: '2024-01-20T14:00:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-005',
    title: 'OnePlus 12 16/512GB Silky Black',
    price: 9400000,
    oldPrice: 10500000,
    discount: 10,
    category: 'smartphones',
    rating: 4.6,
    reviewsCount: 52,
    seller: 'TechZone',
    description: 'Hasselblad 4th Gen Camera for Mobile, 100W SUPERVOOC charging and 5400 mAh battery.',
    specs: {
      screen: '6.82" ProXDR 2K 120Hz',
      ram: '16GB',
      storage: '512GB',
      battery: '5400 mAh',
      os: 'OxygenOS 14'
    },
    stock: 9,
    location: 'Toshkent',
    createdAt: '2024-02-14T08:00:00Z',
    isNew: false,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-006',
    title: 'Apple iPhone 13 128GB Starlight',
    price: 7600000,
    oldPrice: 8500000,
    discount: 11,
    category: 'smartphones',
    rating: 4.9,
    reviewsCount: 420,
    seller: 'Apple Store Online',
    description: 'Super Retina XDR display, advanced dual-camera system, A15 Bionic chip with 4-core GPU.',
    specs: {
      screen: '6.1" OLED Super Retina',
      ram: '4GB',
      storage: '128GB',
      battery: '3240 mAh',
      os: 'iOS 17'
    },
    stock: 35,
    location: 'Andijon',
    createdAt: '2023-11-10T11:00:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-007',
    title: 'Samsung Galaxy A55 5G 8/256GB Awesome Navy',
    price: 4600000,
    oldPrice: 5200000,
    discount: 12,
    category: 'smartphones',
    rating: 4.7,
    reviewsCount: 112,
    seller: 'Galaxy Center',
    description: 'Metal frame with glass back, 50MP OIS camera, 4 OS upgrades guaranteed.',
    specs: {
      screen: '6.6" Super AMOLED 120Hz',
      ram: '8GB',
      storage: '256GB',
      battery: '5000 mAh',
      os: 'Android 14'
    },
    stock: 22,
    location: 'Namangan',
    createdAt: '2024-03-12T15:00:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-008',
    title: 'Redmi Note 13 Pro+ 5G 12/512GB Midnight Black',
    price: 4900000,
    oldPrice: 5600000,
    discount: 13,
    category: 'smartphones',
    rating: 4.6,
    reviewsCount: 88,
    seller: 'Mi Global Store',
    description: '200MP camera with OIS, 1.5K 120Hz curved AMOLED, 120W HyperCharge, IP68 water resistance.',
    specs: {
      screen: '6.67" Curved AMOLED 1.5K',
      ram: '12GB',
      storage: '512GB',
      battery: '5000 mAh 120W',
      os: 'MIUI 14 / HyperOS'
    },
    stock: 19,
    location: 'Toshkent',
    createdAt: '2024-01-18T10:20:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-009',
    title: 'Infinix GT 20 Pro 12/256GB Mecha Blue',
    price: 3700000,
    oldPrice: 4200000,
    discount: 12,
    category: 'smartphones',
    rating: 4.5,
    reviewsCount: 43,
    seller: 'Infinix Direct',
    description: 'Gaming smartphone with dedicated display gaming chip, cyber mecha design with RGB loop light.',
    specs: {
      screen: '6.78" FHD+ AMOLED 144Hz',
      ram: '12GB',
      storage: '256GB',
      battery: '5000 mAh 45W',
      os: 'XOS 14'
    },
    stock: 15,
    location: 'Buxoro',
    createdAt: '2024-03-20T16:00:00Z',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-010',
    title: 'Nothing Phone (2) 12/256GB Dark Grey',
    price: 8100000,
    oldPrice: 9300000,
    discount: 13,
    category: 'smartphones',
    rating: 4.7,
    reviewsCount: 38,
    seller: 'Urban Tech',
    description: 'Iconic Glyph Interface, Snapdragon 8+ Gen 1, 50MP dual cameras, Nothing OS 2.5 with monochrome theme.',
    specs: {
      screen: '6.7" OLED LTPO 120Hz',
      ram: '12GB',
      storage: '256GB',
      battery: '4700 mAh',
      os: 'Nothing OS 2.5'
    },
    stock: 8,
    location: 'Toshkent',
    createdAt: '2023-12-05T13:45:00Z',
    isNew: false,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // 11-18: Laptops
  {
    id: 'prod-011',
    title: 'Apple MacBook Pro 16" M3 Max 36GB / 1TB Space Black',
    price: 42500000,
    oldPrice: 47000000,
    discount: 10,
    category: 'laptops',
    rating: 5.0,
    reviewsCount: 34,
    seller: 'iSpace Pro',
    description: 'The ultimate pro laptop. M3 Max 14-core CPU, 30-core GPU, Liquid Retina XDR display with up to 22 hours battery.',
    specs: {
      processor: 'Apple M3 Max 14-core',
      ram: '36GB Unified',
      ssd: '1TB NVMe',
      screen: '16.2" Liquid Retina XDR 120Hz',
      weight: '2.14 kg'
    },
    stock: 5,
    location: 'Toshkent',
    createdAt: '2024-01-10T09:00:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-012',
    title: 'Apple MacBook Air 15" M2 8GB / 256GB Starlight',
    price: 15300000,
    oldPrice: 17200000,
    discount: 11,
    category: 'laptops',
    rating: 4.8,
    reviewsCount: 89,
    seller: 'Apple Boutique',
    description: 'Impossibly thin 11.5mm design with spacious 15.3" Liquid Retina display and silent fanless architecture.',
    specs: {
      processor: 'Apple M2 8-core',
      ram: '8GB Unified',
      ssd: '256GB NVMe',
      screen: '15.3" Liquid Retina',
      weight: '1.51 kg'
    },
    stock: 14,
    location: 'Samarqand',
    createdAt: '2023-12-18T11:20:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-013',
    title: 'ASUS ROG Zephyrus G16 (2024) RTX 4070 Intel Ultra 9',
    price: 28900000,
    oldPrice: 32000000,
    discount: 10,
    category: 'laptops',
    rating: 4.9,
    reviewsCount: 29,
    seller: 'ROG Gaming Store',
    description: 'OLED 2.5K 240Hz Nebula display, CNC aluminum chassis, Slash Lighting, NVIDIA GeForce RTX 4070 8GB.',
    specs: {
      processor: 'Intel Core Ultra 9 185H',
      ram: '32GB LPDDR5X',
      ssd: '1TB PCIe 4.0 SSD',
      gpu: 'RTX 4070 8GB (105W)',
      screen: '16" 2.5K OLED 240Hz'
    },
    stock: 6,
    location: 'Toshkent',
    createdAt: '2024-03-02T14:15:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-014',
    title: 'Lenovo Legion Pro 5 16" Ryzen 7 7745HX RTX 4060',
    price: 18200000,
    oldPrice: 20500000,
    discount: 11,
    category: 'laptops',
    rating: 4.7,
    reviewsCount: 56,
    seller: 'Lenovo Center',
    description: 'ColdFront 5.0 cooling system, PureSight Gaming display with 240Hz refresh rate and AI Engine+ tuning.',
    specs: {
      processor: 'AMD Ryzen 7 7745HX',
      ram: '16GB DDR5',
      ssd: '1TB M.2 SSD',
      gpu: 'RTX 4060 8GB (140W)',
      screen: '16" WQXGA 240Hz'
    },
    stock: 11,
    location: 'Toshkent',
    createdAt: '2024-02-10T12:00:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-015',
    title: 'Dell XPS 13 Plus 9320 Core i7-1360P 16/512GB OLED',
    price: 21500000,
    oldPrice: 24200000,
    discount: 11,
    category: 'laptops',
    rating: 4.6,
    reviewsCount: 22,
    seller: 'Dell Premier Partner',
    description: 'Zero-lattice keyboard, seamless glass haptic touchpad, 3.5K OLED InfinityEdge touch screen.',
    specs: {
      processor: 'Intel Core i7-1360P',
      ram: '16GB LPDDR5',
      ssd: '512GB PCIe NVMe',
      screen: '13.4" 3.5K OLED Touch',
      weight: '1.24 kg'
    },
    stock: 4,
    location: 'Buxoro',
    createdAt: '2023-11-25T16:00:00Z',
    isNew: false,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-016',
    title: 'HP Victus 15 Core i5-13420H RTX 3050 6GB 16/512GB',
    price: 9700000,
    oldPrice: 11000000,
    discount: 12,
    category: 'laptops',
    rating: 4.5,
    reviewsCount: 78,
    seller: 'CompStore',
    description: 'Affordable modern gaming and multitasking powerhouse with 144Hz FHD anti-glare display and OMEN Gaming Hub.',
    specs: {
      processor: 'Intel Core i5-13420H',
      ram: '16GB DDR4',
      ssd: '512GB NVMe SSD',
      gpu: 'RTX 3050 6GB',
      screen: '15.6" FHD 144Hz IPS'
    },
    stock: 20,
    location: 'Namangan',
    createdAt: '2024-01-05T13:30:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-017',
    title: 'Acer Swift Go 14 OLED Intel Core Ultra 7 16/1TB',
    price: 13900000,
    oldPrice: 15600000,
    discount: 11,
    category: 'laptops',
    rating: 4.7,
    reviewsCount: 19,
    seller: 'Acer Official Hub',
    description: '2.8K 90Hz OLED display with 100% DCI-P3, Intel AI Boost NPU for enhanced battery life and generative features.',
    specs: {
      processor: 'Intel Core Ultra 7 155H',
      ram: '16GB LPDDR5X',
      ssd: '1TB PCIe Gen4',
      screen: '14" 2.8K 90Hz OLED',
      weight: '1.32 kg'
    },
    stock: 8,
    location: 'Toshkent',
    createdAt: '2024-03-08T10:00:00Z',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-018',
    title: 'ASUS Zenbook 14 OLED UX3405 Core Ultra 5 16/512GB',
    price: 14800000,
    oldPrice: 16500000,
    discount: 10,
    category: 'laptops',
    rating: 4.8,
    reviewsCount: 31,
    seller: 'ASUS Store',
    description: 'Ultra-portable 1.2 kg metallic chassis, 120Hz 3K Lumina OLED display, Dolby Atmos sound by Harman Kardon.',
    specs: {
      processor: 'Intel Core Ultra 5 125H',
      ram: '16GB LPDDR5X',
      ssd: '512GB PCIe 4.0',
      screen: '14" 3K OLED 120Hz',
      weight: '1.20 kg'
    },
    stock: 10,
    location: 'Samarqand',
    createdAt: '2024-02-25T11:45:00Z',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // 19-25: Audio & Headphones
  {
    id: 'prod-019',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    price: 4600000,
    oldPrice: 5300000,
    discount: 13,
    category: 'audio',
    rating: 4.9,
    reviewsCount: 215,
    seller: 'Sony Center Tashkent',
    description: 'Industry-leading noise cancellation with two processors and 8 microphones, Auto NC Optimizer, 30 hours battery.',
    specs: {
      type: 'Over-ear Wireless',
      battery: '30 hours with ANC',
      connectivity: 'Bluetooth 5.2 / 3.5mm jack',
      weight: '250 g',
      codecs: 'LDAC, AAC, SBC'
    },
    stock: 25,
    location: 'Toshkent',
    createdAt: '2024-01-15T09:30:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-020',
    title: 'Apple AirPods Pro 2 (USB-C) with MagSafe Case',
    price: 3200000,
    oldPrice: 3700000,
    discount: 14,
    category: 'audio',
    rating: 4.9,
    reviewsCount: 380,
    seller: 'iSpace Official',
    description: 'H2 chip, up to 2x more active noise cancellation, Adaptive Audio, Conversation Awareness, IP54 dust and water resistance.',
    specs: {
      type: 'In-ear TWS',
      battery: '6 hours (30 with case)',
      charging: 'USB-C, MagSafe, Qi',
      features: 'Spatial Audio, ANC'
    },
    stock: 40,
    location: 'Toshkent',
    createdAt: '2024-02-01T12:00:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-021',
    title: 'Marshall Stanmore III Bluetooth Speaker Black',
    price: 4900000,
    oldPrice: 5500000,
    discount: 11,
    category: 'audio',
    rating: 4.8,
    reviewsCount: 62,
    seller: 'SoundWave Store',
    description: 'Re-engineered for an even wider soundstage. Signature room-filling rock & roll Marshall audio experience.',
    specs: {
      power: '80W Class D',
      connectivity: 'Bluetooth 5.2, RCA, 3.5mm',
      weight: '4.25 kg',
      frequency: '45–20,000 Hz'
    },
    stock: 8,
    location: 'Samarqand',
    createdAt: '2023-11-19T14:20:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-022',
    title: 'JBL Charge 5 Waterproof Portable Bluetooth Speaker',
    price: 1950000,
    oldPrice: 2300000,
    discount: 15,
    category: 'audio',
    rating: 4.8,
    reviewsCount: 194,
    seller: 'JBL Official',
    description: 'Original Pro Sound with long excursion driver, separate tweeter and dual pumping bass radiators. Built-in powerbank.',
    specs: {
      power: '40W RMS',
      battery: 'Up to 20 hours',
      waterproof: 'IP67 dustproof & waterproof',
      feature: 'PartyBoost supported'
    },
    stock: 30,
    location: 'Fargʻona',
    createdAt: '2024-01-28T09:40:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-023',
    title: 'Bose QuietComfort Ultra Headphones Black',
    price: 5200000,
    oldPrice: 5900000,
    discount: 12,
    category: 'audio',
    rating: 4.8,
    reviewsCount: 45,
    seller: 'AudioLux',
    description: 'Groundbreaking spatial audio, CustomTune technology personalize sound and silence specifically to your ears.',
    specs: {
      type: 'Over-ear Wireless',
      battery: '24 hours battery life',
      features: 'Immersive Audio, CustomTune',
      connectivity: 'Bluetooth 5.3'
    },
    stock: 9,
    location: 'Toshkent',
    createdAt: '2024-02-18T16:10:00Z',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-024',
    title: 'Samsung Galaxy Buds2 Pro Bora Purple',
    price: 1850000,
    oldPrice: 2200000,
    discount: 16,
    category: 'audio',
    rating: 4.7,
    reviewsCount: 110,
    seller: 'Samsung Brand Shop',
    description: '24-bit Hi-Fi audio for studio quality listening experience, Intelligent ANC with 3 high SNR microphones.',
    specs: {
      type: 'In-ear TWS',
      battery: '5 hours (18 with case)',
      waterproof: 'IPX7',
      codecs: 'SSC HiFi, AAC, SBC'
    },
    stock: 18,
    location: 'Andijon',
    createdAt: '2023-12-10T11:00:00Z',
    isNew: false,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-025',
    title: 'Sennheiser Momentum 4 Wireless Denim Edition',
    price: 4300000,
    oldPrice: 4800000,
    discount: 10,
    category: 'audio',
    rating: 4.7,
    reviewsCount: 39,
    seller: 'Audiophile Hub',
    description: 'Incomparable 60-hour battery life, 42mm audiophile-grade transducer system with personalized sound equalizer.',
    specs: {
      type: 'Over-ear Wireless',
      battery: '60 hours continuous play',
      driver: '42mm dynamic',
      codecs: 'aptX Adaptive, AAC'
    },
    stock: 7,
    location: 'Toshkent',
    createdAt: '2024-03-01T15:00:00Z',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // 26-31: Wearables & Smart Watches
  {
    id: 'prod-026',
    title: 'Apple Watch Ultra 2 Titanium Case Orange Ocean Band',
    price: 10400000,
    oldPrice: 11800000,
    discount: 12,
    category: 'wearables',
    rating: 4.9,
    reviewsCount: 78,
    seller: 'iSpace Pro',
    description: 'Rugged 49mm titanium case, precision dual-frequency GPS, up to 36 hours of battery life and modular ultra face.',
    specs: {
      case: '49mm Titanium',
      brightness: '3000 nits max',
      battery: '36–72 hours',
      waterResistance: '100m / EN13319 dive'
    },
    stock: 12,
    location: 'Toshkent',
    createdAt: '2024-02-11T10:00:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-027',
    title: 'Apple Watch Series 9 45mm Midnight Aluminum',
    price: 5300000,
    oldPrice: 6000000,
    discount: 12,
    category: 'wearables',
    rating: 4.8,
    reviewsCount: 140,
    seller: 'Apple Boutique',
    description: 'S9 SiP chip, magical Double Tap gesture, brighter display, on-device Siri with health data query capability.',
    specs: {
      case: '45mm Aluminum',
      display: 'Always-On Retina 2000 nits',
      battery: '18 hours (36 low power)',
      sensors: 'ECG, Blood Oxygen, Temp'
    },
    stock: 22,
    location: 'Samarqand',
    createdAt: '2023-11-20T08:30:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-028',
    title: 'Samsung Galaxy Watch6 Classic 47mm Black',
    price: 4100000,
    oldPrice: 4700000,
    discount: 13,
    category: 'wearables',
    rating: 4.7,
    reviewsCount: 88,
    seller: 'Samsung Brand Shop',
    description: 'Rotating bezel design returns. Sapphire crystal glass, advanced sleep coaching and personalized heart rate zones.',
    specs: {
      case: '47mm Stainless Steel',
      display: '1.5" Super AMOLED 480x480',
      battery: '425 mAh Fast Charge',
      os: 'Wear OS Powered by Samsung'
    },
    stock: 16,
    location: 'Toshkent',
    createdAt: '2024-01-08T14:10:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-029',
    title: 'Garmin Fenix 7X Pro Sapphire Solar Edition',
    price: 11900000,
    oldPrice: 13200000,
    discount: 10,
    category: 'wearables',
    rating: 4.9,
    reviewsCount: 42,
    seller: 'SportTech UZ',
    description: 'Ultimate multisport GPS smartwatch with solar charging lens, built-in LED flashlight and endurance scoring.',
    specs: {
      case: '51mm Fiber-reinforced polymer',
      battery: 'Up to 37 days with solar',
      lens: 'Power Sapphire scratch-resistant',
      waterproof: '10 ATM'
    },
    stock: 6,
    location: 'Toshkent',
    createdAt: '2024-02-20T17:00:00Z',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-030',
    title: 'Huawei Watch GT 4 46mm Brown Leather',
    price: 2700000,
    oldPrice: 3100000,
    discount: 13,
    category: 'wearables',
    rating: 4.6,
    reviewsCount: 95,
    seller: 'Huawei Store',
    description: 'Geometric aesthetics octagonal design, scientific calorie management, up to 14 days ultra-long battery life.',
    specs: {
      case: '46mm Stainless steel',
      battery: 'Up to 14 days',
      screen: '1.43" AMOLED 466x466',
      compatibility: 'Android & iOS'
    },
    stock: 24,
    location: 'Namangan',
    createdAt: '2023-12-28T09:00:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-031',
    title: 'Xiaomi Smart Band 8 Pro Light Grey',
    price: 850000,
    oldPrice: 990000,
    discount: 14,
    category: 'wearables',
    rating: 4.7,
    reviewsCount: 167,
    seller: 'Mi Global Store',
    description: '1.74" AMOLED high-refresh display, integrated GNSS satellite positioning, 14 days battery life and 150+ sports modes.',
    specs: {
      screen: '1.74" 60Hz AMOLED',
      battery: 'Up to 14 days',
      gps: 'Independent GNSS built-in',
      weight: '22.5 g'
    },
    stock: 45,
    location: 'Buxoro',
    createdAt: '2024-03-01T11:20:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // 32-37: Gaming & Consoles
  {
    id: 'prod-032',
    title: 'Sony PlayStation 5 Slim 1TB Digital Edition',
    price: 6400000,
    oldPrice: 7200000,
    discount: 11,
    category: 'gaming',
    rating: 4.9,
    reviewsCount: 210,
    seller: 'GameZone Uzbekistan',
    description: 'Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback and 3D Audio.',
    specs: {
      storage: '1TB Ultra-Fast SSD',
      resolution: 'Up to 4K 120fps, HDR',
      controller: 'DualSense Wireless Controller',
      audio: 'Tempest 3D AudioTech'
    },
    stock: 14,
    location: 'Toshkent',
    createdAt: '2024-01-22T13:00:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-033',
    title: 'Nintendo Switch OLED Model Mario Red Edition',
    price: 4300000,
    oldPrice: 4800000,
    discount: 10,
    category: 'gaming',
    rating: 4.8,
    reviewsCount: 130,
    seller: 'Nintendo Club',
    description: 'Vibrant 7-inch OLED screen, wide adjustable stand, dock with wired LAN port, 64 GB internal storage.',
    specs: {
      screen: '7" OLED Multi-touch',
      storage: '64GB internal + microSD',
      battery: '4.5 to 9 hours',
      mode: 'TV, Tabletop, Handheld'
    },
    stock: 19,
    location: 'Samarqand',
    createdAt: '2023-11-05T15:30:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-034',
    title: 'Xbox Series X 1TB Console Carbon Black',
    price: 6800000,
    oldPrice: 7600000,
    discount: 11,
    category: 'gaming',
    rating: 4.8,
    reviewsCount: 84,
    seller: 'NextGen Play',
    description: 'Fastest, most powerful Xbox ever. 12 teraflops of graphic processing power, DirectX ray tracing and Quick Resume.',
    specs: {
      storage: '1TB Custom NVMe SSD',
      gpu: '12 TFLOPS 52 CUs @ 1.825 GHz',
      optical: '4K UHD Blu-ray drive',
      framerate: 'Up to 120 FPS'
    },
    stock: 8,
    location: 'Toshkent',
    createdAt: '2024-02-05T10:15:00Z',
    isNew: false,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-035',
    title: 'Steam Deck OLED 512GB Handheld Gaming Console',
    price: 8200000,
    oldPrice: 9400000,
    discount: 13,
    category: 'gaming',
    rating: 4.9,
    reviewsCount: 51,
    seller: 'Valve Direct Import',
    description: '7.4" 90Hz HDR OLED display, custom 6nm AMD APU, larger battery with up to 12 hours playtime and Wi-Fi 6E.',
    specs: {
      screen: '7.4" 1280x800 HDR OLED 90Hz',
      storage: '512GB NVMe SSD',
      apu: '6nm AMD APU',
      battery: '50Wh (3–12 hours)'
    },
    stock: 5,
    location: 'Toshkent',
    createdAt: '2024-03-01T12:00:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-036',
    title: 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard',
    price: 2600000,
    oldPrice: 3000000,
    discount: 13,
    category: 'gaming',
    rating: 4.7,
    reviewsCount: 43,
    seller: 'CyberHub',
    description: 'Razer Green Mechanical Switches, Command Dial, 8 dedicated macro keys, magnetic plush leatherette wrist rest with underglow.',
    specs: {
      switch: 'Razer Green Clicky',
      lighting: 'Chroma RGB per-key + underglow',
      polling: 'Up to 8000Hz',
      cable: 'Detachable Type-C'
    },
    stock: 15,
    location: 'Fargʻona',
    createdAt: '2023-12-14T16:40:00Z',
    isNew: false,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-037',
    title: 'Logitech G Pro X Superlight 2 Wireless Gaming Mouse',
    price: 1850000,
    oldPrice: 2150000,
    discount: 14,
    category: 'gaming',
    rating: 4.9,
    reviewsCount: 115,
    seller: 'ProGamer Store',
    description: 'Pro icon evolved. 60g ultralight design, LIGHTFORCE hybrid switches, HERO 2 sensor with 32,000 DPI and 4000Hz polling.',
    specs: {
      weight: '60 grams',
      sensor: 'HERO 2 32,000 DPI',
      switches: 'LIGHTFORCE Hybrid Optical-Mechanical',
      battery: '95 hours'
    },
    stock: 28,
    location: 'Toshkent',
    createdAt: '2024-02-15T09:10:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // 38-43: Appliances
  {
    id: 'prod-038',
    title: 'Dyson V15 Detect Absolute Cordless Vacuum Cleaner',
    price: 9300000,
    oldPrice: 10500000,
    discount: 11,
    category: 'appliances',
    rating: 4.9,
    reviewsCount: 67,
    seller: 'Dyson Official Store',
    description: 'Laser reveals invisible dust. Piezo sensor continuously sizes and counts dust particles, showing real-time proof on LCD screen.',
    specs: {
      suctionPower: '240 AW',
      runTime: 'Up to 60 minutes',
      binVolume: '0.77 liters',
      weight: '3.1 kg'
    },
    stock: 9,
    location: 'Toshkent',
    createdAt: '2024-01-12T11:00:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-039',
    title: 'DeLonghi Magnifica S Smart Espresso Machine',
    price: 5900000,
    oldPrice: 6700000,
    discount: 12,
    category: 'appliances',
    rating: 4.8,
    reviewsCount: 89,
    seller: 'Coffee Lab Tashkent',
    description: 'Bean-to-cup machine with intuitive control panel, 13 adjustable grind settings, manual milk frother for rich cappuccinos.',
    specs: {
      pressure: '15 Bar',
      waterTank: '1.8 liters',
      beanContainer: '250 g',
      power: '1450 W'
    },
    stock: 14,
    location: 'Samarqand',
    createdAt: '2023-12-01T14:30:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-040',
    title: 'Xiaomi Robot Vacuum X10+ Auto-Empty & Mop Wash',
    price: 7800000,
    oldPrice: 8900000,
    discount: 12,
    category: 'appliances',
    rating: 4.7,
    reviewsCount: 44,
    seller: 'Mi Home Store',
    description: 'Fully automated smart all-in-one station. Auto dust collection, automatic pad washing, hot air drying and water refilling.',
    specs: {
      suction: '4000 Pa',
      navigation: 'S-Cross AI 3D obstacle avoidance',
      battery: '5200 mAh',
      mop: 'Rotary dual pressurized mopping'
    },
    stock: 8,
    location: 'Toshkent',
    createdAt: '2024-02-18T10:00:00Z',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-041',
    title: 'Philips Airfryer XXL Smart Sensing Premium 7.3L',
    price: 3400000,
    oldPrice: 3900000,
    discount: 13,
    category: 'appliances',
    rating: 4.9,
    reviewsCount: 152,
    seller: 'Kitchen Plus',
    description: 'Smart Sensing technology automatically adjusts time and temperature. Fat Removal technology captures excess fat for healthier meals.',
    specs: {
      capacity: '7.3 Liters / 1.4 kg fries',
      power: '2225 W',
      programs: '5 smart presets + manual',
      cleaning: 'QuickClean basket dishwasher safe'
    },
    stock: 21,
    location: 'Andijon',
    createdAt: '2024-01-20T16:20:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-042',
    title: 'Dyson Supersonic Nural Hair Dryer Strawberry Bronze',
    price: 6100000,
    oldPrice: 6900000,
    discount: 12,
    category: 'appliances',
    rating: 4.9,
    reviewsCount: 39,
    seller: 'Dyson Official Store',
    description: 'Network of Nural sensors automatically protects scalp health and enhances natural shine. Fast intelligent heat control.',
    specs: {
      power: '1600 W',
      sensors: 'Time of Flight scalp protect',
      attachments: '5 styling magnetic nozzles',
      weight: '660 g'
    },
    stock: 11,
    location: 'Toshkent',
    createdAt: '2024-03-10T12:00:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-043',
    title: 'Panasonic Inverter Microwave Oven 32L Stainless Steel',
    price: 2800000,
    oldPrice: 3200000,
    discount: 12,
    category: 'appliances',
    rating: 4.6,
    reviewsCount: 57,
    seller: 'TechnoMart',
    description: 'Genius Sensor cooking, consistent heating without overcooking food edges, spacious 340mm turntable.',
    specs: {
      capacity: '32 Liters',
      power: '1000 W Inverter',
      turntable: '340 mm glass',
      finish: 'Anti-fingerprint stainless steel'
    },
    stock: 16,
    location: 'Namangan',
    createdAt: '2023-11-15T15:00:00Z',
    isNew: false,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // 44-48: Clothing & Footwear
  {
    id: 'prod-044',
    title: 'Nike Air Jordan 1 Retro High OG Chicago Lost & Found',
    price: 2900000,
    oldPrice: 3500000,
    discount: 17,
    category: 'clothing',
    rating: 4.9,
    reviewsCount: 188,
    seller: 'SneakerHead Tashkent',
    description: 'Vintage aesthetics nod to mother-and-pop stores of the 1980s. Premium cracked leather accents and classic color blocking.',
    specs: {
      material: 'Genuine leather and suede',
      sole: 'Air-Sole unit cushioning',
      style: 'High top sneaker',
      gender: 'Unisex'
    },
    stock: 15,
    location: 'Toshkent',
    createdAt: '2024-01-05T10:00:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-045',
    title: 'Nike Dunk Low Retro White Black Panda',
    price: 1650000,
    oldPrice: 1950000,
    discount: 15,
    category: 'clothing',
    rating: 4.8,
    reviewsCount: 340,
    seller: 'Urban Streetwear',
    description: 'Iconic monochrome colorway created for the hardwood but taken to the streets. Foam midsole offers lightweight cushioning.',
    specs: {
      material: 'Leather upper',
      sole: 'Rubber cupsole with pivot circle',
      closure: 'Lace-up',
      gender: 'Unisex'
    },
    stock: 32,
    location: 'Samarqand',
    createdAt: '2023-12-10T11:30:00Z',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-046',
    title: 'Adidas Originals Samba OG Cloud White Core Black',
    price: 1450000,
    oldPrice: 1700000,
    discount: 15,
    category: 'clothing',
    rating: 4.8,
    reviewsCount: 220,
    seller: 'Adidas Flagship UZ',
    description: 'Born on the pitch, the Samba is a timeless icon of street style. Soft leather upper with suede overlays and gum rubber sole.',
    specs: {
      material: 'Full grain leather and suede T-toe',
      lining: 'Synthetic leather',
      outsole: 'Gum rubber',
      fit: 'Regular fit'
    },
    stock: 27,
    location: 'Toshkent',
    createdAt: '2024-02-01T15:20:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-047',
    title: 'The North Face 1996 Retro Nuptse Jacket TNF Black',
    price: 3800000,
    oldPrice: 4400000,
    discount: 14,
    category: 'clothing',
    rating: 4.9,
    reviewsCount: 77,
    seller: 'Outdoor Gear',
    description: 'Built for mountain and city life. 700-fill goose down insulation offers warmth yet remains extremely compressible.',
    specs: {
      fill: '700-fill RDS certified goose down',
      fabric: 'Ripstop with non-PFC DWR water repellent',
      features: 'Stowable hood packs into collar',
      weight: '775 g'
    },
    stock: 10,
    location: 'Buxoro',
    createdAt: '2023-11-28T13:00:00Z',
    isNew: false,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-048',
    title: 'New Balance 9060 Rain Cloud with Castlerock',
    price: 2100000,
    oldPrice: 2500000,
    discount: 16,
    category: 'clothing',
    rating: 4.8,
    reviewsCount: 94,
    seller: 'SneakerLab',
    description: 'Futuristic silhouette reinterprets familiar 99X elements with warped sensibility inspired by proudly futuristic Y2K tech aesthetic.',
    specs: {
      midsole: 'Dual-density ABZORB and SBS cushioning',
      upper: 'Mesh upper with pigskin suede overlays',
      logo: 'Translucent CR device at heel',
      pattern: 'Diamond outsole pattern'
    },
    stock: 18,
    location: 'Fargʻona',
    createdAt: '2024-03-14T09:45:00Z',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
    ]
  }
];

/**
 * Fetch paginated & filtered products with simulated network latency
 */
export const fetchProducts = ({
  page = 1,
  limit = 12,
  category = 'all',
  search = '',
  sortBy = 'featured',
  filterType = null,
  minPrice = null,
  maxPrice = null,
  minRating = null,
  inStockOnly = false
} = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...MOCK_PRODUCTS];

      // Filter by category
      if (category && category !== 'all') {
        filtered = filtered.filter((p) => p.category === category);
      }

      // Filter by search query
      if (search && search.trim()) {
        const query = search.trim().toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.seller.toLowerCase().includes(query)
        );
      }

      // Filter by price range
      if (minPrice !== null && minPrice !== undefined && minPrice !== '') {
        const min = Number(minPrice);
        if (!isNaN(min) && min > 0) {
          filtered = filtered.filter((p) => p.price >= min);
        }
      }
      if (maxPrice !== null && maxPrice !== undefined && maxPrice !== '') {
        const max = Number(maxPrice);
        if (!isNaN(max) && max > 0) {
          filtered = filtered.filter((p) => p.price <= max);
        }
      }

      // Filter by rating
      if (minRating !== null && minRating !== undefined && minRating > 0) {
        filtered = filtered.filter((p) => p.rating >= Number(minRating));
      }

      // Filter by inStockOnly
      if (inStockOnly) {
        filtered = filtered.filter((p) => p.stock > 0);
      }

      // Filter by section/special flag
      if (filterType === 'deals') {
        filtered = filtered.filter((p) => p.discount > 0);
      } else if (filterType === 'new') {
        filtered = filtered.filter((p) => p.isNew);
      } else if (filterType === 'popular') {
        filtered = filtered.filter((p) => p.isPopular);
      }

      // Sorting
      if (sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'newest') {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortBy === 'discount') {
        filtered.sort((a, b) => b.discount - a.discount);
      }

      const totalItems = filtered.length;
      const totalPages = Math.ceil(totalItems / limit) || 1;
      const currentPage = Math.max(1, Math.min(page, totalPages));
      const startIndex = (currentPage - 1) * limit;
      const items = filtered.slice(startIndex, startIndex + limit);

      resolve({
        items,
        pagination: {
          page: currentPage,
          limit,
          totalItems,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1
        }
      });
    }, 280);
  });
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = MOCK_PRODUCTS.find((p) => p.id === id);
      if (product) {
        resolve({ ...product });
      } else {
        reject(new Error(`Product with ID ${id} not found`));
      }
    }, 200);
  });
};

/**
 * Fetch related products (e.g., in the same category)
 */
export const fetchRelatedProducts = (categoryId, excludeId = null, limit = 4) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let related = MOCK_PRODUCTS.filter(
        (p) => p.category === categoryId && p.id !== excludeId
      );
      if (related.length < limit) {
        // Fallback with popular products if not enough in same category
        const others = MOCK_PRODUCTS.filter(
          (p) => p.id !== excludeId && !related.some((r) => r.id === p.id)
        );
        related = [...related, ...others];
      }
      resolve(related.slice(0, limit));
    }, 200);
  });
};

/**
 * Fetch curated featured products (for home page special sections)
 */
export const fetchCuratedSection = (type = 'popular', limit = 4) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...MOCK_PRODUCTS];
      if (type === 'deals') {
        filtered = filtered.filter((p) => p.discount >= 12).sort((a, b) => b.discount - a.discount);
      } else if (type === 'new') {
        filtered = filtered.filter((p) => p.isNew);
      } else {
        // popular
        filtered = filtered.filter((p) => p.isPopular).sort((a, b) => b.reviewsCount - a.reviewsCount);
      }
      resolve(filtered.slice(0, limit));
    }, 250);
  });
};

