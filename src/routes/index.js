const express = require('express');
const router = express.Router();
    

router.use(require('./signUpRoute'));
router.use(require('./loginRoute'));
router.use(require('./ticketRoutes'));
router.use(require('./userRoutes'));
router.use(require('./teamRoutes'));
router.use(require('./commentRoutes'));
router.use(require('./settingRoutes'));
router.use(require('./projectRoutes'));

module.exports = router;