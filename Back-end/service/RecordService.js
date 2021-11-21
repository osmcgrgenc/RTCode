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
  static init() {
    // try {
    //   this.repository = await GenericRepository.init();
    return this;
    // } catch (ex) {
    //   throw ex;
    // }
  }

  static where(params) {
    const { startDate, endDate, minCount, maxCount } = params;
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function (err, db) {
        if (err) {
          reject(err);
          return;
        }
        var dbo = db.db("getir-case-study");
        
        if (
          startDate &&
          startDate.match(
            /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
          )
        ) {
        } else {
          reject("StartDate parameter is missing/wrong.");
        }
        if (
          endDate &&
          endDate.match(
            /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
          )
        ) {
        } else {
          reject("StartDate parameter is missing/wrong.");
        }
        if (minCount && maxCount && minCount <= maxCount) {
          
        } else {
          reject("minCount or maxCount parameter is missing/wrong.");
        }
        dbo
          .collection("records")
          .aggregate(recordFindAggregate(params))
          .toArray(function (err, result) {
            if (err) {
              reject(err);
              return;
            }
            console.log(result);
            db.close();
            resolve(result);
          });
      });
    });
  }
};
