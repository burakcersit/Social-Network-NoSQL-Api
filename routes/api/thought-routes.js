const router = require("express").Router();



const {getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction,
} = require("../../controllers/thought-controller");

// api thoughts route
router.route("/").get(getThoughts).post(createThought);

// get, put, delete, api thoughts and thoughts id route
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);
//:thoughtId/reactions"
router.route("/:thoughtId/reactions").post(addReaction);
//:thoughtId/reactions/:reactionId"
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);
//exporting
module.exports = router;