const express = require('express');
const router = express.Router();
const traditionsController = require('../controllers/tradition');
const validation = require('../middleware/tradition-validate');

router.get('/', traditionsController.getAll);

router.get('/:id', traditionsController.getSingle);

router.post('/', validation.saveTradition, traditionsController.createTradition);

router.put('/:id', validation.saveTradition, traditionsController.updateTradition);

router.delete('/:id', traditionsController.deleteTradition);

router.delete('/', traditionsController.deleteAllTraditions);

module.exports = router;
