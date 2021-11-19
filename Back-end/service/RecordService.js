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
      try {
        this.repository
          .where(RecordModel, recordFindAggregate(params))
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      } catch (ex) {
        throw ex;
      }
    });
  }
};
