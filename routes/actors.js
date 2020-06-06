const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController')

router.get('/', actorsController.index)
router.get('/detail/:id', actorsController.detail)

router.delete('/detail/:id/delete', actorsController.delete)

router.get('/detail/:id/edit', actorsController.edit)
router.put('/detail/:id/edit', actorsController.processEdit)

router.get('/recommended', actorsController.recommended)

router.get('/search', actorsController.search);
router.post('/search', actorsController.processSearch)

module.exports = router;