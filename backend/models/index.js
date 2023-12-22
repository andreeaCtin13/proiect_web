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
  users.hasMany(requests, {
    foreignKey: { name: "studentId", allowNull: false },
    as: "studentRequests",
  });

  users.hasMany(requests, {
    foreignKey: { name: "teacherId", allowNull: false },
    as: "teacherRequests",
  });

  // requests.belongsTo(users, {
  //   foreignKey: { name: "studentId", allowNull: false },
  //   as: "studentRequests",
  // });

  // requests.belongsTo(users, {
  //   foreignKey: { name: "teacherId", allowNull: false },
  //   as: "teacherRequests",
  // });

  users.hasMany(sessions, {
    foreignKey: "id_prof_asociat",
    as: "sessions",
  });

  sessions.belongsTo(users, {
    foreignKey: { name: "id_prof_asociat", allowNull: false },
    as: "sessions",
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
