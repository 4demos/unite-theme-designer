var express = require('express');
var fs = require('fs');
var router = express.Router();
var viewContext = require('./layout_helper');

var get = function(path, options) {
  if(!options.title) throw "You must pass 'title' to get";
  if(!options.template) throw "You must pass 'template' to get";
  
  router.get(path, function(req, res) {
    fs.readFile('app/views/' + options.template, function(err, buf) {
      viewContext.page.body = buf.toString();
      viewContext.page.title = options.title;
      viewContext.page.heading = '<span class="-unite-page-title">' + options.title + '</span>';
      res.render('nothing', viewContext);
    });
  });
};

get.router = router;

module.exports = get;
