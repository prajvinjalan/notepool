'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    _User2.default.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // LOCAL SIGNUP
  passport.use('local-register', new _passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    process.nextTick(function () {
      _User2.default.findOne({ 'local.email': email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: 'That email is already taken.' });
        } else {
          var newUser = new _User2.default();

          newUser.local.name = req.body.name;
          newUser.local.email = req.body.email;
          newUser.local.password = req.body.password;

          _bcryptjs2.default.genSalt(10, function (err, salt) {
            if (err) {
              return done(err);
            }
            _bcryptjs2.default.hash(password, salt, function (err, hash) {
              if (err) {
                return done(err);
              }
              newUser.local.email = email;
              newUser.local.password = hash;
              newUser.save(function (err) {
                if (err) {
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
  passport.use('local-login', new _passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    process.nextTick(function () {
      _User2.default.findOne({ 'local.email': email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'That user was not found.' });
        }
        _bcryptjs2.default.compare(password, user.local.password, function (err, isMatch) {
          if (err) {
            return done(err);
          }
          if (!isMatch) {
            return done(null, false, { message: 'Your password is incorrect.' });
          }
          return done(null, user);
        });
      });
    });
  }));

  // GOOGLE AUTHENTICATION
  passport.use(new _passportGoogleOauth.OAuth2Strategy({
    clientID: _authConfig2.default.googleAuth.clientID,
    clientSecret: _authConfig2.default.googleAuth.clientSecret,
    callbackURL: _authConfig2.default.googleAuth.callbackURL
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      _User2.default.findOne({ 'google.id': profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          var newUser = new _User2.default();

          newUser.google.id = profile.id;
          newUser.google.token = token;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value;

          newUser.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  // FACEBOOK AUTHENTICATION
  passport.use(new _passportFacebook.Strategy({
    clientID: _authConfig2.default.facebookAuth.clientID,
    clientSecret: _authConfig2.default.facebookAuth.clientSecret,
    callbackURL: _authConfig2.default.facebookAuth.callbackURL,
    profileURL: _authConfig2.default.facebookAuth.profileURL,
    profileFields: _authConfig2.default.facebookAuth.profileFields
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      _User2.default.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          var newUser = new _User2.default();

          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = profile.emails[0].value;

          newUser.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));
};

var _passportLocal = require('passport-local');

var _passportGoogleOauth = require('passport-google-oauth');

var _passportFacebook = require('passport-facebook');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _authConfig = require('./authConfig');

var _authConfig2 = _interopRequireDefault(_authConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }