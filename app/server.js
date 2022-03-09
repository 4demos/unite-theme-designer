var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs')
var log4js = require("log4js");
log4js.configure({
  appenders: { cheese: { type: "file", filename: path.join(__dirname, 'log4js.log') } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});
var routes = require('./routes');
require('./lib/handlebars_helpers');

var app = express();
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'morgan-access.log'), { flags: 'a' })
var logger = log4js.getLogger("cheese");
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");
logger.level = "debug";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets'))); // assets supplied by Unite
app.use('/themes', express.static(path.join(__dirname, '../themes'))); // assets supplied by the theme

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        logger.error({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
    logger.error({
        message: err.message,
        error: err
    });
});

// Server

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
  logger.info('Express server listening on port ' + server.address().port);
});
