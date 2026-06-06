const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Imports
const Product = require('../models/Product');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

// Sample Product Catalog Source Data
const sampleProducts = [
  // 1. SKY SERIES
  {
    id: "SAA-1",
    name: "Single Soap Dish",
    category: "Sky",
    series: "Sky Series",
    badge: "",
    description: "Elegant single soap dish premium accessory with ceramic inserts and a sleek frame.",
    image: "/products/SAA-1.jpg",
    price: 745,
    finishes: ["Chrome", "Black Matte", "Rose Gold"],
    acrylicVariants: ["Dark Acrylic", "White Ceramic"]
  },
  {
    id: "SAA-2",
    name: "Double Soap Dish",
    category: "Sky",
    series: "Sky Series",
    badge: "",
    description: "Premium double soap dish utility rack with luxurious dark-framed borders.",
    image: "/products/SAA-2.jpg",
    price: 1030,
    finishes: ["Chrome", "Black Matte", "Rose Gold"],
    acrylicVariants: ["Dark Acrylic", "White Ceramic"]
  },
  {
    id: "SAA-5",
    name: "Tumbler Holder With Liquid Soap Dispenser",
    category: "Sky",
    series: "Sky Series",
    badge: "hot",
    description: "Stunning 2-in-1 combo unit comprising a premium ceramic tumbler holder and a liquid soap dispenser bottle.",
    image: "/products/SAA-5.jpg",
    price: 1344,
    finishes: ["Chrome", "Black Matte"],
    acrylicVariants: ["Dark Acrylic", "White Ceramic"]
  },
  {
    id: "SAA-15",
    name: "Towel Rack Rod",
    category: "Sky",
    series: "Sky Series",
    badge: "new",
    description: "Heavy-duty wall mounted towels rack with an integrated support rod, crafted in precision dark acrylic.",
    image: "/products/SAA-15.jpg",
    price: 2715,
    finishes: ["Chrome", "Black Matte", "Rose Gold"],
    acrylicVariants: ["Dark Acrylic"]
  },

  // 2. PRISM SERIES
  {
    id: "PSAA-1",
    name: "Single Soap Dish",
    category: "Prism",
    series: "Prism Series",
    badge: "",
    description: "Luxurious marble-finish single soap dish highlighted with stunning copper brackets.",
    image: "/products/PSAA-1.jpg",
    price: 540,
    finishes: ["Rose Gold", "Chrome"],
    acrylicVariants: ["Marble Acrylic", "White Acrylic"]
  },
  {
    id: "PSAA-6",
    name: "Tumbler Holder with Liquid Soap Dispenser",
    category: "Prism",
    series: "Prism Series",
    badge: "hot",
    description: "Double accessory system featuring matching rose gold mounts and marble-texture acrylic backplate.",
    image: "/products/PSAA-6.jpg",
    price: 1050,
    finishes: ["Rose Gold", "Chrome"],
    acrylicVariants: ["Marble Acrylic", "White Acrylic"]
  },
  {
    id: "PSAA-12",
    name: "Self with Tumbler Holder & Dispenser",
    category: "Prism",
    series: "Prism Series",
    badge: "new",
    description: "An elegant all-in-one shelf unit organizing everyday soap, liquid dispenser, and brushes.",
    image: "/products/PSAA-12.jpg",
    price: 1440,
    finishes: ["Rose Gold", "Chrome"],
    acrylicVariants: ["Marble Acrylic"]
  },

  // 3. LUME SERIES
  {
    id: "LAA-1",
    name: "Single Soap Dish",
    category: "Lume",
    series: "Lume Series",
    badge: "",
    description: "Rustic yet ultra-modern wooden-style wall mount plate carrying a white frosted soap dish accessory.",
    image: "/products/LAA-1.jpg",
    price: 315,
    finishes: ["Wood-tone", "Black", "Chrome"],
    acrylicVariants: ["White Acrylic"]
  },
  {
    id: "LAA-7",
    name: "Soap Dish with Tumbler & Dispenser",
    category: "Lume",
    series: "Lume Series",
    badge: "",
    description: "A luxury wood-finish tri-accessory tray designed to hold toothbrushes, soap, and handwash.",
    image: "/products/LAA-7.jpg",
    price: 1170,
    finishes: ["Wood-tone", "Black"],
    acrylicVariants: ["White Acrylic"]
  },
  {
    id: "LAA-16",
    name: "Towel Rack Rod (24x12\")",
    category: "Lume",
    series: "Lume Series",
    badge: "new",
    description: "Exquisite white acrylic towel rack framed by beautiful natural oak wood brackets.",
    image: "/products/LAA-16.jpg",
    price: 2280,
    finishes: ["Wood-tone", "Black", "Chrome"],
    acrylicVariants: ["White Acrylic"]
  },

  // 4. VECTOR SERIES
  {
    id: "VAA-1",
    name: "Single Soap Dish",
    category: "Vector",
    series: "Vector Series",
    badge: "",
    description: "Bold industrial black matte metal mount complete with heavy-duty dark smoke acrylic tray.",
    image: "/products/VAA-1.jpg",
    price: 315,
    finishes: ["Black Matte"],
    acrylicVariants: ["Black Acrylic", "White Acrylic"]
  },
  {
    id: "VAA-12",
    name: "Soap Dish Tumbler Holder & Dispenser",
    category: "Vector",
    series: "Vector Series",
    badge: "hot",
    description: "Compact black themed triple bath vanity combo for contemporary layouts.",
    image: "/products/VAA-12.jpg",
    price: 960,
    finishes: ["Black Matte"],
    acrylicVariants: ["Black Acrylic"]
  },
  {
    id: "VAA-22",
    name: "5 in 1 Set",
    category: "Vector",
    series: "Vector Series",
    badge: "new",
    description: "Master bathroom 5-piece hardware pack including soap dish, towel ring, robe hooks, shelf and dispenser.",
    image: "/products/VAA-22.jpg",
    price: 2010,
    finishes: ["Black Matte"],
    acrylicVariants: ["Black Acrylic", "White Acrylic"]
  },

  // 5. NOVA SERIES
  {
    id: "NOAA-1",
    name: "Single Soap Dish",
    category: "Nova",
    series: "Nova Series",
    badge: "",
    description: "Sleek dark brackets supporting clear white high-gloss acrylic soap dish layouts.",
    image: "/products/NOAA-1.jpg",
    price: 360,
    finishes: ["Black", "Gold"],
    acrylicVariants: ["White Acrylic"]
  },
  {
    id: "NOAA-9",
    name: "3 in 1 Set",
    category: "Nova",
    series: "Nova Series",
    badge: "hot",
    description: "Essential trio pack of matching bath fixtures featuring premium white acrylic backing.",
    image: "/products/NOAA-9.jpg",
    price: 1080,
    finishes: ["Black", "Gold"],
    acrylicVariants: ["White Acrylic"]
  },
  {
    id: "NOAA-11",
    name: "5 in 1 Set",
    category: "Nova",
    series: "Nova Series",
    badge: "new",
    description: "Full premium white bathroom accessories pack with elegant black accent framing.",
    image: "/products/NOAA-11.jpg",
    price: 1710,
    finishes: ["Black", "Gold"],
    acrylicVariants: ["White Acrylic"]
  },

  // 6. NEO SERIES
  {
    id: "NEAA-1",
    name: "Single Soap Dish",
    category: "Neo",
    series: "Neo Series",
    badge: "",
    description: "Ultra-slim copper frames coupled with high-strength glossy white acrylic plates.",
    image: "/products/NEAA-1.jpg",
    price: 270,
    finishes: ["Copper", "Rose Gold"],
    acrylicVariants: ["White Acrylic"]
  },
  {
    id: "NEAA-2",
    name: "Double Soap Dish",
    category: "Neo",
    series: "Neo Series",
    badge: "",
    description: "Double level space saving soap holder featuring copper style fittings.",
    image: "/products/NEAA-2.jpg",
    price: 360,
    finishes: ["Copper", "Rose Gold"],
    acrylicVariants: ["White Acrylic"]
  },

  // 7. PRIME SERIES
  {
    id: "PMAA-6",
    name: "Square Single Soap Dish",
    category: "Prime",
    series: "Prime Series",
    badge: "",
    description: "Distinctive thick dark base with rose gold fittings supporting a premium square soap tray.",
    image: "/products/PMAA-6.jpg",
    price: 420,
    finishes: ["Rose Gold", "Gold", "Black"],
    acrylicVariants: ["Dark Acrylic"]
  },
  {
    id: "PMAA-15",
    name: "Mobile Stand",
    category: "Prime",
    series: "Prime Series",
    badge: "new",
    description: "Convenient wall-mounted premium phone stand with rose gold safety rail, perfect for contemporary master bath suites.",
    image: "/products/PMAA-15.jpg",
    price: 300,
    finishes: ["Rose Gold", "Gold", "Black"],
    acrylicVariants: ["Dark Acrylic"]
  },
  {
    id: "PMAA-24",
    name: "4 Parrot Key Stand",
    category: "Prime",
    series: "Prime Series",
    badge: "",
    description: "Traditional designer parrot-head utility key rack constructed with premium brass fittings and rose gold finishes.",
    image: "/products/PMAA-24.jpg",
    price: 300,
    finishes: ["Rose Gold", "Gold"],
    acrylicVariants: ["Dark Acrylic"]
  }
];

/**
 * Execute Database Seeding Operations
 */
const seedDatabase = async () => {
  try {
    // 1. Connect
    console.log('Connecting to database for seeding...');
    await connectDB();

    // 2. Clean Existing Products
    console.log('Clearing old product catalog...');
    await Product.deleteMany({});
    console.log('Product catalogue wiped clean.');

    // 3. Clean Existing Admins
    console.log('Clearing old administrative accounts...');
    await Admin.deleteMany({});
    console.log('Admin records wiped clean.');

    // 4. Seed Admin
    console.log('Seeding default administrator...');
    const defaultAdmin = new Admin({
      username: 'admin',
      password: 'adminpassword123', // Will be hashed via pre-save hook
      email: 'greenvolt28@gmail.com'
    });
    await defaultAdmin.save();
    console.log('Default administrator created successfully:');
    console.log('  - Username: admin');
    console.log('  - Password: adminpassword123');

    // 5. Seed Products
    console.log('Seeding sample catalog products...');
    const productsCount = sampleProducts.length;
    await Product.insertMany(sampleProducts);
    console.log(`Seeded ${productsCount} luxury bath accessories.`);

    console.log('Database Seeding Completed Successfully! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Seeding process encountered an error:', error);
    process.exit(1);
  }
};

// Start seeding
seedDatabase();
