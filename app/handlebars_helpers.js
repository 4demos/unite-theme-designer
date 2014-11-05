var hbs = require('hbs');

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
