const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');

router.get('/', clientController.getClient);
router.post('/', clientController.postClient);

module.exports = router;  
