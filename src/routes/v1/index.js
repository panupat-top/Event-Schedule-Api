const express = require('express');

const router = express.Router();

router.use('/event', require('./event.route'));

module.exports = router;
