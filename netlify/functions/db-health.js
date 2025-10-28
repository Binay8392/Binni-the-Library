const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'binni_library';

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db(DB_NAME);
    cachedDb = db;
    return db;
}

exports.handler = async (event) => {
    try {
        const db = await connectToDatabase();
        
        // Try a simple operation to verify connection
        await db.command({ ping: 1 });
        
        return {
            statusCode: 200,
            body: JSON.stringify({ healthy: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                healthy: false, 
                error: error.message 
            })
        };
    }
};