const GenericRepository = require("../database/repository/GenericRepository");

/**
 * 
 * @param {*} params 
 * @returns 
 * Create a record find aggrate object
 */
const recordFindAggregate = (params) => {
  const { startDate, endDate, maxCount, minCount } = params;
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
    return new Promise((resolve, reject) => {
      try {
        GenericRepository.init().then(res => { this.repository = res;resolve(this)});
      } catch (ex) {
        throw ex;
      }
    });
  }

  static where(params) {
    return new Promise((resolve, reject) => {
      this.repository
        .where("records", recordFindAggregate(params))
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
};
