const express = require('express');
const router = express.Router();

router.use(require('./get_tickets'));
router.use(require('./create_tickets'));

module.exports = router;