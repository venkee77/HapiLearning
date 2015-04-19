var Path = require('path');

exports.register = function (server, options, next) {
  var dir = process.cwd();

  function addViewManager(){
  }

  //console.log(server);
  server.expose('views',addViewManager);

  next();
};

exports.register.attributes = {
  name: 'Views', // Must be unique
  version: '1.0.0'
};
