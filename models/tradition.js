const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const traditionSchema = new Schema({
    name: String, 
    islandId: {
        type: Schema.Types.ObjectId,
        ref: 'Island'
    },
    description: String,
    category: String,
    significance: String
});

module.exports = mongoose.model('Tradition', traditionSchema);