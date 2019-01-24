const express = require('express');
const router = express.Router();

const authorizeController = require('../controllers/authorizeController');

router.get('/', authorizeController.authorize);
router.post('/authn', authorizeController.authn);

module.exports = router;  