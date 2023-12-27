module.exports = (sequelize, DataTypes) => {
  return sequelize.define("users", {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    isProfesor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 40],
      },
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
        isEmail: true,
        len: [3, 40],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 300],
      },
    },
    id_profesor_asociat: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    nr_maxim_studenti: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  });
};
