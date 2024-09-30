import request from "supertest";
import app from '../../server/express';
import mongoose from "mongoose";
import userModel from "../../server/models/user.model";



// MongoDB connection setup for the test environment
beforeAll(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/testdb'); // No deprecated options
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});

// Clear the users collection before each test to avoid duplicate data
beforeEach(async () => {
    await mongoose.connection.db.collection('users').deleteMany({});
});

// Close the MongoDB connection after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Express App', () => {
    // Root endpoint
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Welcome to the API" });
    });
    
   
    it('Should respond with 200 status code and JSON when GET / is called', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    it('Should handle POST requests to /api/users', async () => {
        const newUser = {
            name: "testaD",
            email: "testaD@mail.com", // Ensure this is unique for the test run
            password: "xyzndmf1244" // Add password here
        };
    
        const res = await request(app)
            .post('/api/users')
            .send(newUser);
    
        console.log(res.body); // Check the response body for debugging
        expect(res.statusCode).toBe(201); // Check if the user is successfully created
    }, 10000); // Set timeout to 10 seconds (10000ms)
     
   
});