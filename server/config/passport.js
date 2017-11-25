import { Strategy as LocalStrategy } from 'passport-local'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import bcrypt from 'bcryptjs'

import User from '../models/User'
import authConfig from './authConfig'

export default function(passport) {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
          done(err, user);
      });
  });

  // LOCAL SIGNUP
  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({'local.email': email}, (err, user) =>{
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
          bcrypt.genSalt(10, (err, salt) => {
            if(err){
              return done(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
              if(err){
                return done(err);
              }
              newUser.local.email = email;
              newUser.local.password = hash;
              newUser.save((err) => {
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

  // LOCAL LOGIN
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({'local.email' : email}, (err, user) => {
        if(err){
          return done(err);
        }
        if(!user){
          return done(null, false, {message: 'That user was not found.'})
        }
        bcrypt.compare(password, user.local.password, (err, isMatch) => {
          if(err){
            return done(err);
          }
          if(!isMatch){
            return done(null, false, {message: 'Your password is incorrect.'});
          }
          return done(null, user);
        });
      });
    });
  }));

  // GOOGLE AUTHENTICATION
  passport.use(new GoogleStrategy({
    clientID: authConfig.googleAuth.clientID,
    clientSecret: authConfig.googleAuth.clientSecret,
    callbackURL: authConfig.googleAuth.callbackURL
  }, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({'google.id' : profile.id}, (err, user) => {
        if(err){
          return done(err);
        }
        if(user){
          return done(null, user);
        } else {
          let newUser = new User({
            google: {
              id: profile.id,
              token: token,
              email: profile.emails[0].value,
              name: profile.displayName
            }
          });
          newUser.save((err) => {
            if(err){
              return done(err);
            }
            return done(null, newUser);
          })
        }
      });
    });
  }));
}
