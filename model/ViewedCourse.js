module.exports = (sequelize, Sequelize) => {
  const ViewedCourse = sequelize.define("viewedcourses", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    courseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "courses", key: "id" },
    },
    viewedModules: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  });
  return ViewedCourse;
};
