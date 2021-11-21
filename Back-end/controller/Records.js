const SuccessResponse = require("../model/response/SuccessResponse");
const records = require("../service/RecordService");
const ErrorResponse = require("../model/response/ErrorResponse");

class Records {
  getDatas = async (req, res, next) => {
    /**
     * First check the request body for the error handling
     * Dates are checked by regex YYYY-MM-DD
     */
    const params = req.body;
    const { startDate, endDate, minCount, maxCount } = params;
    if (
      !(
        startDate &&
        startDate.match(
          /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
        )
      )
    ) {
      return res
        .status(401)
        .json(
          new ErrorResponse(
            401,
            "Error",
            "StartDate parameter is missing/wrong."
          )
        );
    }
    if (
      !(
        endDate &&
        endDate.match(
          /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
        )
      )
    ) {
      return res
        .status(402)
        .json(
          new ErrorResponse(402, "Error", "EndDate parameter is missing/wrong.")
        );
    }
    if (!(minCount && maxCount && minCount <= maxCount)) {
      return res
        .status(403)
        .json(
          new ErrorResponse(
            403,
            "Error",
            "minCount or maxCount parameter is missing/wrong."
          )
        );
    }
    records.init().then((recordsService) => {
      recordsService
        .where(params)
        .then((result) => {
          console.log(result);
          res.status(200).json(new SuccessResponse(0, "Success", result));
          next();
        })
        .catch((err) => {
          console.log(err);
          res.status(431).json(new ErrorResponse(431, "Error", err));
          next();
        });
    }).catch((err) => {
      console.log(err);
      res.status(430).json(new ErrorResponse(430, "Error", err));
      next();
    });
  };
}
module.exports = new Records();
