'use strict';

var startTime = new Date(),
    express = require('express'),
    app = express(),
    path = require('path'),
    seshat = require('seshat').register('app'),
    https = require('https'),
    fs = require('fs'),
    sslOptions = {
        key: fs.readFileSync('./cert/private.pem'),
        cert: fs.readFileSync('./cert/public.pem')
    };

app.configure(function(){
    seshat.info('Setting up environment configurations...');
    app.set('port', process.env.PORT || 3000);
    app.set('sslPort', process.env.SSL_PORT || 3001);
    app.set('root', path.resolve(__dirname));

    seshat.info('Installing middleware');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    // log errors
    app.use(function logErrors(err, req, res, next) {
       seshat.error(err.stack);
       next(err);
    });

    // error handler
    app.use(function errorHandler(err, req, res, next) {
        res.send(500, {error: err.stack});
    });
});

// routes
app.get('/healthcheck', function(req, res) {
    res.send(200, 'ok');
});

app.get('/healthcheck/json', function(req, res) {
    res.json({ status: 'ok' });
});

// SSL server
https.createServer(sslOptions, app).listen(app.get('sslPort'), function(){
    seshat.info('Starting https server on port', app.get('sslPort'), seshat.colors.green);
    seshat.info('HTTPS Server startup in ' + Math.ceil((new Date() - startTime)/1000) + ' seconds');
});


// Non-ssl server
app.listen(app.get('port'), function() {
    seshat.info('Starting http server on port', app.get('port'));
    seshat.info('HTTP Server startup in ' + Math.ceil((new Date() - startTime)/1000) + ' seconds');
});
