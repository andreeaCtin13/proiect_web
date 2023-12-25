const other = require("./other");
const users = require("./users");
const requests = require("./requests");
const sessions = require("./sessions");
const controllers = {
  users,
  requests,
  other,
  sessions,
};
module.exports = controllers;
