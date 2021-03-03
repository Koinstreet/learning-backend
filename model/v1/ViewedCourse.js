const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const viewedCourseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    viewedModules: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

viewedCourseSchema.statics.findOneOrCreate = function findOneOrCreate(
  condition,
  doc
) {
  const self = this;
  const newDocument = condition;
  return new Promise((resolve, reject) => {
    return self
      .findOne(condition)
      .then((result) => {
        if (result) {
          return resolve(result);
        }
        return self
          .create(newDocument)
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => {
            return reject(error);
          });
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const ViewedCourse = mongoose.model("ViewedCourse", viewedCourseSchema);

module.exports = ViewedCourse;
