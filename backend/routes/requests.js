const express = require("express");
const router = express.Router();
const requestsController = require("../controllers").requests;

router.post("/addRequest", requestsController.addRequest);
router.put("/updateRequest/:id", requestsController.updateRequest);

module.exports = router;
