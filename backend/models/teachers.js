module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "teachers",
    {
      id_teacher: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          len: [2, 60],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 350],
        },
      },
    },
    {
      tableName: "teachers",
    }
  );
};
