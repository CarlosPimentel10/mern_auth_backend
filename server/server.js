import express from 'express';
import devBundle from './devBundle';
import path from 'path';
import template from '../template';
import mongoose from 'mongoose';
import config from '../config/config'; 

// Initialize express app
const app = express();
devBundle.compile(app);

// Serve static files
const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// Root route
app.get('/', (req, res) => {
    res.status(200).send(template());
});

// Process Data as JSON
app.use(express.json());

// MongoDB Connection
const url = process.env.MONGODB_URI || config.mongoUri || 'mongodb://localhost:27017/';

// Connect to MongoDB using Mongoose
mongoose.connect(url)
    .then(() => {
        console.log("Connected successfully to MongoDB server");

        // Start the server after successful connection
        const port = process.env.PORT || config.port || 3000; // Check config.port if defined
        app.listen(port, () => {
            console.info('Server started on port %s.', port);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Define a simple User schema if needed
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
});



const User = mongoose.model('User', userSchema);

// Example API route for fetching users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Example for creating users
app.post('/api/users', async(req, res) => {
    try {
        const {name, email, password } = req.body;
        // validate
        if(!name || !email || !password){
            return res.status(400).json({error: 'Name, email and password are required.'})
        }
        const hashed_password = password;
        const newUser = new User({name, email, password:hashed_password});
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({error: error.message});
        
    }
})

// function to insert a test document into the database
const insertTestDocument = async () => {
    try {
        const newUser = new User({ name: 'Test Document', value: 42 });
        const savedUser = await newUser.save();
        console.log('Inserted document:', savedUser);
    } catch (error) {
        console.error('Error inserting document:', error);
    }
};



