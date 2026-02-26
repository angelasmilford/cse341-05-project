const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


// READ
const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('traditions')
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
    return res.status(400).json('Must use a valid tradition id to find a tradition.');
  }
  const traditionId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('traditions')
    .find({ _id: traditionId })
    .toArray((err, result) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if(!result.length) {
        return res.status(404).json({ message: 'Tradition not found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};


// CREATE
const createTradition = async (req, res) => {
  const tradition = {
    name: req.body.name,
    islandId: req.body.islandId,
    description: req.body.description,
    category: req.body.category,
    significance: req.body.significance
  };

  try {
    const response = await mongodb.getDb().db().collection('traditions').insertOne(tradition);
    if (response.acknowledged) {
      return res.status(201).json(response);
    } else {
      return res.status(500).json(response.error || 'Some error occurred while creating the tradition.');
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// UPDATE
const updateTradition = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid tradition id to update a tradition.');
  }
  const traditionId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const tradition = {
    name: req.body.name,
    islandId: req.body.islandId,
    description: req.body.description,
    category: req.body.category,
    significance: req.body.significance
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('traditions')
    .replaceOne({ _id: traditionId }, tradition);
  console.log(response);
  if (response.modifiedCount > 0) {
    return res.status(202).json({ message: 'Tradition successfully updated' });
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the tradition.');
  }
};


// DELETE
const deleteTradition = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid tradition id to delete a tradition.');
  }
  const traditionId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('traditions').deleteOne({ _id: traditionId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).json({ message: 'Tradition successfully deleted' });
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the tradition.');
  }
};

const deleteAllTraditions = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('traditions')
      .deleteMany({});

    res.status(204).json({ message: 'Traditions successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAll,
  getSingle,
  createTradition,
  updateTradition,
  deleteTradition,
  deleteAllTraditions
};
