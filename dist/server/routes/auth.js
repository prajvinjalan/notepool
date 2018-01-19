'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


// Register route
router.post('/register', function (req, res, next) {
  var validationResult = validateRegisterForm(req);
  if (!validationResult.success) {
    return res.json({
      confirmation: 'fail',
      message: validationResult.errors
    });
  }
  return _passport2.default.authenticate('local-register', function (err, user, info) {
    if (info) {
      return res.json({
        confirmation: 'fail',
        message: info.message
      });
    }
    if (err) {
      return res.json({
        confirmation: 'fail',
        message: 'Could not process the form.'
      });
    }

    return res.json({
      confirmation: 'success',
      message: 'You have successfully registered!',
      user: user.summary()
    });
  })(req, res, next);
});

// Login route
router.post('/login', function (req, res, next) {
  var validationResult = validateLoginForm(req);
  if (!validationResult.success) {
    return res.json({
      confirmation: 'fail',
      message: validationResult.errors
    });
  }
  return _passport2.default.authenticate('local-login', function (err, user, info) {
    if (info) {
      return res.json({
        confirmation: 'fail',
        message: info.message
      });
    }
    if (err) {
      return res.json({
        confirmation: 'fail',
        message: 'Could not process the form.'
      });
    }

    return res.json({
      confirmation: 'success',
      message: 'You have successfully logged in!',
      user: user.summary()
    });
  })(req, res, next);
});

// Change password route
router.post('/changepassword', function (req, res, next) {
  var passwords = req.body.passwords;
  _User2.default.findOne({ 'local.email': req.body.email }, function (err, user) {
    if (err) {
      return res.json({
        confirmation: 'fail',
        message: err
      });
    }
    if (!user) {
      return res.json({
        confirmation: 'fail',
        message: 'That user was not found.'
      });
    }

    //Match Password
    _bcryptjs2.default.compare(passwords.oldPass, user.local.password, function (err, isMatch) {
      if (err) {
        return res.json({
          confirmation: 'fail',
          message: err
        });
      }
      if (isMatch) {
        _bcryptjs2.default.genSalt(10, function (err, salt) {
          if (err) {
            return res.json({
              confirmation: 'fail',
              message: err
            });
          }
          _bcryptjs2.default.hash(passwords.newPass, salt, function (err, hash) {
            if (err) {
              return res.json({
                confirmation: 'fail',
                message: err
              });
            }
            var data = {
              $set: {
                'local.password': hash
              }
            };
            _User2.default.findByIdAndUpdate({ _id: req.body.id }, data, function (err) {
              if (err) {
                return res.json({
                  confirmation: 'fail',
                  message: err
                });
              } else {
                return res.json({
                  confirmation: 'success',
                  message: 'You have successfully updated your password!'
                });
              }
            });
          });
        });
      } else {
        return res.json({
          confirmation: 'fail',
          message: 'Your old password was incorrect.'
        });
      }
    });
  });
});

// Logout route
router.get('/logout', function (req, res, next) {
  req.logout();
  return res.json({
    confirmation: 'success',
    message: 'You have successfully logged out!'
  });
});

// Google routes
router.get('/google', _passport2.default.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', _passport2.default.authenticate('google', {
  successRedirect: '/auth_success',
  failureRedirect: '/login'
}));

// Facebook routes
router.get('/facebook', _passport2.default.authenticate('facebook', {
  display: 'popup',
  scope: ['public_profile', 'email']
}));

router.get('/facebook/callback', _passport2.default.authenticate('facebook', {
  successRedirect: '/auth_success',
  failureRedirect: '/login'
}));

// Get user route
router.get('/user', function (req, res, next) {
  return res.json({
    confirmation: 'success',
    message: 'You have successfully logged in!',
    user: req.user.summary()
  });
});

// Validate user inputs for registering
var validateRegisterForm = function validateRegisterForm(req) {
  var isFormValid = true;

  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('email', 'Email is required.').notEmpty();
  req.checkBody('email', 'Email is invalid.').isEmail();
  req.checkBody('password', 'Password is required.').notEmpty();

  var errors = req.validationErrors();

  if (!req.body || typeof req.body.name !== 'string' || typeof req.body.email !== 'string' || typeof req.body.password !== 'string' || errors) {
    isFormValid = false;
  }
  return {
    success: isFormValid,
    errors: errors
  };
};

// Validate user inputs for logging in
var validateLoginForm = function validateLoginForm(req) {
  var isFormValid = true;

  req.checkBody('email', 'Email is required.').notEmpty();
  req.checkBody('password', 'Password is required.').notEmpty();

  var errors = req.validationErrors();

  if (!req.body || typeof req.body.email !== 'string' || typeof req.body.password !== 'string' || errors) {
    isFormValid = false;
  }
  return {
    success: isFormValid,
    errors: errors
  };
};

exports.default = router;