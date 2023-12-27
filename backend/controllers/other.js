const { DB_Init } = require("../models");

const connection = require("../models").connection;

const userModel = require("../models").users;
const sessionsModel = require("../models").sessions;

const userController = require("./users");
const sessionsController = require("./sessions");

const controller = {
  resetDb: async (req, res) => {
    DB_Init();
    await connection
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
// insertUserWithBulk: async (req, res) => {
//   user_given = req.body.user;
//   sessions = req.body.sessions;
//   const { id_user } = req.params;
//   return sequelize.transaction(async (t) => {
//     const mail = user_given.mail;
//     const password = user_given.password;
//     const nume = user_given.nume;
//     const isProfesor = user_given.isProfesor;
//     const idProfAsociat = user_given.idProfAsociat;
//     const nrMaximStudenti = user_given.nrMaximStudenti;
//     try {
//       let user = usersModel.findOne({ where: { mail: mail } });
//       if (user) {
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         const user = await usersModel.create({
//           isProfesor,
//           nume,
//           mail,
//           password: hashedPassword,
//           id_profesor_asociat: idProfAsociat,
//           nr_maxim_studenti: nrMaximStudenti,
//         });
//         const jwtToken = generateAccessToken(user);
//         return res.status(200).json({ user, jwtToken });
//       } else {
//         return res.status(409).json({ message: "user deja existent" });
//       }
//     } catch (err) {
//       if (err.name === "SequelizeValidationError") {
//         return res.status(400).json({ message: "Invalid email" });
//       }
//       if (err.name === "SequelizeUniqueConstraintError") {
//         return res.status(400).json({ message: "Email already used" });
//       }
//       return res.status(500).json({ message: "server error", err: err });
//     }
//   });

//   const newSessions = [...sessions];
//   for (let i = 0; i < newSessions.length; i++) {
//     if (newSessions[i].hasOwnProperty("data_inceput")) {
//       let data = newSessions[i].data_inceput.split("-");
//       let d = data.map((x) => Number(x));
//       newSessions[i].data_inceput = new Date(d[0], d[1] - 1, d[2]);
//     }
//     if (newSessions[i].hasOwnProperty("data_final")) {
//       let data = newSessions[i].data_final.split("-");
//       let d = data.map((x) => Number(x));
//       newSessions[i].data_final = new Date(d[0], d[1] - 1, d[2]);
//     }
//     if (newSessions[i].data_inceput > newSessions[i].data_final) {
//       return res
//         .status(400)
//         .send({ message: "Eroare validitate date", position: i });
//     }
//     console.log(newSessions);

//     if (newSessions[i].hasOwnProperty("id_prof_asociat")) {
//       const user = await usersModel.findOne({
//         where: {
//           idUser: newSessions[i].id_prof_asociat,
//           isProfesor: true,
//         },
//       });

//       if (!user) {
//         return res.status(400).send({
//           message: "nu exista id-ul profesorului asociat furnizat",
//           position: i,
//         });
//       } else {
//         continue;
//       }
//     } else {
//       return res.status(400).send({
//         message: "nu ai introdus id-ul profului asociat",
//         position: i,
//       });
//     }
//   }

//   for (let i = 0; i < newSessions.length - 1; i++) {
//     const currentPeriod = newSessions[i];
//     const nextPeriod = newSessions[i + 1];
//     if (overlap(currentPeriod, nextPeriod)) {
//       return res
//         .status(400)
//         .send({ message: "The sessions are overlapping" });
//     }
//   }

//   console.log(newSessions);
//   await sessionsModel
//     .bulkCreate(newSessions, {
//       fields: ["data_inceput", "data_final", "id_prof_asociat"],
//     })
//     .then(() => {
//       return res.status(200).send("Bulk insert successful");
//     })
//     .catch((err) => {
//       return res
//         .status(500)
//         .send({ message: "Error during bulk insert", err: err });
//     });
// },
