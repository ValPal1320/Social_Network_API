const { User, Thought } = require("../models");

module.exports = {

    //Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    //Get one thought by Id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtID })
            .select("-___v")
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'Thought ID does not exist' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ thought }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thought: thought._id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "User ID does not exist" })
                    : res.json('Thought was created')
            )
            .catch((err) => res.status(500).json(err));
    },

    //Update a thought by Id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought ID does not exist' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //Delete a thought by Id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought ID does not exist' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User ID does not exist. Thought has been deleted.' })
                    : res.json({ message: 'Thought successfully deleted' })
            )
            .catch((err) => res.status(500).json(err));
    },

    //Create a new reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Thought ID does not exist" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //Delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought find with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};