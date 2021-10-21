const express = require('express');
const router = express.Router();

// Get Functions
router.use(require('./ticketRoutes'));
router.use(require('./userRoutes'));
router.use(require('./teamRoutes'));
router.use(require('./commentRoutes'));
router.use(require('./settingRoutes'));


module.exports = router;