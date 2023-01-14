const router = require("express").Router();
//importing all api routes
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  return res.send("Invalid route please try again!");
});

module.exports = router;