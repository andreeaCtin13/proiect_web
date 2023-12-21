const sessionsModel = require("../models").sessions;
const usersModel = require("../models").users;
const controller = {
  insertBulkSessions: async (req, res) => {
    const sessions = req.body;
    const newSessions = [...sessions];
    for (let i = 0; i < newSessions.length; i++) {
      if (newSessions[i].hasOwnProperty("data_inceput")) {
        let data = newSessions[i].data_inceput.split("/");
        let d = data.map((x) => Number(x));
        newSessions[i].data_inceput = new Date(d[2], d[1], d[0]);
      }
      if (newSessions[i].hasOwnProperty("data_final")) {
        let data = newSessions[i].data_final.split("/");
        let d = data.map((x) => Number(x));
        newSessions[i].data_final = new Date(d[2], d[1], d[0]);
      }
      if (newSessions[i].data_inceput > newSessions[i].data_final) {
        return res
          .status(400)
          .send({ message: "Eroare validitate date", position: i });
      }
      if (newSessions[i].hasOwnProperty("id_prof_asociat")) {
        const user = await usersModel.findOne({
          where: {
            idUser: newSessions[i].id_prof_asociat,
            isProfesor: true,
          },
        });
        if (!user) {
          return res.status(400).send({
            message: "nu exista id-ul profesorului asociat furnizat",
            position: i,
          });
        } else {
          continue;
        }
      } else {
        return res.status(400).send({
          message: "nu ai introdus id-ul profului asociat",
          position: i,
        });
      }
    }

    await sessionsModel
      .bulkCreate(newSessions)
      .then(() => {
        return res.status(200).send("Bulk insert successful");
      })
      .catch((err) => {
        return res.status(500).send("Error during bulk insert");
      });
  },
  getAllSessionsByID: async (req, res) => {
    const { id } = req.params;
    const sessionByID = sessionsModel.findAll({
      include: [
        {
          model: usersModel,
          as: "sessions",
          where: { idUser: id },
        },
      ],
      where: { id_prof_asociat: id_profesor_asociat },
    });
    if (!sessionByID) {
      return res
        .status(400)
        .send({ message: "nu exista sesiuni pentru profesorul furnizat" });
    } else {
      return res.status(200).send(sessionByID);
    }
  },
};

module.exports = controller;
