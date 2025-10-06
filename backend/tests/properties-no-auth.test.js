const mongoose = require("mongoose")
const app = require("../app")
const Property = require("../models/propertyModel")
const supertest = require("supertest")
const api = supertest(app)


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


beforeEach(async () => {
  await Property.deleteMany({});
  await Property.insertMany(properties)
})




// ---------------- GET ----------------

describe("GET /api/properties", () => {
  it("should return all the properties as JSON", async () => {
    const response = await api
      .get("/api/properties")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(properties.length)
    expect(response.body[0].title).toBe(properties[0].title)
  });
});


describe("GET /api/properties/:propertyId", () => {
  it("should return the property by Id as JSON", async () => {
    const property = await Property.findOne()
    const response = await api
      .get(`/api/properties/${property._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(property.title)
  });

  it("should return 404 for non-existing tour ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/properties/${nonExistentId}`).expect(404)
  })
})


// ---------------- POST ----------------

describe("POST /api/properties", () => {
  it("should return created property as JSON", async () => {
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
      .expect(201)
      .expect("Content-Type", /application\/json/);
    
      expect(response.body.name).toBe(newProperty.name)

      const propertiesAfterPost = await Property.find({})
      expect(propertiesAfterPost).toHaveLength(properties.length+1)

  })
})

// ---------------- PUT ----------------

describe("PUT api/properties/propertyId", ()=>{
  it("should return updated property", async ()=>{
    const property = await Property.findOne();
    const updatedProperty = {title:"Willyfog"}

    const response = await api
       .put(`/api/properties/${property._id}`)
       .send(updatedProperty)
       .expect(200)
       .expect("Content-Type", /application\/json/)

    expect(response.body.title).toBe(updatedProperty.title)

    const updatedPropertyCheck = await Property.findById(property._id)
    expect(updatedPropertyCheck.title).toBe(updatedProperty.title)
  })

  it("should return 400 for invalid property id", async()=>{
    const invalidID = "12345"
    await api.put(`/api/properties/${invalidID}`).send({}).expect(400)
  })
})


// ---------------- DELETE ----------------

describe("DELETE /api/properties/:propertyId", ()=>{
   it("should return 204 no content", async()=>{
      const property = await Property.findOne();

      await api
      .delete(`/api/properties/${property._id}`)
      .expect(204)

      const deletedPropertyCheck = await Property.findById(property._id)
      expect(deletedPropertyCheck).toBeNull()
   });

   it("should return 400 if invalid ID", async()=>{
    const invalidId = "123"
    await api.delete(`/api/properties/${invalidId}`).expect(400)
   });
});

//Close DB connection
afterAll(async ()=>{
  await mongoose.connection.close();
})