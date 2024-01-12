const express = require("express");
const router = express.Router();

const useriController = require("../controllers").users;

router.post("/login", useriController.login);
router.post("/register", useriController.register);
router.get(
  "/getAllStudentsRequest/:id_profesor/student_query",
  useriController.getStudentsByRequestStatusWithFilterAndPagination
);

router.put("/updateUser/:id_user", useriController.updateUserById);
router.get(
  "/getAllTeachers/teachers_query",
  useriController.getAllTeachersWithFilterAndPagination
);
router.get(
  "/getAllTeachersRequests/:id_student/teacher_query",
  useriController.getTechersRequestsStatusWithFilterAndPagination
);
router.get("/getUserByID/:id", useriController.getUserByID);
router.get(
  "/getAllAcceptedStudents/:idTeacher/accepted_query",
  useriController.getAllAcceptedStudents
);

router.get(
  "/getAllTeachersRequestFromTeacherHomepage/:id_teacher/teacher_query",
  useriController.getAllTeachersRequest
);

module.exports = router;
