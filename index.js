var Hapi = require("hapi");
var server = new Hapi.Server();
var Path = require("path");
var boom = require('boom');

server.connection({port:3000});

server.register(
    [
      {
        register:require('hapi-auth-cookie')
      },
      {
        register: require('./plugins/Routes')
      }
/*      ,
      {
        register: require('./plugins/Views')
      }*/
    ],function(err){
      if(!err){
        server.auth.strategy('session','cookie',{
          password: "none",
          cookie: "hapi-samples",
          redirectTo: "/index",
          isSecure: false
        });
      }
    }
);

server.views({
    engines:{
      html:require('handlebars')
    },
    path: Path.join(__dirname,'views'),
    layoutPath: Path.join(__dirname,'views/layout'),
    layout: true,
    partialsPath: Path.join(__dirname,'views/partials')
});


//server["views"].addViewManager();

server.start();
