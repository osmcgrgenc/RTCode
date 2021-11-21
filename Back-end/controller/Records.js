const express = require("express");
const router = express.Router();
const SuccessResponse = require("../model/response/SuccessResponse");
const records = require("../service/RecordService");
const bodyParser = require("body-parser");
const ErrorResponse = require("../model/response/ErrorResponse");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/api", async (req, res, next) => {
  const recordsService = await records.init();
  const params = req.body;
  
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
});

module.exports = router;
