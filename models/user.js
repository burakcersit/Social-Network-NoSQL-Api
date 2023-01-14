const { Schema, model, } = require('mongoose');

//Defining the userSchema model as username, email, thoughts,friends

const userSchema = new Schema(
    {
        //username model(String,Unique,Required,Trimmed)
      username: {type: String,
        unique: true,
        required: true,
        trim: true,},
      //email model(String,Required,Unique,Must match a valid email address (look into Mongoose's matching validation))
      email: {type: String,
        required: true,
        unique: true,
        match: [
            //Regex for e mail address
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          "Invalid Email Address, Please fill a valid email address",
        ],},
      //thoughts model(Array of _id values referencing the Thought model)
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
      //friend model(Array of _id values referencing the User model (self-reference))
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
    
  //virtual called friendCount that retrieves the length of the user's friends array field on query.
  userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  const User = model('User', userSchema);


  // export
  module.exports = User;