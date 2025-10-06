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


beforeEach(async () =>{
  await Property.deleteMany({});
  await Property.insertMany(properties)
})




// ---------------- GET ----------------

describe("GET /api/properties", () =>{
  it("should return all the properties as JSON", async () =>{
    const response = await api
       .get("api/properties")
       .expect(200)
       .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(properties.length)
    expect(response.body[0].name).toBe(properties[0].name)   
  })
})