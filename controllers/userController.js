const { User, Thought } = require('../models');

module.exports = {

    //Get all users
    getAllUsers(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //Get user by Id
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User ID does not exist' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //Create one user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !User
                    ? res.status(404).json({ message: 'User ID does not exist' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //Delete a user
    deleteUser(req, res) {
        User.findByIdAndDelete({ _id: req.params.userId })
            .then(
                (user) =>
                    !user
                        ? res.status(404).json({ message: "User ID does not exist" })
                        : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User has been successfully deleted.' }))
            .catch((err) => res.status(500).json(err));
    },

    //Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "User ID does not exist" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(
                (user) =>
                    !user
                        ? res.status(404).json({ message: "User ID does not exist" })
                        : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
}