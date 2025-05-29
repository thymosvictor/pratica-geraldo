const express = require('express');
const router = express.Router();

const musicController = require('../controllers/controller');

router.get('/', musicController.getAllMusics);
router.get('/buscar', musicController.buscarMusicas);
router.post('/', musicController.createMusic);
router.get('/:id', musicController.getMusicById);
router.put('/:id', musicController.updateMusic);
router.delete('/:id', musicController.deleteMusic);

module.exports = router;
