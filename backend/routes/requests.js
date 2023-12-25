const express = require("express");
const router = express.Router();
const multer = require("multer");

const requestsController = require("../controllers").requests;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/addRequest", requestsController.addRequest);
router.put("/updateRequest/:id", requestsController.updateRequest);
router.post(
  "/uploadFile",
  upload.single("file"),
  requestsController.uploadFile
);
router.get("/getFilePath/:id", requestsController.getFilePath);

module.exports = router;
