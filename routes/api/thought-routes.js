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

// /api/thoughts <GET>
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id <GET, PUT, DELETE>
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:userId <POST>
// router.route('/:userId').post(createThought);

// /api/thoughts/:thoughtId/reactions <POST>
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactionId <DELETE>
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;