const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const islandSchema = new Schema({
    name: String,
    country: String,
    population: Number,
    language: String,
    capital: String,
    subRegion: String,
    climate: String,
    mainIndustries: [String],
    elevation: Number
});

module.exports = mongoose.model('Island', islandSchema);