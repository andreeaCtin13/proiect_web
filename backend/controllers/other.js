const { DB_Init } = require("../models");

const connection = require("../models").connection;

const controller = {
  resetDb: (req, res) => {
    DB_Init();
    connection
      .sync({
        force: true,
      })
      .then(() => {
        connection
          .sync({ force: true })
          .then(() => {
            res.status(200).send({ message: "Baza de date a fost resetata" });
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(500)
              .send({ message: "Eroare la resetarea bazei de date", err: err });
          });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({ message: "Eroare la resetarea bazei de date" });
      });
  },
};

module.exports = controller;
