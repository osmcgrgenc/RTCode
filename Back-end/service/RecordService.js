const GenericRepository = require("../database/repository/GenericRepository");
const RecordModel = require("../database/model/Record");
const recordFindAggregate = (searchDTO) => {
  const { startDate, endDate, maxCount, minCount } = searchDTO;
  return [
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },
    {
      $unwind: "$counts",
    },
    {
      $group: {
        _id: "$key",
        createdAt: {
          $first: "$createdAt",
        },
        totalCount: {
          $sum: {
            $toInt: "$counts",
          },
        },
      },
    },
    {
      $match: {
        totalCount: {
          $lte: maxCount,
          $gte: minCount,
        },
      },
    },
    {
      $project: {
        _id: 0,
        key: "$_id",
        createdAt: 1,
        totalCount: 1,
      },
    },
  ];
};

var MongoClient = require("mongodb").MongoClient;
var url = process.env.MONGODB_URI;

module.exports = class DataService {
  static async init() {
    try {
      this.repository = await GenericRepository.init();
      return this;
    } catch (ex) {
      throw ex;
    }
  }

  static where(params) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function (err, db) {
        if (err) reject(err);
        var dbo = db.db("getir-case-study");
        let filter = {};
        if (startDate )
        dbo
          .collection("records")
          .find({})
          .toArray(function (err, result) {
            if (err) reject( err);
            console.log(result);
            db.close();
            resolve(result)
          });
      });
    });
    
  }
};
