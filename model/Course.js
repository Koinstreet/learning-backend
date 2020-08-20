module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("courses", {
    image: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    highlight: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    overview: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    audience: {
      type: Sequelize.TEXT,
    },
    perequisites: {
      type: Sequelize.TEXT,
    },
    objectives: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  Course.associate = function(models) {
    Course.belongsTo(models.users, { foreignKey: "authorId", });
    Course.hasMany(models.modules);
  };

  return Course;
};
