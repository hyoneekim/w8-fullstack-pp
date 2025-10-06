const Property = require("../models/propertyModel");
const mongoose = require("mongoose");

//GET / jobs;
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).sort({createdAt: -1})
    res.status(200).json(properties)
    
  } catch (error) {
    res.status(500).json({message: "Error fetching properties!"})
  }
};

// POST /jobs
const createProperty = async (req, res) => {
  try {
    const property = await Property.create({...req.body})
   
    res.status(201).json(property)
   
  } catch (error) {
    res.status(500).json({message: "Error creating job"})
  }
};

// GET /jobs/:jobId
const getPropertyById = async (req, res) => {
  const {propertyId} = req.params

  if(!mongoose.Types.ObjectId.isValid(propertyId)){
    return res.status(404).json({message: "Invalid id"})
  }

  try {
    const property = await Property.findById(propertyId)
    res.status(200).json(property)
    
  } catch (error) {
    res.status(400).json({message: "Property not found"})
  }
};

// PUT /jobs/:jobId
const updateProperty = async (req, res) => {
   const {propertyId} = req.params
   const updatedQuery = req.body

  if(!mongoose.Types.ObjectId.isValid(propertyId)){
    return res.status(404).json({message: "Invalid id"})
  }

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId, 
      updatedQuery,
      {new: true} 
    )
     
    res.status(200).json(updatedProperty)

  } catch (error) {
    res.status(500).json({message: "Error editing property"})
  }
};

// DELETE /jobs/:jobId
const deleteProperty = async (req, res) => {
  const {propertyId} = req.params

  if(!mongoose.Types.ObjectId.isValid(propertyId)){
    return res.status(404).json({message: "Invalid id"})
  }

  try {

    const deletedProperty = await Property.findByIdAndDelete(propertyId)
    res.status(204).json({message: "Deleted successfully"})
    
  } catch (error) {
    res.status(500).json({message: "Couldnt delete the property"})
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
