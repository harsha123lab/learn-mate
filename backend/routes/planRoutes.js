const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

/**
 * Plan Routes
 */
router.post('/generate-plan', planController.generatePlan);
router.get('/plan/:id', planController.getPlan);
router.put('/progress/:id', planController.updateProgress);

module.exports = router;
