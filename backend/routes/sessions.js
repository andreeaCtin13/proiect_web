const express = require("express");
const router = express.Router();
const sessionController = require("../controllers").sessions;

router.post("/insertBulkSession", sessionController.insertBulkSessions);
router.get("/getAllSessions", sessionController.getAllSessions);

module.exports = router;
