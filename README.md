# SingleEndpointAPI

A table's rows are gotten by Node Js Post methods and they are filtered by some request parameters. There is a MongoDB database and a 'record' table.

## How to Setup

1. create .env file from .env.example
2. npm install
3. npm run test
4. npm run start

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
