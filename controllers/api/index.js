const router = require('express').Router();
const memberRoutes = require('./memberRoutes');
const cardRoutes = require('./cardRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/members', memberRoutes);
router.use('/cards', cardRoutes);
router.use('/comments', commentRoutes);

module.exports = router;