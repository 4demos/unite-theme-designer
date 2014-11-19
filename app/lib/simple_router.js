var express = require('express');
var fs = require('fs');
var router = express.Router();
var viewContext = require('./layout_helper');
var YAML = require('yamljs');
var inflection = require('inflection');

function renderDesignerTools(params) {
  var html = '<div style="position:fixed; background:rgba(0,0,0,0.8); bottom:0; left:0; width:100%; height:40px; line-height:40px; padding:4px 12px; z-index:9999;">';
  html += '<label style="color:white; margin:0; padding:0; line-height:inherit; display:inline;">Theme: <select style="margin: 0;" onchange="document.cookie = \'theme=\' + $(window.event.target).val(); window.location.reload();">';
  for(var i=0, ii=params.themes.length; i<ii; i++) {
    html += '<option'
    if(params.themes[i] == params.selectedTheme) html += ' selected';
    html += '>' + params.themes[i] + '</option>';
  }
  html += '</select></label>&nbsp;&nbsp;&nbsp;<label style="color:white; margin:0; padding:0; line-height:inherit; display:inline;">Preset: <select style="margin: 0;" onchange="document.cookie = \'preset=\' + $(window.event.target).val(); window.location.reload();">';
  for(var i=0, ii=params.presets.length; i<ii; i++) {
    html += '<option'
    if(params.presets[i] == params.selectedPreset) html += ' selected';
    html += '>' + params.presets[i] + '</option>';
  }
  html += '</select></label>';
  html += '</div>';
  return html;
}

function withListOfThemes(callback) {
  fs.readdir('themes', function(err, files) {
    var dirs = [];
    files.forEach(function(file) {
      if(file[0] != '.') {
        fs.stat('themes/' + file, function(err, stat) {
          if(stat.isDirectory()) {
            dirs.push(file);
          }
        });
      }
    });
    callback(dirs);
  });
}

var get = function(path, options) {
  if(!options.template) throw "You must pass 'template' to get";
  
  router.get(path, function(req, res) {
    console.log(req.cookies);
    var theme = req.cookies.theme || 'blank';
    var preset = req.cookies.preset;
    var themeOptions = {path: '/themes/' + theme};
    var presets = [];
    var presetOptions;
    
    withListOfThemes(function(themes) {
      fs.readFile('app/views/' + options.template, function(err, template) {
        fs.readFile('themes/' + theme + '/theme.description', function(err, description) {
          if(description) {
            description = YAML.parse(description.toString());
            for(var name in description.presets) { presets.push(name); }
            presetOptions = description.presets[preset];
            if(!presetOptions && presets.length > 0) {
              preset = presets[0];
              presetOptions = description.presets[preset];
            }
            if(presetOptions) {
              for(var key in presetOptions) {
                themeOptions[inflection.camelize(key.replace(' ', '_'), true)] = presetOptions[key];
              }
            }
          }
          
          viewContext.theme = themeOptions;
          
          viewContext.page.body = template.toString() + renderDesignerTools({
            themes: themes,
            presets: presets,
            selectedTheme: theme,
            selectedPreset: preset
          });
          viewContext.page.title = options.title;
          viewContext.page.heading = '<span class="-unite-page-title">' + options.title + '</span>';
          
          viewContext.layout = '../../themes/' + theme + '/default.theme';
          
          res.render('nothing', viewContext);
        });
      });
    });
  });
};

get.router = router;

module.exports = get;
