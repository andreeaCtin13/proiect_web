const Sequelize = require("sequelize");
const connection = require("../config/db");
const mysql = require("mysql2/promise.js");
const env = require("dotenv");
const usersModel = require("./users");
const requestsModel = require("./requests");
const sessionsModel = require("./sessions");
env.config();

const users = usersModel(connection, Sequelize);
const requests = requestsModel(connection, Sequelize);
const sessions = sessionsModel(connection, Sequelize);
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
  // User model associations
  users.hasMany(requests, {
    foreignKey: "studentId",
    as: "studentRequests", // Alias for the student relationship
  });

  users.hasMany(requests, {
    foreignKey: "teacherId",
    as: "teacherRequests", // Alias for the teacher relationship
  });

  // Request model associations
  requests.belongsTo(users, {
    foreignKey: "studentId",
    as: "student", // Alias for the student relationship
  });

  requests.belongsTo(users, {
    foreignKey: "teacherId",
    as: "teacher", // Alias for the teacher relationship
  });
}

function DB_Init() {
  Create_DB();
  FK_Config();
}

module.exports = {
  users,
  requests,
  sessions,
  connection,
  DB_Init,
};
