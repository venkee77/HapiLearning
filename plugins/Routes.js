exports.register = function (server, options, next) {
    var authenticate = function(request,reply){
      if(!request.auth.isAuthenticated){
        return reply.redirect('/');
      }else{
        return true;
      }
    };

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
                                                        if(request.auth.isAuthenticated){
                                                          reply.view('home');
                                                        }else{reply.redirect('/');}
                                                      },
                                              // auth:'session'
                                        }
      },
      { method: ['GET','POST'],  path: '/signin', config:{  handler: function(request,reply){
                                                        if(request.method === 'get'){
                                                          if(!request.auth.isAuthenticated){
                                                            return reply.redirect('/');
                                                          }
                                                        }
                                                        var postData = request.payload;

                                                        if(postData["username"] === postData["password"] && postData["username"] !== ""){
                                                          request.auth.session.set({username:postData["username"]});
                                                        }

                                                        reply.view('home',{username:postData["username"]});
                                                      }
                                                      ,
                                           plugins:{
                                             'hapi-auth-cookie':{
                                               redirectTo: false
                                             }
                                           }

                                         }
      }

    ]);
    next();
};

exports.register.attributes = {
  name: 'Routes', // Must be unique
  version: '1.0.0'
};
