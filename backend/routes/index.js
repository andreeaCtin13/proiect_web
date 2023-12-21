const express = require("express");
const router = express.Router();
const otherRoute = require("./other");
const usersRoute = require("./users");
const requestsRoute = require("./requests");
const sessionsRoute = require("./sessions");

router.use("/", otherRoute);
router.use("/users", usersRoute);
router.use("/requests", requestsRoute);
router.use("/sessions", sessionsRoute);

module.exports = router;
