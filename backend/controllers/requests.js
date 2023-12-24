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
    const { tematica, status, pdf, feedback, id_student, id_profesor } =
      req.body;
    const date = new Date();

    await usersModel
      .findByPk(id_student)
      .then(async (student) => {
        if (student) {
          if (student.isProfesor) {
            res.status(404).json({
              message:
                "ati introdus un id de profesor in loc de unul de student",
            });
            return;
          } else {
            await usersModel
              .findByPk(id_profesor)
              .then(async (teacher) => {
                if (teacher) {
                  if (!teacher.isProfesor) {
                    res.status(404).json({
                      message:
                        "ai introdus un id de student in loc de unul de profesor",
                    });
                    return;
                  } else {
                    await requestModel
                      .create({
                        date_semnatura_definitiva: date,
                        tematica,
                        status,
                        pdf,
                        feedback,
                        studentId: id_student,
                        teacherId: id_profesor,
                      })
                      .then((request) => {
                        if (request) {
                          res.status(200).send(request);
                        } else {
                          res
                            .status(400)
                            .json({ message: "ERROR IN INSERT REQUEST" });
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        res
                          .status(500)
                          .json({ message: "SERVER ERROR IN INSERT REQUEST" });
                      });
                  }
                } else {
                  res.status(500).send({
                    message: "nu exista un profesor cu respectivul id",
                  });
                  return;
                }
              })
              .catch((err) => {
                console.log(err);
                res
                  .status(500)
                  .json({ message: "problema la findByPk pt id_teacher" });
                return;
              });
          }
        } else {
          res
            .status(404)
            .json({ message: "nu exista un student cu respectivul id" });
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "problema la findByPk pt id_student" });
        return;
      });
  },
  updateRequest: async (req, res) => {
    const id_request = req.params.id;
    console.log(id_request);
    const new_request = req.body;
    try {
      const request = requestModel.findByPk(id_request);
      if (request) {
        await requestModel
          .update(new_request, { where: { id_request } })
          .then((result) => {
            res.status(200).send(new_request);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "eroare la update request" });
          });
      } else {
        res
          .status(404)
          .json({ message: "nu exista request ul cu id ul respectiv" });
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
