const express = require('express');
const router = express.Router();
const authorizeController = require('../controllers/authorizeController');

router.get('/', authorizeController.token);

module.exports = router;