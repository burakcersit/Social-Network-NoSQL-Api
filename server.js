//express setup
const express = require("express");
//connection file require
const db = require("./config/connection");
//routes require
const routes = require("./routes");

//Server runnin on 3001
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});