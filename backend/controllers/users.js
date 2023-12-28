const usersModel = require("../models").users;
const requestsModel = require("../models").requests;
const connection = require("../models").connection;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const { LikeOp, EqOp } = require("./operators");

env.config();
const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "2h" });
};

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const controller = {
  login: async (req, res) => {
    console.log(req.body);
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
        return res.status(200).json({ user, jwtToken });
      } else {
        return res.status(409).json({ message: "user deja existent" });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(400).json({ message: "Invalid email" });
      }
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: "Email already used" });
      }
      return res.status(500).json({ message: "server error", err: err });
    }
  },

  updateUserById: async (req, res) => {
    let newUser = req.body;
    let id_user = req.params.id_user;

    await usersModel
      .findByPk(id_user)
      .then(async (user) => {
        if (!user) {
          return res
            .status(400)
            .send({ message: "nu ai introdus un id pentru profesor valid" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "server error", err: err });
      });

    await usersModel
      .update(newUser, {
        where: {
          idUser: id_user,
        },
        returning: true,
      })
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => {
        return res.status(500), send({ err: err });
      });
  },

  getUserByID: async (req, res) => {
    const id = req.params.id;
    const user = await usersModel.findByPk(id);
    if (!user)
      return res
        .status(400)
        .send({ message: "user not found, the id is not correct" });
    return res.status(200).send({ message: "user found", user: user });
  },

  getStudentsByRequestStatusWithFilterAndPagination: async (req, res) => {
    const { id_profesor } = req.params;
    const filter = req.query;
    if (!filter.take) filter.take = 10;

    if (!filter.skip) filter.skip = 1;

    let whereClause = {};
    let whereIncludeClause = {};
    if (filter.status) whereClause.status = { [EqOp]: filter.status };
    if (filter.nume) whereIncludeClause.nume = { [LikeOp]: `%${filter.nume}` };

    await requestsModel
      .findAndCountAll({
        include: [
          {
            model: usersModel,
            as: "studentRequests",
            where: whereIncludeClause,
          },
        ],
        where: { ...whereClause, teacherId: id_profesor },
        limit: parseInt(filter.take),
        offset: parseInt(filter.skip - 1) * parseInt(filter.take),
      })
      .then((rezultat) => {
        return res.status(200).send({ requests: rezultat });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: "server error", err: err });
      });
  },
  getAllTeachersWithFilterAndPagination: async (req, res) => {
    const filter = req.query;
    if (!filter.take) filter.take = 10;

    if (!filter.skip) filter.skip = 1;

    let whereClause = {};
    if (filter.nume) whereClause.nume = { [LikeOp]: `%${filter.nume}%` };

    await usersModel
      .findAndCountAll({
        where: { ...whereClause, isProfesor: true },
        limit: parseInt(filter.take),
        offset: parseInt(filter.skip - 1) * parseInt(filter.take),
      })
      .then((rezultat) => {
        return res.status(200).send({ requests: rezultat });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: "server error", err: err });
      });
  },
  getTechersRequestsStatusWithFilterAndPagination: async (req, res) => {
    const { id_student } = req.params;
    const filter = req.query;
    if (!filter.take) filter.take = 10;

    if (!filter.skip) filter.skip = 1;

    let whereClause = {};
    let whereIncludeClause = {};
    if (filter.status) whereClause.status = { [EqOp]: filter.status };
    if (filter.nume) whereIncludeClause.nume = { [LikeOp]: `%${filter.nume}` };

    await requestsModel
      .findAndCountAll({
        include: [
          {
            model: usersModel,
            as: "studentRequests",
            where: whereIncludeClause,
          },
        ],
        where: { ...whereClause, studentId: id_student },
        limit: parseInt(filter.take),
        offset: parseInt(filter.skip - 1) * parseInt(filter.take),
      })
      .then((rezultat) => {
        return res.status(200).send({ requests: rezultat });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: "server error", err: err });
      });
  },
};

module.exports = controller;
