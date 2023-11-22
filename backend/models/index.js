const Sequelize = require("sequelize");
const connection = require("../config/db");
const mysql = require("mysql2/promise.js");
const env = require("dotenv");
const studentsModel = require("./students");
const teachersModel = require("./teachers");
const requestsModel = require("./requests");

env.config();

const students = studentsModel(connection, Sequelize);
const teachers = teachersModel(connection, Sequelize);
const requests = requestsModel(connection, Sequelize);

function Create_DB() {
  let conn;

  mysql
    .createConnection({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    })
    .then((connection) => {
      conn = connection;
      return connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`
      );
    })
    .then(() => {
      return conn.end();
    })
    .catch((err) => {
      console.warn(err.stack);
    });
}

function FK_Config() {
  teachers.belongsToMany(students, {
    through: "requests",
    as: "request-students",
    foreignKey: "id_student",
  });
  students.belongsToMany(teachers, {
    through: "requests",
    as: "request-teachers",
    foreignKey: "id_teacher",
  });

  teachers.hasMany(students, { as: "students", foreignKey: "id_student" });
  students.belongsTo(teachers, { foreignKey: "id_teacher" });
}

function DB_Init() {
  Create_DB();
  FK_Config();
}

module.exports = {
  students,
  teachers,
  connection,
  DB_Init,
};
