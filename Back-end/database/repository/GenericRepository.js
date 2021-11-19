const db = require("../DatabaseConnection");
const mongoose = require("mongoose");

module.exports = class GenericRepository {
  static async init() {
    await db.getConnection();

    return this;
  }
  static find(model, params) {
    return new Promise((resolve, reject) => {
      model
        .find(params)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  static where(model, params) {
    return new Promise((resolve, reject) => {
      model.aggregate(params, function (err, result) {
        if (err) {
          return reject(err);
        }
        console.log(result);

        return resolve(result);
      });
    });
  }
};
