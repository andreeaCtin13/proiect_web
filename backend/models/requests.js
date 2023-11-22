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
      date_of_signature: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          len: [2, 60],
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["sent", "accepted", "rejected", "final"],
        defaultValue: "sent",
        allowNull: false,
      },
      pdf: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      feedback: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "requests",
    }
  );
};
