const mongoose = require("mongoose");

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      mongoose
        .connect(process.env.DATABSE_TEST, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    } else if (process.env.NODE_ENV === "development") {

      mongoose
        .connect(process.env.DATABASE_LOCAL, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          // console.log(res.connection.db.getCollectionNames())
          module.exports.db = res.connection.db;
          res.connection.db.listCollections().toArray(function (err, names) {
            module.exports.Collection = names;
        });
          if (err) return reject(err);
          resolve();
        });
    } else {
      mongoose
        .connect(process.env.DATABASE_LOCAL, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });
};

const close = () => {
  // return mongoose.connection.close()
  return mongoose.disconnect();
};


module.exports = { connect, close };
