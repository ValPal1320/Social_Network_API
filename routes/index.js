// Require express router
const router = require('express').Router();

// Import all of the API routes
const apiRoutes = require('./api');

// Add prefix of `/api` to all of the api routes 
router.use('/api', apiRoutes);

// Error message
router.use((req, res) => res.send('Error: Wrong route'));

module.exports = router;