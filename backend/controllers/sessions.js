const sessionsModel = require("../models").sessions;
const usersModel = require("../models").users;

const overlap = (p1, p2) => {
  return (
    (p1.data_inceput <= p2.data_inceput && p1.data_final >= p2.data_inceput) ||
    (p2.data_inceput <= p1.data_inceput && p2.data_final >= p1.data_inceput)
  );
};

const controller = {
  insertBulkSessions: async (req, res) => {
    const sessions = req.body;
    const newSessions = [...sessions];
    console.log("print 1 - ", newSessions);
    for (let i = 0; i < newSessions.length; i++) {
      if (newSessions[i].hasOwnProperty("data_inceput")) {
        let data = newSessions[i].data_inceput.split("-");
        let d = data.map((x) => Number(x));
        newSessions[i].data_inceput = new Date(d[0], d[1] - 1, d[2]);
      }
      if (newSessions[i].hasOwnProperty("data_final")) {
        let data = newSessions[i].data_final.split("-");
        let d = data.map((x) => Number(x));
        newSessions[i].data_final = new Date(d[0], d[1] - 1, d[2]);
      }
      if (newSessions[i].data_inceput > newSessions[i].data_final) {
        return res
          .status(400)
          .send({ message: "Eroare validitate date", position: i });
      }
      console.log(newSessions);

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

    for (let i = 0; i < newSessions.length - 1; i++) {
      const currentPeriod = newSessions[i];
      const nextPeriod = newSessions[i + 1];
      if (overlap(currentPeriod, nextPeriod)) {
        return res
          .status(400)
          .send({ message: "The sessions are overlapping" });
      }
    }

    console.log(newSessions);
    await sessionsModel
      .bulkCreate(newSessions, {
        fields: ["data_inceput", "data_final", "id_prof_asociat"],
      })
      .then(() => {
        return res.status(200).send("Bulk insert successful");
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: "Error during bulk insert", err: err });
      });
  },
  getAllSessionsByID: async (req, res) => {
    const { id } = req.params;
    const sessionByID = await sessionsModel.findAll({
      where: { id_prof_asociat: id },
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
