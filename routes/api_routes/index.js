const express = require('express');
const router = express.Router();

// Get Functions
router.use(require('./ticketRoutes'));
router.use(require('./userRoutes'));
router.use(require('./teamRoutes'));
router.use(require('./commentRoutes'));
router.use(require('./settingRoutes'));
// router.use(require('./update_ticket'));

module.exports = router;