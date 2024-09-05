import request from "supertest";
import app from '../../server/express';

describe('Express App', () => {
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
            name: "John Doe",
            email: "john@mail.com",
            password: "pass1245"
        };

        const res = await request(app)
            .post('/api/users')
            .send(newUser);
        
        console.log(res.body) // checking log
        // TODO:Review failing user creation test
        expect(res.statusCode).toBe(201); // Successful creation
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe(newUser.name);
        expect(res.body.email).toBe(newUser.email);
    });
   
});