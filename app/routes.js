var get = require('./lib/simple_router');

get('/',          {title: 'Home', template: 'index.html'});
get('/members',   {title: 'Member Directory', template: 'members.html'});
get('/calendar',  {title: 'Calendar', template: 'calendar.html'});
get('/an/event',  {title: '', template: 'an_event.html'});
get('/a/profile', {title: '', template: 'a_profile.html'});
get('/a/group',   {title: '', template: 'a_group.html'});

module.exports = get.router;
