const express = require('express');
const router = express.Router();
const { addCheckIn, getCheckIns } = require('../controllers/checkInController');

router.post('/', addCheckIn);
router.get('/', getCheckIns);

module.exports = router;