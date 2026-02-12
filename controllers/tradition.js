const { name } = require('commander');
const db = require('../models');
const Tradition = db.traditions;

const apiKey = 'mySuperSecretApiKey123456';

exports.create = (req, res) => {
    // Validate request
    if (
        !req.body.name ||
        !req.body.islandId ||
        !req.body.description ||
        !req.body.category ||
        !req.body.significance

    ) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    // Create a Tradition
    const tradition = new Tradition({
        name: req.body.name,
        islandId: req.body.islandId,
        description: req.body.description,
        category: req.body.category,
        significance: req.body.significance
    });
    // Save Tradition in the database
    tradition
        .save(tradition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: 
                    err.message || 'Some error occured while creating the Tradition.',
            });
        });
};

exports.findAll = (req, res) => {
    console.log(req.header('apiKey'));
    if(req.header('apiKey') === apiKey) {
        Tradition.find(
            {},
            {
                name: 1,
                islandId: 1,
                description: 1,
                category: 1,
                significance: 1
            }
        )
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occured while retrieving traditions.',
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};

// Find a single Tradition with an id
exports.findOne = (req, res) => {
    const tradition_id = req.params.tradition_id;
    if(req.header('apiKey') === apiKey) {
        Tradition.find({ tradition_id: tradition_id })
            .then((data) => {
                if(!data)
                    res
                        .status(404)
                        .send({ message: 'Not found Tradition with id' + tradition_id });
                else res.send(data[0]);
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error retrieving Tradition with tradition_id=' + tradition_id,
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};

// Update a Tradition by the id in the request
exports.update = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const tradition_id = req.params.tradition_id;

    Tradition.findOneAndUpdate(
        { tradition_id: tradition_id },
        req.body,
        { new: true }
    )
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tradition with tradition_id=${tradition_id}.`,
                });
            } else {
                res.send({
                    message: 'Tradition was updated successfully.',
                    data
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Tradition with tradition_id=' + tradition_id,
            });
        });
};

// Delete a Tradition with the specified id in the request
exports.delete = (req, res) => {
    const tradition_id = req.params.tradition_id;

    Tradition.findOneAndDelete({ tradition_id: tradition_id })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tradition with tradition_id=${tradition_id}.`,
                });
            } else {
                res.send({
                    message: 'Tradition was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Tradition with tradition_id=' + tradition_id,
            });
        });
};

// Delete all Traditions from the database.
exports.deleteAll = (req, res) => {
    Tradition.deleteMany({})
        .then((data) => {
            res.send({
                message: `${data.deletedCount} Traditions were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while removing all traditions.',
            });
        });
};

// Find all published traditions
// exports.findAllPublished = (req, res) => {
    // Tradition.find({ published: true })
        // .then((data) => {
            // res.send(data);
        // })
        // .catch((err) => {
            // res.status(500).send({
                // message:
                    // err.message || 'Some error occurred while retrieving traditions.',
            // });
        // });
// };