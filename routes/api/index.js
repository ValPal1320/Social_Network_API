// Express router
const router = require('express').Router();

// User and thought routes
const usersRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');

// Add `/users` to User routes 
router.use('/users', usersRoutes);

// Add `/thoughts` to Thought routes 
router.use('/thoughts', thoughtsRoutes);

module.exports = router;