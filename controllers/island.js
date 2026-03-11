const Island = require('../models/island');

// READ ALL
const getAll = async (req, res) => {
  try {
    const islands = await Island.find();
    res.status(200).json(islands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
const getSingle = async (req, res) => {
  try {
    const island = await Island.findById(req.params.id);
    if (!island) return res.status(404).json({ message: 'Island not found' });
    res.status(200).json(island);
  } catch (err) {
    res.status(400).json({ message: 'Invalid island ID' });
  }
};

// CREATE
const createIsland = async (req, res) => {
  try {
    const island = new Island(req.body);
    await island.save();
    res.status(201).json(island);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
const updateIsland = async (req, res) => {
  try {
    const island = await Island.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!island) return res.status(404).json({ message: 'Island not found' });
    res.status(202).json(island);
  } catch (err) {
    res.status(400).json({ message: 'Invalid island ID or data' });
  }
};

// DELETE ONE
const deleteIsland = async (req, res) => {
  try {
    const island = await Island.findByIdAndDelete(req.params.id);
    if (!island) return res.status(404).json({ message: 'Island not found' });
    res.status(204).json({ message: 'Island deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid island ID' });
  }
};

// DELETE ALL
const deleteAllIslands = async (req, res) => {
  try {
    await Island.deleteMany({});
    res.status(204).json({ message: 'All islands deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createIsland, updateIsland, deleteIsland, deleteAllIslands };