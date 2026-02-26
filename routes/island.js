const express = require('express');
const router = express.Router();

const islandsController = require('../controllers/island');
const validation = require('../middleware/island-validate');

router.get('/', islandsController.getAll);

router.get('/:id', islandsController.getSingle);

router.post('/', validation.saveIsland, islandsController.createIsland);

router.put('/:id', validation.updateIsland, islandsController.updateIsland);

router.delete('/:id', islandsController.deleteIsland);

router.delete('/', islandsController.deleteAllIslands);

module.exports = router;
