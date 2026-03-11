const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const traditionSchema = new Schema({
  name: { type: String, required: true },

  islandId: {
    type: Schema.Types.ObjectId,
    ref: 'Island',
    required: true
  },

  description: { type: String, required: true },
  category: { type: String, required: true },
  significance: { type: String, required: true }
});

module.exports = mongoose.model('Tradition', traditionSchema);