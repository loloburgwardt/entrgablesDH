const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.index)
router.get('/detail/:id', moviesController.detail)

router.delete('/detail/:id/delete', moviesController.delete)

router.get('/detail/:id/edit', moviesController.edit)
router.put('/detail/:id/edit', moviesController.processEdit)

router.get('/new', moviesController.new)

router.get('/recommended', moviesController.recommended)

router.get('/search', moviesController.search);
router.post('/search', moviesController.processSearch)

module.exports = router;