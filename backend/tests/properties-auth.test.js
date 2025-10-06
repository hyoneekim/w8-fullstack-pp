const moongose = require("mongoose")
const app = require("../app")
const supertest = require("supertest")
const api = supertest(app)
const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");


const properties = [
    {
        title: "La Rosaleda",
        type: "Apartment",
        description: "Nice apartment",
        price: 50.000,
        location: {
            address: "Calle Romeria del Rocio",
            city: "Malaga",
            state: "Malaga",
            zipCode: "29640"
        },
        squareFeet: 30,
        yearBuilt: 2014
    },
    {
        title: "Bernabeu",
        type: "House",
        description: "Nice house",
        price: 50.000,
        location: {
            address: "Calle El Paquito del Rocio",
            city: "Malaga",
            state: "Malaga",
            zipCode: "29640"
        },
        squareFeet: 100,
        yearBuilt: 1999
    }
]

let token = null;

beforeAll(async () => {
    await User.deleteMany({})
    const result = await api.post("/api/users/signup").send({
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
    token = result.body.token
})

describe("Protected Properties router", ()=>{
    beforeEach(async()=>{
        await Property.deleteMany({})
        await Promise.all([
            api.post("/api/properties").set("Authorization", "Bearer " + token).send(properties[0]), 
            api.post("/api/properties").set("Authorization", "Bearer " + token).send(properties[1]) 
        ])
    })

   
  // ---------------- GET ----------------
  it("should return all the properties as JSON when GET /api/properties is called", async ()=>{
    const response = await api
       .get("/api/properties")
       .expect(200)
       .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(properties.length)   
  })


  //-----------------POST-------------------------------
  it("shoudl crete one property when POST /api/properties is called", async ()=>{
    const newProperty = {
      title: "Camp Now",
      type: "House",
      description: "Nice house",
      price: 500.000,
      location: {
        address: "Calle Sant al Cugat",
        city: "Barcelona",
        state: "Barcelona",
        zipCode: "29640"
      },
      squareFeet: 200,
      yearBuilt: 2025
    };

    const response = await api
        .post("/api/properties")
        .send(newProperty)
        .set("Authorization", "Bearer " + token)
        .expect(201)
    
        expect(response.body.title).toBe(newProperty.title)
  })

  // ---------------- GET by ID ----------------
   it("should return one property by id", async()=>{
    const property = await Property.findOne()
    const response = await api
       .get(`/api/properties/${property._id}`)
       .set("Authorization", "Bearer " + token)
       .expect(200)
       .expect("Content-Type", /application\/json/)

    expect(response.body.title).toBe(property.title)   
   })

     // ---------------- PUT ----------------

     it("shoudl update an property by id", async()=>{
        const property  = await Property.findOne();
         const updatedProperty = {title:"Willyfog"}

         const response = await api 
         .put(`/api/properties/${property._id}`)
         .set("Authorization", "Bearer " +  token)
         .send(updatedProperty)
         .expect(200)
         .expect("Content-Type", /application\/json/)
         
         expect(response.body.title).toBe(updatedProperty.title)
          
         const updatedPropertyCheck = await Property.findById(property._id)
         expect(updatedPropertyCheck.title).toBe(updatedProperty.title)
        })

    // ---------------- DELETE ----------------
    
    it("shoud delete an property by id", async()=>{
        const property = await Property.findOne()
        
        const response = await api
           .delete(`/api/properties/${property._id}`)
           .set("Authorization", "Bearer " + token)
           .expect(204)

        const propertyCheck = await Property.findById(property._id)
        expect(propertyCheck).toBeNull();
    })

})

afterAll(async ()=>{
    await mongoose.connection.close()
})