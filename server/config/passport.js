import { Strategy as LocalStrategy } from 'passport-local'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { Strategy as FacebookStrategy } from 'passport-facebook'
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
          let newUser = new User();

          newUser.local.name = req.body.name;
          newUser.local.email = req.body.email;
          newUser.local.password = req.body.password;

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
          let newUser = new User();

          newUser.google.id = profile.id;
          newUser.google.token = token;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value;

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

  // FACEBOOK AUTHENTICATION
  passport.use(new FacebookStrategy({
    clientID: authConfig.facebookAuth.clientID,
    clientSecret: authConfig.facebookAuth.clientSecret,
    callbackURL: authConfig.facebookAuth.callbackURL,
    profileURL: authConfig.facebookAuth.profileURL,
    profileFields: authConfig.facebookAuth.profileFields
  }, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({'facebook.id' : profile.id}, (err, user) => {
        if(err){
          return done(err);
        }
        if(user){
          return done(null, user);
        } else {
          let newUser = new User();

          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = profile.emails[0].value;

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
