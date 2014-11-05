var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();


var routes = [
  { path: '/',
    title: 'Home',
    template: 'index.html' },
  { path: '/members', 
    title: 'Member Directory',
    template: 'members.html' }
];


for(var i=0, ii=routes.length; i<ii; i++) {
  (function() {
    var route = routes[i];
    
    router.get(route.path, function(req, res) {
      fs.readFile('app/views/' + route.template, function(err, buf) {
        viewContext.page.body = buf.toString();
        viewContext.page.title = route.title;
        viewContext.page.heading = '<span class="-unite-page-title">' + route.title + '</span>';
        res.render('nothing', viewContext);
      });
    });
  })();
}


var viewContext = {
  unite: {
    head: fs.readFileSync('app/views/_head.html').toString(),
    scripts: '<script src="/assets/common.js" type="text/javascript"></script>',
  },
  navigation: {
    searchBox: '' + 
      '<form accept-charset="UTF-8" action="/search" class="-unite-search-box" method="get">' +
        '<div style="margin:0;padding:0;display:inline">' +
          '<input name="utf8" type="hidden" value="&#x2713;" />' +
        '</div>' +
        '<input id="search" name="q" placeholder="search this site..." type="search" />' +
      '</form>',
    menuItems: [{
      menuItem: '<span class="menu-item-wrapper menu-item-current">Home</span>',
      text: 'Home',
      path: '/home',
      children: [],
      current: true
    }, {
      menuItem: '<span class="menu-item-wrapper menu-item-category">Category</span>',
      text: 'Category',
      children: [{
        menuItem: '<span class="menu-item-wrapper"><a href="/members">Members</a></span>',
        text: 'Members',
        path: '/members',
        children: [],
        current: false
      }],
      current: false
    }],
    currentCategory: [],
    currentUser: '' + 
      '<div class="-unite-current-user">' +
        '<span class="-unite-welcome-message">Welcome, <a href="/profiles/9">Timothy Paul</a>.</span> ' + 
        '<span class="-unite-link-to-settings"><a href="/settings">Settings</a></span> ' + 
        '<span class="-unite-link-to-signout"><a href="/users/sign_out">Sign out</a></span>' + 
      '</div>'
  },
  church: {
    name: 'Test Church',
    address: null,
    phone: null,
    email: 'test@example.com'
  },
  theme: { path: '/theme' },
  page: {
    type: 'page',
    breadcrumbs: [],
    alerts: '' + 
      '<div class="flash-container">' + 
        '<div class="alert alert-success" id="flash_success" style="display:none;"> <a class="close" data-dismiss="alert" href="#">&times;</a></div>' + 
        '<div class="alert alert-warning" id="flash_warning" style="display:none;"> <a class="close" data-dismiss="alert" href="#">&times;</a></div>' + 
        '<div class="alert alert-error" id="flash_error" style="display:none;"> <a class="close" data-dismiss="alert" href="#">&times;</a></div>' + 
      '</div>'
  }
};

module.exports = router;
