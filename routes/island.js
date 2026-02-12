const routes = require('express').Router();
const islands = require('../controllers/island.js');

// GET all islands
routes.get('/', islands.findAll);

// GET island by ID
routes.get('/:island_id', islands.findOne);

// POST island
routes.post('/', islands.create);

// PUT island
routes.put('/:island_id', islands.update);

// DELETE island
routes.delete('/:island_id', islands.delete);

// DELETE all islands
routes.delete('/', islands.deleteAll);

// GET all published islands
// routes.get('/', islands.findAllPublished);

module.exports = routes;
