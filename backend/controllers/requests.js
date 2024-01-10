const requestModel = require("../models").requests;
const usersModel = require("../models").users;
const multer = require("multer");
const { PassThrough } = require("stream");
const { OrOp } = require("./operators");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, `${file.originalname}-${uniqueSuffix}`);
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
      if (request) {
        await requestModel
          .update(new_request, { where: { id_request } })
          .then(async () => {
            const req = await requestModel.findByPk(id_request);
            return res.status(200).send(req);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "eroare la update request" });
          });
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
    if (req.file === undefined) {
      return res.status(400).json({ message: "you should introduce a file" });
    }
    const id_request = req.params.id;

    const new_request = {
      pdf: req.file.path,
    };

    try {
      const fileName = storage.fileName;
      const request = requestModel.findByPk(id_request);
      if (request) {
        await requestModel
          .update(new_request, { where: { id_request } })
          .then(async () => {
            const req = await requestModel.findByPk(id_request);
            return res.status(200).send(req);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "eroare la update request" });
          });
      } else {
        res
          .status(404)
          .json({ message: "nu exista foreignkey-urile aferente requestului" });
      }
    } catch (err) {
      return res.status(200).json({ message: "error" });
    }
  },
  getFilePath: async (req, res) => {
    const id_request = req.params.id;

    try {
      const request = await requestModel.findByPk(Number(id_request));
      if (!request) {
        return res.status(400).json({ error: "File Not Found" });
      }
      return res.status(200).send(request.pdf);
    } catch (err) {
      console.error("Error downloading file:", err);
      return res.status(500).send({ message: "Server ERROR", err: err });
    }
  },

  getAllAcceptedRequestsOfATeacher: async (req, res) => {
    const id_teacher = req.params.id_teacher;
    const filter = req.query;
    if (!filter.take) filter.take = 10;

    if (!filter.skip) filter.skip = 1;
    let whereClause = {};
    whereClause.status = { [OrOp]: ["accepted", "loading", "final"] };

    await requestModel
      .findAndCountAll({
        where: { teacherId: id_teacher, ...whereClause },
        limit: parseInt(filter.take),
        offset: parseInt(filter.skip - 1) * parseInt(filter.take),
      })
      .then((requests) => {
        console.log(requests);
        res.status(200).json(requests);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "server error", err: err });
      });
  },
};

module.exports = controller;
