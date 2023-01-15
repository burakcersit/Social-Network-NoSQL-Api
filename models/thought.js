const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction")


//thought schema
const thoughtSchema = new Schema(
  {
    //thought text(String,Required,Must be between 1 and 280 characters)
    thoughtText: {type: String,
      required: true,
      minlength: 1,
      maxlength: 280, },
      reactions: [reactionSchema]
    
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function(){
  return this.reactions.length;
});
const Thought = model("Thought", thoughtSchema);
//exporting 
module.exports = Thought;
