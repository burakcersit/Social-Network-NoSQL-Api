const mongoose = require("mongoose");

mongoose.connect(
      //'mongodb://localhost:27017/socialnetwork', {

  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialnetwork",
  {

    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;