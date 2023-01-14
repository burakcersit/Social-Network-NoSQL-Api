const { User, Thought } = require("../models");

const userController = {
  // Getting all users from data
  getUsers(req, res) {
    User.find()      
    .select("-__v")
    .then((dbUser) => res.json(dbUser)).catch((err) => res.status(500).json(err));
},

  // Get single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")      
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(404).json({ message: "No user find with this id! please try again" });
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },



  // Updating a user info
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(404).json({ message: "No user find with this id! please try again" });
        }
        res.json(dbUser);
      })
      .catch((err) => res.status(500).json(err));
    },
  

    // Creating a new user
    createUser(req, res) {
        User.create(req.body)
          .then((dbUser) => {
            res.json(dbUser);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

  // Adding friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(404).json({ message: "No user find with this id! please try again" });
        }
        res.json(dbUser);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Removing friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(404).json({ message: "No user find with this id! please try again" });
        }
        res.json(dbUser);
      })
      .catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;