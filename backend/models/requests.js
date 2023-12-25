module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "requests",
    {
      id_request: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date_semnatura_definitiva: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      tematica: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 60],
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "accepted", "loading", "rejected", "final"],
        defaultValue: "pending",
        allowNull: false,
      },
      pdf: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      feedback: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: "requests",
    }
  );
};
