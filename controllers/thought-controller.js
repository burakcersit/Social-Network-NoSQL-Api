const { Thought, User } = require("../models");

const thoughtController = {
  // Gettiing all thoughts
  getThoughts(req, res) {
    Thought.find().then((dbThought) => res.json(dbThought)).catch((err) => res.status(500).json(err));
  },

  // Get one thought using id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThought) => {
        if (!dbThought) {
          return res.status(404).json({ message: "invalid id please try again" });
        }
        res.json(dbThought);
      }).catch((err) => res.status(500).json(err));
  },

  // Creating a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThought._id } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (!dbUser) {
          return res
            .status(404)
            .json({ message: "invalid thought with this id" });
        }

        res.json(dbUser);
      })
      .then(userData => res.json(userData))
      .catch((err) => res.status(500).json(err));
   },

  // Updating thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, 
        new: true }
    )
    .then((thought) => {
        !thought ? res.status(404).json({message: 'No thought by this id'}) : res.json(thought);

    }).catch((err) => res.status(500).json(err));


},

  // Deleting thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThought) => {
        if (!dbThought) {
           res.status(404).json({ message: "No thought find with this ID" });
        }

        // Removing thought id 
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then(() => res.json({message: 'User and associated succesfully  deleted!'})).catch((err) => res.status(500).json(err));
},

  // Adding a reaction for thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          return res.status(404).json({ message: "No thought with this id! please try again" });
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // deleting reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          return res.status(404).json({ message: "invalid id, please try again" });
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(500).json(err));
    },
};
module.exports = thoughtController;