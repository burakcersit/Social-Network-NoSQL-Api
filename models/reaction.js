const { Schema, Types } = require("mongoose");


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

  module.exports = reactionSchema;