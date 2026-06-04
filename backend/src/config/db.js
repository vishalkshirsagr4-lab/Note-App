const mongoose = require('mongoose');
require('dotenv').config();

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongoose connected successfully');
    } catch (error) {
        console.log('Something went wrong: ' + error);
        process.exit(1);
    }
}

module.exports = connectdb;