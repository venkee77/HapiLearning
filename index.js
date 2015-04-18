var Hapi = require("hapi");
var server = new Hapi.Server();
var Path = require('path');

server.connection({port:3000});

server.register(require('hapi-auth-cookie'),function(err){
  server.auth.strategy('session','cookie',{
    password: "none",
    cookie: "hapi-samples",
    redirectTo: "/index",
    isSecure: false
  });
});

server.views({
    engines:{
      html:require('handlebars')
    },
    path: Path.join(__dirname,'views'),
    layoutPath: Path.join(__dirname,'views/layout'),
    layout: true,
    partialsPath: Path.join(__dirname,'views/partials')
});

server.route([
  { method: 'GET',  path: '/', config:{  handler: function(request,reply){
                                                    reply.view('index');
                                                  },
                                       plugins:{
                                         'hapi-auth-cookie':{
                                           redirectTo: false
                                         }
                                       }
                                     }
  },
  { method: 'GET',  path: '/home',config:{  handler: function(request,reply){
                                                    console.log('home');
                                                    reply.view('home');
                                                  },
                                           auth:'session'
                                    }
  },
  { method: 'POST',  path: '/signin', config:{  handler: function(request,reply){
                                                    var postData = request.payload;

                                                    if(postData["username"] === postData["password"] && postData["username"] !== ""){
                                                      request.auth.session.set({username:postData["username"]});
                                                      console.log(request.auth.credentials);
                                                    }

                                                    reply.view('home',{username:postData["username"]});
                                                  },
                                       plugins:{
                                         'hapi-auth-cookie':{
                                           redirectTo: false
                                         }
                                       }
                                     }
  }

  ]);

server.start();
