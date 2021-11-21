const db = require("../DatabaseConnection");

module.exports = class GenericRepository {
  static async init() {
    return new Promise((resolve, reject) => {
      db.getConnection().then(res => {
        this.db = res.db;
        this.dbo = res.dbo;
        resolve(this);
      }).catch(err=>reject(err))
    
    });
  }

  static where(model, params) {
    const dbo = this.dbo;
    const db = this.db;
    return new Promise((resolve, reject) => {
      dbo
        .collection(model)
        .aggregate(params)
        .toArray(function (err, result) {
          if (err) {
            reject(err);
            return;
          }
          db.close();
          resolve(result);
        });
    });
  }
};
