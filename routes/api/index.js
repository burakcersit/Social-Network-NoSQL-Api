//router
const router = require("express").Router();
//user routes
const userRoutes = require("./user-routes");
//thought routes
const thoughtRoutes = require("./thought-routes");


router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;