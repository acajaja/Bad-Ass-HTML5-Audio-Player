const http    = require('http');
const express = require('express');
const port    = 8081;
const app     = express();
app.use(express.static('public'));

const httpServer = http.createServer({}, app);

httpServer.listen(port);
console.info(`Running on 127.0.0.1:${port}`);
