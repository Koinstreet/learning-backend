module.exports = (sequelize, Sequelize) => {
  const Module = sequelize.define("modules", {
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    courseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "courses", key: "id" },
    },
    moduleId: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    content: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  });

  Module.associate = function(models) {
    Module.hasOne(models.users, { foreignKey: "authorId", as: "author" });
    Module.BelongsTo(models.courses, { foreignKey: "courseId" });
  };

  return Module;
};
