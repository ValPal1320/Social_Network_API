// Require express router
const router = require('express').Router();

// Set requirements (from thoughtController)
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

// /api/thoughts <GET> and <POST>
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id <GET, PUT, DELETE>
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions <POST> and <DELETE>
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;