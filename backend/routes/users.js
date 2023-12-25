const express = require("express");
const router = express.Router();

const useriController = require("../controllers").users;

router.get("/login", useriController.login);
router.post("/register", useriController.register);
router.get(
  "/getAllStudentsRequest/:id_profesor/student_query",
  useriController.getStudentsByRequestStatusWithFilterAndPagination
);

router.put("/updateUser/:id_user", useriController.updateUserIdProfAsociat);
router.get(
  "/getAllTeachers/teachers_query",
  useriController.getAllTeachersWithFilterAndPagination
);

module.exports = router;
