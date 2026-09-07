const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./model/Product');
const User = require('./model/User');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding...');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});

        // Dummy Products
        const products = [
            {
                name: 'Wireless Headphones',
                description: 'High-quality wireless headphones with noise cancellation',
                price: 79.99,
                category: 'Electronics',
                stock: 50,
                imageUrl: 'https://via.placeholder.com/300?text=Headphones',
                rating: 4.5,
                numReviews: 25
            },
            {
                name: 'USB-C Cable',
                description: 'Durable USB-C charging cable, 2 meters long',
                price: 12.99,
                category: 'Accessories',
                stock: 150,
                imageUrl: 'https://via.placeholder.com/300?text=USB-Cable',
                rating: 4.2,
                numReviews: 42
            },
            {
                name: 'Mechanical Keyboard',
                description: 'RGB Mechanical Gaming Keyboard with Cherry MX switches',
                price: 129.99,
                category: 'Electronics',
                stock: 30,
                imageUrl: 'https://via.placeholder.com/300?text=Keyboard',
                rating: 4.7,
                numReviews: 18
            },
            {
                name: 'Wireless Mouse',
                description: 'Precision wireless mouse with adjustable DPI',
                price: 34.99,
                category: 'Electronics',
                stock: 75,
                imageUrl: 'https://via.placeholder.com/300?text=Mouse',
                rating: 4.3,
                numReviews: 31
            },
            {
                name: '4K Webcam',
                description: '4K Ultra HD webcam with auto-focus and microphone',
                price: 89.99,
                category: 'Electronics',
                stock: 20,
                imageUrl: 'https://via.placeholder.com/300?text=Webcam',
                rating: 4.6,
                numReviews: 15
            },
            {
                name: 'Phone Stand',
                description: 'Adjustable phone stand for desk',
                price: 19.99,
                category: 'Accessories',
                stock: 100,
                imageUrl: 'https://via.placeholder.com/300?text=Phone+Stand',
                rating: 4.1,
                numReviews: 28
            }
        ];

        // Dummy Users
        const users = [
            {
                name: 'Admin User',
                email: 'admin@shopnest.com',
                password: 'hashed_password_123', // In real app, this should be hashed
                isAdmin: true,
                phone: '9876543210'
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'hashed_password_456',
                isAdmin: false,
                phone: '9123456789'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'hashed_password_789',
                isAdmin: false,
                phone: '9987654321'
            }
        ];

        // Insert data
        await Product.insertMany(products);
        console.log(`${products.length} products seeded successfully!`);

        await User.insertMany(users);
        console.log(`${users.length} users seeded successfully!`);

        console.log('Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

connectDB();
seedDatabase();

importData();