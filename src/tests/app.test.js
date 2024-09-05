import request from "supertest";
import app from '../../server/express';
import userModel from "../../server/models/user.model";

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
            name: "Joaquin",
            email: "joaquim@mail.com", // Ensure this is unique for the test run
            password: "ajoaj8451"
        };
    
        const res = await request(app)
            .post('/api/users')
            .send(newUser);
    
        console.log(res.body); // Check the response body for debugging
        expect(res.statusCode).toBe(201); // Successful creation
        expect(res.body).toHaveProperty('_id'); // Verify that the user has an ID
        expect(res.body.name).toBe(newUser.name); // Verify name matches
        expect(res.body.email).toBe(newUser.email); // Verify email matches
    });
    afterAll(async () => {
        await mongoose.connection.close(); // Close the MongoDB connection after tests
    });
   
});