const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const islandSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  population: { type: Number, required: true },
  language: { type: String, required: true },
  capital: { type: String, required: true },
  subRegion: { type: String, required: true },
  climate: { type: String, required: true },
  mainIndustries: [String],
  elevation: { type: Number, required: true }
});

module.exports = mongoose.model('Island', islandSchema);