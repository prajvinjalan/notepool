const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function(passport){
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  // LOCAL SIGNUP
  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
    process.nextTick(function(){
      User.findOne({'local.email': email}, function(err, user){
        if(err){
          return done(err);
        }
        if(user){
          return done(null, false, {message: 'That email is already taken.'});
        } else {
          let newUser = new User({
            local: {
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
            }
          });
          console.log(newUser);
          bcrypt.genSalt(10, function(err, salt){
            if(err){
              return done(err);
            }
            bcrypt.hash(password, salt, function(err, hash){
              if(err){
                return done(err);
              }
              console.log(email, hash);
              newUser.local.email = email;
              newUser.local.password = hash;
              newUser.save(function(err){
                if(err){
                  return done(err);
                }
                return done(null, newUser);
              });
            });
          });
        }
      });
    });
  }));

  // GOOGLE AUTHENTICATION
}
