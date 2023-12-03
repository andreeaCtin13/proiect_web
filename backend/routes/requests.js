const express = require("express");
const router = express.Router();
const requestsController = require("../controllers").requests;

router.post("/addRequest", requestsController.addRequest);

module.exports = router;
