const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('islands')
    .find()
    .toArray((err, lists) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid island id to find an island.');
  }
  const islandId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('islands')
    .find({ _id: islandId })
    .toArray((err, result) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if(!result.length) {
        return res.status(404).json({ message: 'Island not found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createIsland = async (req, res) => {
  const island = {
    name: req.body.name,
    country: req.body.country,
    population: req.body.population,
    language: req.body.language,
    capital: req.body.capital,
    subRegion: req.body.subRegion,
    climate: req.body.climate,
    mainIndustries: req.body.mainIndustries,
    elevation: req.body.elevation
  };

  try {
    const response = await mongodb.getDb().db().collection('islands').insertOne(island);
    if (response.acknowledged) {
      return res.status(201).json(response);
    } else {
      return res.status(500).json(response.error || 'Some error occurred while creating the island.');
    }
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateIsland = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid island id to update a island.');
  }
  const islandId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const island = {
    name: req.body.name,
    country: req.body.country,
    population: req.body.population,
    language: req.body.language,
    capital: req.body.capital,
    subRegion: req.body.subRegion,
    climate: req.body.climate,
    mainIndustries: req.body.mainIndustries,
    elevation: req.body.elevation
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('islands')
    .replaceOne({ _id: islandId }, island);
  console.log(response);
  if (response.modifiedCount > 0) {
    return res.status(202).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the island.');
  }
};

const deleteIsland = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid island id to delete a island.');
  }
  const islandId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('islands').deleteOne({ _id: islandId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the island.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createIsland,
  updateIsland,
  deleteIsland
};