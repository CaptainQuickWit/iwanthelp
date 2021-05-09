const router = require('express').Router();
const userRoutes = require('./userRoutes');
// this route will be updated for MESH cards 
// const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
// router.use('/projects', projectRoutes);

module.exports = router;