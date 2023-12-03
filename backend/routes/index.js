const express = require("express");
const router = express.Router();
const otherRoute = require("./other");
const usersRoute = require("./users");
const requestsRoute = require("./requests");

router.use("/", otherRoute);
router.use("/users", usersRoute);
router.use("/requests", requestsRoute);
module.exports = router;
