const Tradition = require('../models/tradition');

// READ ALL
const getAll = async (req, res) => {
  try {
    const traditions = await Tradition.find();
    res.status(200).json(traditions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
const getSingle = async (req, res) => {
  try {
    const tradition = await Tradition.findById(req.params.id);
    if (!tradition) return res.status(404).json({ message: 'Tradition not found' });
    res.status(200).json(tradition);
  } catch (err) {
    res.status(400).json({ message: 'Invalid tradition ID' });
  }
};

// READ ALL of an island's traditions(s)
const getTraditionsByIsland = async (req, res) => {
  try {
    const traditions = await Tradition.find({ islandId: req.params.id });

    if (!traditions.length) {
      return res.status(404).json({ message: 'No traditions found for this island' });
    }

    res.status(200).json(traditions);
  } catch (err) {
    res.status(400).json({ message: 'Invalid island ID' });
  }
};

// CREATE
const createTradition = async (req, res) => {
  try {
    const tradition = new Tradition({
      name: req.body.name,
      islandId: req.body.islandId,
      description: req.body.description,
      category: req.body.category,
      significance: req.body.significance
    });
    await tradition.save();
    res.status(201).json(tradition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
const updateTradition = async (req, res) => {
  try {
    const tradition = await Tradition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!island) return res.status(404).json({ message: 'Tradition not found' });
    res.status(202).json(tradition);
  } catch (err) {
    res.status(400).json({ message: 'Invalid tradition ID or data' });
  }
};

// DELETE ONE
const deleteTradition = async (req, res) => {
  try {
    const tradition = await Tradition.findByIdAndDelete(req.params.id);
    if (!tradition) return res.status(404).json({ message: 'Tradition not found' });
    res.status(204).json({ message: 'Tradition deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid tradition ID' });
  }
};

// DELETE ALL
const deleteAllTraditions = async (req, res) => {
  try {
    await Tradition.deleteMany({});
    res.status(204).json({ message: 'All traditions deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  getTraditionsByIsland,
  createTradition,
  updateTradition,
  deleteTradition,
  deleteAllTraditions
};