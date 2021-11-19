require("dotenv").config();
const chai = require("chai");
const express = require("express");
const http = require("http");
const server = express();
const testServer = http.createServer(server);
const RecordService = require("../service/RecordService");
describe("Express Tests", () => {
  let caseExample;
  beforeEach(() => {
    caseExample = {
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 2700,
      maxCount: 3000,
    };
  });
  it("Should get example datas", async function (done)  {
    RecordService.init().then((res)=>res.find(caseExample).then(done));
  });
});
