const usersModel = require("../models").users;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "2h" });
};

const controller = {
  getAllUsers: (req, res) => {
    res.status(200).send("totu ok la user");
  },

  login: async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;

    const user = await usersModel.findOne({ where: { mail: mail } });
    if (user) {
      const password_valid = await bcrypt.compare(password, user.password);
      if (password_valid) {
        const jwtToken = generateAccessToken(user);
        res.status(200).json({ user, jwtToken });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  },

  register: async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    const nume = req.body.nume;
    const isProfesor = req.body.isProfesor;
    const idProfAsociat = req.body.idProfAsociat;
    const nrMaximStudenti = req.body.nrMaximStudenti;
    try {
      let user = usersModel.findOne({ where: { mail: mail } });
      if (user) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await usersModel.create({
          isProfesor,
          nume,
          mail,
          password: hashedPassword,
          id_profesor_asociat: idProfAsociat,
          nr_maxim_studenti: nrMaximStudenti,
        });
        const jwtToken = generateAccessToken(user);
        res.status(200).send({ user, jwtToken });
      } else {
        res.status(409).send({ message: "user deja existent" });
      }
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = controller;
