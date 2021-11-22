# SingleEndpointAPI

A table's rows are gotten by Node Js Post methods and they are filtered by some request parameters. There is a MongoDB database and a 'record' table.

## How to Setup

1. create .env file from .env.example
2. Install dependencies
```bash 
npm install
```
3. Check that the functions works successfully
```bash
npm run test
```
4. Run the project
```bash
npm run start
```

## Heroku

[Go to the project](https://singleendpointapi.herokuapp.com/)

## Npm libraries

- # mongodb
  Mongo DB ile kolay bağlantı kurabilmek için gerekli kütüphane. Veritabanı linkini verdikten sonra kolaylıkla bağlantı sağlar.
- # mocha
  Test kodlarını yazıp uygulamak için kullanılan kütüphane
- # express
  Node ile server yaparken pathleri ayarladım.
- # dotenv
  Environmentları okumak için kullandığım kütüphane.

## Project's Paths
### Get filtered records 
**Path** : /api
**Method** : POST
**Request Body** :

```json
{
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "minCount": number,
  "maxCount": number
}
```
**Response**
```json
{
    "code":0,
    "msg" : "Success",
    "records":[] 
}
```

### Ping
**Path** : /ping
**Method** : GET
**Response**
```json
{
    "code":0,
    "msg" : "Success",
    "records":[] 
}
```
# Error Handling
- 401 **Start Date Error**
```js
new ErrorResponse(
            401,
            "Error",
            "StartDate parameter is missing/wrong."
          )
```
- 402 **End Date Error**
```js
new ErrorResponse(
            402,
            "Error",
            "EndDate parameter is missing/wrong."
          )
```
- 403 **Count Parameters Error**
```js
new ErrorResponse(
            403,
            "Error",
            "minCount or maxCount parameter is missing/wrong."
          )
```

# Why did I use this struct?

I created Sazik.Dev. This is collabration online code editor. I want to use this project with collages. We can develope Node projects as online. And we can test here. I changed this project's struct for the case. In normally, it has front-end folder. But In the case, it wasnt necessary. And I used ObjectionJs for PostgreSql or Sqlite. But In the case, MongoDb was required. So I fixed some folders and libraries for the case. 
You can check the [Sazik.Dev](https://sazik.dev).
And **this case struct**:
```markdown
#

* [Back-end/](./Back-end)
  * [controller/](./Back-end/controller)
    * [Main.js](./Back-end/controller/Main.js)
    * [Records.js](./Back-end/controller/Records.js)
  * [database/](./Back-end/database)
    * [model/](./Back-end/database/model)
      * [Record.js](./Back-end/database/model/Record.js)
    * [repository/](./Back-end/database/repository)
      * [GenericRepository.js](./Back-end/database/repository/GenericRepository.js)
    * [DatabaseConnection.js](./Back-end/database/DatabaseConnection.js)
  * [model/](./Back-end/model)
    * [response/](./Back-end/model/response)
      * [ErrorResponse.js](./Back-end/model/response/ErrorResponse.js)
      * [SuccessResponse.js](./Back-end/model/response/SuccessResponse.js)
  * [service/](./Back-end/service)
    * [RecordService.js](./Back-end/service/RecordService.js)
  * [test/](./Back-end/test)
    * [ExpressTest.js](./Back-end/test/ExpressTest.js)
    * [MongooseTest.js](./Back-end/test/MongooseTest.js)
  * [util/](./Back-end/util)
    * [AsyncMiddleware.js](./Back-end/util/AsyncMiddleware.js)
    * [Util.js](./Back-end/util/Util.js)
* [.env.example](./.env.example)
* [.gitignore](./.gitignore)
* [README.md](./README.md)
* [package.json](./package.json)

``` 