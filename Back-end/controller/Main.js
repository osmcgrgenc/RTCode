require('dotenv').config();
const http = require('http');
const express = require('express');
const server = express();
const records = require('./Records');
const bodyParser = require('body-parser');
const codeServer = http.createServer(server);
const users = require("./Users");
const api = require("./API");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));




server.get('/ping', (req, res) => {
    res.status(200).json("PONG");
});
server.post("/api", api);
server.use("/users", users);

codeServer.listen(process.env.PORT || 10000);
