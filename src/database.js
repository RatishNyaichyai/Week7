const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';

async function InsertDB(data) {
    const client = new MongoClient(uri);
    try {
        const database = client.db('InsertCanvas');
        const collectionName = database.collection('canvas');
        const doc = [data];
        console.log('data', data);
        const result = await collectionName.insertMany(doc);
        console.log('Inserted:', result);
        await client.close();
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    InsertDB
}

