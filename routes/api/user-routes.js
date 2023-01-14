const router = require("express").Router();

const {getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend,
} = require("../../controllers/user-controller");


// api, user route
router.route("/").get(getUsers).post(createUser);


//api, user, user id, route
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);


//api, user, user id, friend, friend id, route
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);


//exportinhg
module.exports = router;