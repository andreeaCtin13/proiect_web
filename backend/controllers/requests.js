const requestModel = require("../models").requests;
const usersModel = require("../models").users;

const controller = {
  addRequest: async (req, res) => {
    const {
      data_semnatura_definitiva,
      tematica,
      status,
      pdf,
      feedback,
      id_student,
      id_profesor,
    } = req.body;

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
                    // varianta corecta
                    await requestModel
                      .create({
                        data_semnatura_definitiva,
                        tematica,
                        status,
                        pdf,
                        feedback,
                        id_student,
                        id_profesor,
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
};

module.exports = controller;
