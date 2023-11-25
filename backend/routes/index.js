const express = require("express");
const router = express.Router();
const otherRoute = require("./other");
const usersRoute = require("./users");

router.use("/", otherRoute);
router.use("/users", usersRoute);
module.exports = router;
