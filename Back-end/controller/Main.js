require('dotenv').config();
const http = require('http');
const express = require('express');
const server = express();
const records = require('./Records');
const UtilClass = require('../util/Util');
const SuccessResponse = require("../model/response/SuccessResponse");
const ErrorResponse = require('../model/response/ErrorResponse');
const bodyParser = require('body-parser');
const codeServer = http.createServer(server);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(records);




server.get('/ping', (req, res) => {
    res.status(200).json(new SuccessResponse(200, "Pong", []));
});

codeServer.listen(5000);
