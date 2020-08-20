module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      min: 8,
    },
    role: {
      type: Sequelize.STRING,
      isIn: {
        args: [["user", "admin"]],
        msg: "Invalid User role",
      },
      defaultValue: "user",
    },
    courses: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
  });

  User.associate = function(models) {
    User.hasMany(models.courses);
  };

  return User;
};
