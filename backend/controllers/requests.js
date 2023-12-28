const requestModel = require("../models").requests;
const usersModel = require("../models").users;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

const controller = {
  addRequest: async (req, res) => {
    console.log(req.body);

    const { tematica, status, pdf, feedback, studentId, teacherId } = req.body;
    const date = new Date();
    await usersModel
      .findByPk(studentId)
      .then(async (student) => {
        if (student) {
          if (student.isProfesor) {
            return res.status(404).json({
              message:
                "ati introdus un id de profesor in loc de unul de student",
            });
          } else {
            await usersModel
              .findByPk(teacherId)
              .then(async (teacher) => {
                if (teacher) {
                  if (!teacher.isProfesor) {
                    return res.status(404).json({
                      message:
                        "ai introdus un id de student in loc de unul de profesor",
                    });
                  } else {
                    await requestModel
                      .create({
                        date_semnatura_definitiva: date,
                        tematica,
                        status,
                        pdf,
                        feedback,
                        studentId: studentId,
                        teacherId: teacherId,
                      })
                      .then((request) => {
                        if (request) {
                          return res.status(200).send(request);
                        } else {
                          return res
                            .status(400)
                            .json({ message: "ERROR IN INSERT REQUEST" });
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        return res
                          .status(500)
                          .json({ message: "SERVER ERROR IN INSERT REQUEST" });
                      });
                  }
                } else {
                  return res.status(500).send({
                    message: "nu exista un profesor cu respectivul id",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
                return res
                  .status(500)
                  .json({ message: "problema la findByPk pt id_teacher" });
              });
          }
        } else {
          return res
            .status(404)
            .json({ message: "nu exista un student cu respectivul id" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .json({ message: "problema la findByPk pt id_student" });
      });
  },
  updateRequest: async (req, res) => {
    const id_request = req.params.id;
    const new_request = req.body;
    try {
      const request = requestModel.findByPk(id_request);
      const teacher = await usersModel.findByPk(new_request.profesorId);
      const student = await usersModel.findByPk(new_request.studentId);
      console.log(student, teacher);
      if ((teacher != null) & (student != null)) {
        if (teacher.isProfesor == true && student.isProfesor == false) {
          if (request) {
            await requestModel
              .update(new_request, { where: { id_request } })
              .then(() => {
                return res.status(200).send(new_request);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "eroare la update request" });
              });
          }
        } else {
          res.status(404).json({
            message: "id-urile furnizate nu corespund tipului de user aferent",
          });
        }
      } else {
        res
          .status(404)
          .json({ message: "nu exista foreignkey-urile aferente requestului" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  uploadFile: async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const fileName = storage.fileName;
    console.log(fileName);
    //si dupa ce testam asta ulterior legarii cu frontul, putem sa uctualizam fieldul din request cu locatia fisierului
  },
  getFilePath: async (req, res) => {
    const id_request = req.params.id;
    try {
      const request = await requestModel.findByPk(Number(id_request));
      return res.status(200).send({ path: request.pdf });
    } catch (err) {
      return res.status(500).send({ message: "Server ERROR", err: err });
    }
  },
};

module.exports = controller;
