const mongoose = require("mongoose");

module.exports = class DatabaseConnection {
  static async getConnection() {
    try {
      if (!mongoose.connection.readyState) {
        await mongoose
          .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(
            () => {
              console.log("Connected to mongodb database..");
            },
            (err) => {
              console.error("Error while connecting to mongodb database..", err);
            }
          );
      }
    } catch (ex) {
      throw ex;
    }
  }
};
