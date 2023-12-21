const sessionsModel = require("../models").sessions;

const controller = {
  insertBulkSessions: (req, res) => {
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
    }
    sessionsModel
      .bulkCreate(newSessions)
      .then(() => {
        console.log("Bulk insert successful");
        return res.status(200).send("Bulk insert successful");
      })
      .catch((error) => {
        console.error("Error during bulk insert:", error);
        return res.status(500).send("Error during bulk insert");
      });
  },
  getAllSessions: (req, res) => {
    res.status(200).json({ message: "totu ok getAllSessions" });
  },
};

module.exports = controller;
