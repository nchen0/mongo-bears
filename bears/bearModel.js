// create a model for our bears.
const mongoose = require("mongoose");
// Schema

const BearSchema = new mongoose.Schema({
  // declare a schema. Your documents will 'look like this'
  species: {
    type: String,
    required: true,
    unique: true
  },
  latinName: {
    type: String,
    require: true
  },
  createOn: {
    type: Date, // Date is a nother type in Mongoose.
    default: Date.now()
  }
});

const bearsModel = mongoose.model("Bear", BearSchema);

module.exports = bearsModel;
