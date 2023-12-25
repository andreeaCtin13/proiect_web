module.exports = (sequelize, DataTypes) => {
  return sequelize.define("sessions", {
    idSession: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    data_inceput: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_final: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [3, 40],
      },
    },
  });
};
