// Require express router
const router = require('express').Router();

// Set requirements (from userController)
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/users <GET, POST>
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id <GET, PUT, DELETE>
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId <POST, DELETE>
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router; 