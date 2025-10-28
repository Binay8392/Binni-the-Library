const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string (you'll need to set this in Netlify environment variables)
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'binni_library';

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        const client = await MongoClient.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db(DB_NAME);
        cachedDb = db;
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

exports.handler = async (event) => {
    try {
        await connectToDatabase();
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                success: false, 
                error: error.message 
            })
        };
    }
};