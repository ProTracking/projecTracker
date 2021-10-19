const express = require('express');
const router = express.Router();

// Get Functions
router.use(require('./get_tickets'));
router.use(require('./get_users'));
router.use(require('./get_teams'));
router.use(require('./get_comments'));
router.use(require('./get_settings'));

// Create Functions
router.use(require('./create_tickets'));
router.use(require('./create_team'));
router.use(require('./create_user'));
router.use(require('./create_comment'));
router.use(require('./create_setting'));

module.exports = router;