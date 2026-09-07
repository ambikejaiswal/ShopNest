const mongoose = require('mongoose');

const getMongoUri = () => {
    if (!process.env.MONGODB_HOSTS) {
        return process.env.MONGODB_URI;
    }

    const srvUri = new URL(process.env.MONGODB_URI);
    const options = new URLSearchParams(srvUri.search);
    options.set('tls', 'true');
    options.set('authSource', 'admin');
    options.set('retryWrites', 'true');
    options.set('w', 'majority');

    return `mongodb://${srvUri.username}:${srvUri.password}@${process.env.MONGODB_HOSTS}${srvUri.pathname}?${options.toString()}`;
};

const connectDB = async () => {
    try {
        await mongoose.connect(getMongoUri(), {
            serverSelectionTimeoutMS: 10000,
        });
        console.log('MongoDB connected successfully');
    }
    catch(error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
