const routes = require('express').Router();
const traditions = require('../controllers/tradition.js');

// GET all traditions
routes.get('/', traditions.findAll);

// GET tradition by ID
routes.get('/:tradition_id', traditions.findOne);

// POST tradition
routes.post('/', traditions.create);

// PUT tradition
routes.put('/:tradition_id', traditions.update);

// DELETE tradition
routes.delete('/:tradition_id', traditions.delete);

// DELETE all traditions
routes.delete('/', traditions.deleteAll);

// GET all published traditions
// routes.get('/', traditions.findAllPublished);

module.exports = routes;