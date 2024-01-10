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
  "/uploadFile/:id",
  upload.single("file"),
  requestsController.uploadFile
);
router.get("/getFilePath/:id", requestsController.getFilePath);
router.get(
  "/getAllAcceptedRequestsOfATeacher/:id_teacher/teacher_query",
  requestsController.getAllAcceptedRequestsOfATeacher
);

router.get(
  "/findAcceptedRequestOfAStudent/:id_student",
  requestsController.findAcceptedRequestOfAStudent
);
module.exports = router;
