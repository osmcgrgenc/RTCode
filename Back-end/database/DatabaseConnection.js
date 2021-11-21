var MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI;
module.exports = class DatabaseConnection {
  db=null
  dbo=null
  static getConnection() {
    return new Promise((resolve, reject) => {
      try {
        /**
         * Mongo DB connection
         */
        MongoClient.connect(url,  (err, db)=> {
          if (err) {
            reject(err);
            return;
          }
          this.db = db;
          /**
           * Connect the getir-case-study database
           */
          var dbo = db.db("getir-case-study");
          this.dbo = dbo;
          resolve({ db: this.db, dbo: dbo });
        });
      } catch (ex) {
        reject(ex);
      }
    });
  }
  static disConnection() {
    this.db.close();
  }
};
