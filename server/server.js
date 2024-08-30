import express from 'express'
import devBundle from './devBundle'
import path from 'path'
import template from '../template'
import { MongoClient } from 'mongodb'

const app = express()
devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
    res.status(200).send(template())
})

let port = process.env.PORT || 3000
app.listen(port, function onStart(err){
    if(err){
        console.log(err)
    }
    console.info('Server started on port %s.', port)
})



const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
MongoClient.connect(url, (err, client) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }
    console.log("Connected successfully to MongoDB server");

    const db = client.db('mernSimpleDB'); // Replace with your actual database name
    const collection = db.collection('mern'); // Replace with your collection name

    // Insert a document
    collection.insertOne({ name: 'Test Document', value: 42 }, (err, result) => {
        if (err) {
            console.error('Error inserting document:', err);
        } else {
            console.log('Inserted document:', result.ops);
        }
        client.close(); // Close the connection when done
    });
});