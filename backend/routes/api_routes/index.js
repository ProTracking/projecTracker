const express = require('express');
const router = express.Router();

router.use(require('./get_tickets'));
router.use(require('./create_tickets'));
router.use(require('./create_team'));
router.use(require('./create_user'));
router.use(require('./create_comment'));
router.use(require('./create_setting'));

module.exports = router;