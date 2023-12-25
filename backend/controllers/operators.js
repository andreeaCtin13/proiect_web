const sequelize = require("sequelize");

const LikeOp = sequelize.Op.like;
const BetweenOp = sequelize.Op.between;
const MatchOp = sequelize.Op.match;
const IsOp = sequelize.Op.is;
const RegexOp = sequelize.Op.regexp;
const OrOp = sequelize.Op.or;
const EqOp = sequelize.Op.eq;

module.exports = {
  LikeOp,
  BetweenOp,
  MatchOp,
  IsOp,
  RegexOp,
  OrOp,
  EqOp,
};
