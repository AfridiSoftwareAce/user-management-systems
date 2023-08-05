const mongoose = require('mongoose');

const DB_OPTIONS = {
    dbName: process.env.DB_NAME
};

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, DB_OPTIONS);
        console.log("Database connected successfully");
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the process with failure code
    }
};

module.exports = connectdb;
