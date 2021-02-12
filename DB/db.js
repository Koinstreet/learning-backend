const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_URL,

  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../model/User")(sequelize, Sequelize);
db.courses = require("../model/Course")(sequelize, Sequelize);
db.modules = require("../model/Module")(sequelize, Sequelize);
db.viewedcourses = require("../model/ViewedCourse")(sequelize, Sequelize);
db.subscribers = require("../model/Subscribers")(sequelize, Sequelize);

db.courses.belongsTo(db.users, { foreignKey: "authorId", as: "author" });
db.courses.hasMany(db.modules);

db.viewedcourses.hasOne(db.users, {
  foreignKey: "userId",
  as: "user",
  constraints: false,
});
db.viewedcourses.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
  constraints: false,
  onDelete: 'cascade',
  hooks: true
});
db.viewedcourses.hasMany(db.modules);

module.exports = db;



// const sequelize = new Sequelize(
//   process.env.DATABSE_LOCAL,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );