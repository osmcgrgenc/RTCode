var expect = require("chai").expect;
var request = require("request");
var app = require("../controller/Main");
describe("Single Endpoint API Test", () => {
  it("Ping Page", function (done) {
    request("http://localhost:5000/ping", function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done()
    });
  });
  it("Api works correctly", function (done) {
    request({
      uri:"http://localhost:5000/api", 
      method: "POST",
      json: {
          "startDate": "2016-01-26", "endDate": "2018-02-02", "minCount": 2700, "maxCount": 3000
      },
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  }, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done()
    });
  });
  it("Api works wrong", function (done) {
    request({
      uri:"http://localhost:5000/api", 
      method: "POST",
      json: {
          "startDate": "01-01-2026", "endDate": "2018-02-02", "minCount": 2700, "maxCount": 3000
      },
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  }, function (error, response, body) {
      expect(response.statusCode).to.equal(402);
      done()
    });
  });
});
