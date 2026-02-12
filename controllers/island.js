const db = require('../models');
const Island = db.islands;

const apiKey = 'mySuperSecretApiKey123456';

exports.create = (req, res) => {
    // Validate request
    if (
        !req.body.name ||
        !req.body.country ||
        !req.body.population ||
        !req.body.language ||
        !req.body.capital ||
        !req.body.subRegion ||
        !req.body.climate ||
        !req.body.mainIndustries ||
        !req.body.elevation

    ) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    // Create a Island
    const island = new Island({
        name: req.body.name,
        country: req.body.country,
        population: req.body.population,
        language: req.body.language,
        capital: req.body.capital,
        subRegion: req.body.subRegion,
        climate: req.body.climate,
        mainIndustries: req.body.mainIndustries,
        elevation: req.body.elevation
    });
    // Save Island in the database
    island
        .save(island)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: 
                    err.message || 'Some error occured while creating the Island.',
            });
        });
};

exports.findAll = (req, res) => {
    console.log(req.header('apiKey'));
    if(req.header('apiKey') === apiKey) {
        Island.find(
            {},
            {
                island_id: 1,
                name: 1,
                country: 1,
                population: 1,
                language: 1,
                capital: 1,
                subRegion: 1,
                climate: 1,
                mainIndustries: 1,
                elevation: 1,
                _id: 0,
            }
        )
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occured while retrieving islands.',
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};

// Find a single Island with an id
exports.findOne = (req, res) => {
    const island_id = req.params.island_id;
    if(req.header('apiKey') === apiKey) {
        Island.find({ island_id: island_id })
            .then((data) => {
                if(!data)
                    res
                        .status(404)
                        .send({ message: 'Not found Island with id' + island_id });
                else res.send(data[0]);
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error retrieving Island with island_id=' + island_id,
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};

// Update a Island by the id in the request
exports.update = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const island_id = req.params.island_id;

    Island.findOneAndUpdate(
        { island_id: island_id },
        req.body,
        { new: true }
    )
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Island with island_id=${island_id}.`,
                });
            } else {
                res.send({
                    message: 'Island was updated successfully.',
                    data
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Island with island_id=' + island_id,
            });
        });
};

// Delete a Island with the specified id in the request
exports.delete = (req, res) => {
    const island_id = req.params.island_id;

    Island.findOneAndDelete({ island_id: island_id })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Island with island_id=${island_id}.`,
                });
            } else {
                res.send({
                    message: 'Island was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Island with island_id=' + island_id,
            });
        });
};

// Delete all Islands from the database.
exports.deleteAll = (req, res) => {
    Island.deleteMany({})
        .then((data) => {
            res.send({
                message: `${data.deletedCount} Islands were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while removing all islands.',
            });
        });
};

// Find all published islands
// exports.findAllPublished = (req, res) => {
    // Island.find({ published: true })
        // .then((data) => {
            // res.send(data);
        // })
        // .catch((err) => {
            // res.status(500).send({
                // message:
                    // err.message || 'Some error occurred while retrieving island.',
            // });
        // });
// };