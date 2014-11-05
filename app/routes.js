var get = require('./lib/simple_router');

get('/',          {title: 'Home', template: 'index.html'});
get('/members',   {title: 'Member Directory', template: 'members.html'});

module.exports = get.router;
