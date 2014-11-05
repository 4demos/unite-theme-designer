var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', {layout: '../theme/default.theme'});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'unite'))); // assets supplied by Unite
app.use(express.static(path.join(__dirname, 'theme'))); // assets supplied by the theme

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
});


// Handlebars Helpers

hbs.registerHelper("debug", function(context) {
  return JSON.stringify(context);
});

hbs.registerHelper('html', function(options) {
  var classes = ['no-js'];
  if(this.page && this.page.type) {
    classes.push('-unite-' + this.page.type);
  }
  var css = classes.join(' ');
  return '<!DOCTYPE html>' +
         '<!--[if lt IE 7 ]> <html class="' + css + ' ie6" lang="en"> <![endif]-->' + 
         '<!--[if IE 7 ]>    <html class="' + css + ' ie7" lang="en"> <![endif]-->' + 
         '<!--[if IE 8 ]>    <html class="' + css + ' ie8" lang="en"> <![endif]-->' + 
         '<!--[if (gte IE 9)|!(IE)]><!--> <html class="' + css + '" lang="en"> <!--<![endif]-->' + 
         options.fn(this) +
         '</html>';
});

hbs.registerHelper('ifEql', function(v1, v2, options) {
  return (v1 == v2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('lines', function(context, options) {
  var ret = '';
  var lines = context ? context.split('\\n') : [];
  for(var i=0, ii=lines.length; i<ii; i++) {
    ret = ret + options.fn(lines[i]);
  }
  return ret;
});

hbs.registerHelper('linkToMap', function(address, options) {
  return '<a href="http://maps.google.com/maps?q=' + encodeURIComponent(address) + '">' + options.fn(this) + '</a>';
});

hbs.registerHelper('ifAny', function(list, options) {
  if(list && list.length > 0) {
    return options.fn(this);
  }
});

hbs.registerHelper('ifNone', function(list, options) {
  if(!list || list.length == 0) {
    return options.fn(this);
  }
});


module.exports = app;
