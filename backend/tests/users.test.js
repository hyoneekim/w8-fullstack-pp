const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // app.js already connects to DB
const api = supertest(app);
const User = require("../models/userModel");

// Clean the users collection before each test
beforeEach(async () => {
    await User.deleteMany({});
});

describe("User Routes", () => {
    describe("POST /api/users/signup", () => {
        it("✅ should signup a new user with valid credentials", async () => {
            const userData = {
                name: "Mehdi",
                username: "15151251251241",
                password: "StrongPassword123!",
                phone_number: "0141251512",
                gender: "male",
                date_of_birth: "05-11-2001",
                role: "admin",
                address: {
                    street: "Martinpolku",
                    city: "Vantaa",
                    state: "Uusima",
                    zipCode: "01620"
                }
            };

            const result = await api.post("/api/users/signup").send(userData);

            expect(result.status).toBe(201);
            expect(result.body).toHaveProperty("token");

            // Extra check: user is actually saved in DB
            const savedUser = await User.findOne({ username: userData.username });
            expect(savedUser).not.toBeNull();
        });

    });

    describe("POST /api/users/login", () => {
        it("✅ should login a user with valid credentials", async () => {
            // First signup
            await api.post("/api/users/signup").send({
                name: "Mehdi",
                username: "15151251251241",
                password: "StrongPassword123!",
                phone_number: "0141251512",
                gender: "male",
                date_of_birth: "05-11-2001",
                role: "admin",
                address: {
                    street: "Martinpolku",
                    city: "Vantaa",
                    state: "Uusima",
                    zipCode: "01620"
                }
            });

            // Then login
            const result = await api.post("/api/users/login").send({
                username: "15151251251241",
                password: "StrongPassword123!",
            });

            expect(result.status).toBe(200);
            expect(result.body).toHaveProperty("token");
        });

        it("❌ should return an error with wrong password", async () => {
            const result = await api.post("/api/users/login").send({
                username: "15151251251241",
                password: "wrongpassword",
            });

            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        });
    });
});

// Close DB connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});