require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log('MongoDB Atlas Connected for seeding');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const products = [
    {
        title: 'Wireless Headphones',
        description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        image: 'https://picsum.photos/seed/1/600/400',
        price: 199.99,
        rating: 4.5,
        category: 'Electronics',
    },
    {
        title: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking, GPS, and water resistance. Stay connected and monitor your fitness.',
        image: 'https://picsum.photos/seed/2/600/400',
        price: 299.99,
        rating: 4.7,
        category: 'Electronics',
    },
    {
        title: 'Laptop Stand',
        description: 'Ergonomic aluminum laptop stand that improves posture and airflow. Adjustable height and angle.',
        image: 'https://picsum.photos/seed/3/600/400',
        price: 49.99,
        rating: 4.3,
        category: 'Accessories',
    },
    {
        title: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with Cherry MX switches. Perfect for gaming and typing.',
        image: 'https://picsum.photos/seed/4/600/400',
        price: 129.99,
        rating: 4.6,
        category: 'Electronics',
    },
    {
        title: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking and long battery life. Comfortable for extended use.',
        image: 'https://picsum.photos/seed/5/600/400',
        price: 39.99,
        rating: 4.4,
        category: 'Accessories',
    },
    {
        title: 'Desk Lamp',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.',
        image: 'https://picsum.photos/seed/6/600/400',
        price: 59.99,
        rating: 4.2,
        category: 'Accessories',
    },
    {
        title: 'USB-C Hub',
        description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Expand your connectivity options.',
        image: 'https://picsum.photos/seed/7/600/400',
        price: 79.99,
        rating: 4.5,
        category: 'Accessories',
    },
    {
        title: 'Portable Speaker',
        description: 'Waterproof portable Bluetooth speaker with 360-degree sound. Perfect for outdoor adventures.',
        image: 'https://picsum.photos/seed/8/600/400',
        price: 89.99,
        rating: 4.3,
        category: 'Electronics',
    },
    {
        title: 'Webcam HD',
        description: '1080p HD webcam with auto-focus and built-in microphone. Ideal for video calls and streaming.',
        image: 'https://picsum.photos/seed/9/600/400',
        price: 69.99,
        rating: 4.4,
        category: 'Electronics',
    },
    {
        title: 'Monitor Stand',
        description: 'Sleek monitor stand with cable management and storage space. Organize your workspace.',
        image: 'https://picsum.photos/seed/10/600/400',
        price: 34.99,
        rating: 4.1,
        category: 'Accessories',
    },
    {
        title: 'Tablet Stand',
        description: 'Adjustable tablet stand made from premium materials. Perfect for reading and video watching.',
        image: 'https://picsum.photos/seed/11/600/400',
        price: 24.99,
        rating: 4.0,
        category: 'Accessories',
    },
    {
        title: 'Phone Case',
        description: 'Protective phone case with shock absorption and raised bezels. Available in multiple colors.',
        image: 'https://picsum.photos/seed/12/600/400',
        price: 19.99,
        rating: 4.2,
        category: 'Accessories',
    },
];

const seedDB = async () => {
    await connectDB();

    try {
        // Check if products already exist
        const existingProducts = await Product.countDocuments();

        if (existingProducts > 0) {
            console.log('Products already exist in database. Skipping seed.');
            await mongoose.connection.close();
            process.exit(0);
        }

        // Insert products
        await Product.insertMany(products);
        console.log(`Seeded ${products.length} products successfully!`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedDB();

