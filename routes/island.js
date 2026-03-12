const express = require('express');
const router = express.Router();
const traditionsController = require('../controllers/tradition');
const islandsController = require('../controllers/island');
const validation = require('../middleware/island-validate');

router.get('/', islandsController.getAll);

router.get('/:id', islandsController.getSingle);

router.get('/:id/traditions', traditionsController.getTraditionsByIsland); // reads all traditions of a single island

router.post('/', validation.saveIsland, islandsController.createIsland);

router.put('/:id', validation.updateIsland, islandsController.updateIsland);

router.delete('/:id', islandsController.deleteIsland);

router.delete('/', islandsController.deleteAllIslands);

module.exports = router;
