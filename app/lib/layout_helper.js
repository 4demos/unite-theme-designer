var fs = require('fs');

module.exports = {
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
      menuItem: '<span class="menu-item-wrapper"><a href="/members">Members</a></span>',
      text: 'Members',
      path: '/members',
      children: [],
      current: false
    }, {
      menuItem: '<span class="menu-item-wrapper"><a href="/calendar">Calendar</a></span>',
      text: 'Members',
      path: '/members',
      children: [],
      current: false
    }, {
      menuItem: '<span class="menu-item-wrapper menu-item-category">Examples</span>',
      text: 'Examples',
      children: [{
        menuItem: '<span class="menu-item-wrapper"><a href="/an/event">An Event</a></span>',
        text: 'An Event',
        path: '/an/event',
        children: [],
        current: false
      }, {
        menuItem: '<span class="menu-item-wrapper"><a href="/a/profile">A Profile</a></span>',
        text: 'A Profile',
        path: '/a/profile',
        children: [],
        current: false
      }, {
        menuItem: '<span class="menu-item-wrapper"><a href="/a/group">A Group</a></span>',
        text: 'A Group',
        path: '/a/group',
        children: [],
        current: false
      }],
      current: false
    }],
    currentCategory: [],
    currentUser: '' + 
      '<div class="-unite-current-user">' +
        '<span class="-unite-welcome-message">Welcome, <a href="/a/profile">Timothy Paul</a>.</span> ' + 
        '<span class="-unite-link-to-settings"><a href="#">Settings</a></span> ' + 
        '<span class="-unite-link-to-signout"><a href="#">Sign out</a></span>' + 
      '</div>'
  },
  church: {
    name: 'Test Church',
    address: null,
    phone: null,
    email: 'test@example.com'
  },
  page: {
    type: 'page',
    breadcrumbs: [],
    alerts: '' + 
      '<div class="flash-container">' + 
        '<div class="alert alert-success" id="flash_success">A successful message <a class="close" data-dismiss="alert" href="#">&times;</a></div>' + 
        '<div class="alert alert-warning" id="flash_warning">A warning message <a class="close" data-dismiss="alert" href="#">&times;</a></div>' + 
        '<div class="alert alert-error" id="flash_error">An error message <a class="close" data-dismiss="alert" href="#">&times;</a></div>' + 
      '</div>'
  }
};
