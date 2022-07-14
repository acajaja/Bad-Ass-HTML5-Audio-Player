const http    = require('http');
const express = require('express');
const port    = 8081;
const app     = express();
const minify  = require('express-minify');
const myErrorHandler = (errorInfo, callback) => {
    console.log(errorInfo);
    // below is the default implementation (minify.Minifier.defaultErrorHandler)
    if (errorInfo.stage === 'compile') {
      callback(errorInfo.error, JSON.stringify(errorInfo.error));
      return;
    }
    callback(errorInfo.error, errorInfo.body);
};
app.use(minify({
    cache: false,
    uglifyJsModule: null,
    errorHandler: myErrorHandler,
    jsMatch: false,
    cssMatch: false,
    jsonMatch: /json/,
    sassMatch: false,
    lessMatch: false,
    stylusMatch: false,
    coffeeScriptMatch: false
}));
app.use(express.static('public'));
app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204)
        .end();
    console.log('favicon requested');
});
const httpServer = http.createServer({}, app);

httpServer.listen(port);
console.info(`Running on 127.0.0.1:${port}`);
