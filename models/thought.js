const { Schema, model } = require("mongoose");


//Reaction (SCHEMA ONLY)
const reactionSchema = new Schema(
    {
        //Use Mongoose's ObjectId data type,Default value is set to a new ObjectId
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      //reactionBody: String,Required,280 character maximum
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      //username:String,Required
      username: {
        type: String,
        required: true,
      },
      
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );



//thought schema
const thoughtSchema = new Schema(
  {
    //thought text(String,Required,Must be between 1 and 280 characters)
    thoughtText: {type: String,
      required: true,
      minlength: 1,
      maxlength: 280, },
    
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);



//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// creating the User model using the UserSchema

const Thought = model("Thought", thoughtSchema);
//exporting 
module.exports = Thought;