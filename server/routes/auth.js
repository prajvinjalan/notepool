const express = require('express');
const router = express.Router();
const passport = require('passport');

// Register route
router.post('/register', function(req, res, next){
  const validationResult = validateRegisterForm(req);
  if(!validationResult.success){
    return res.json({
      confirmation: 'fail',
      message: validationResult.errors
    });
  }
  return passport.authenticate('local-register', function(err, user, info){
    if(info){
      return res.json({
        confirmation: 'fail',
        message: info.message
      });
    }
    if(err){
      return res.json({
        confirmation: 'fail',
        message: 'Could not process the form.'
      });
    }

    return res.json({
      confirmation: 'success',
      message: 'You have successfully registered!',
      user: user
    });
  })(req, res, next);
});

// Login route
router.post('/login', function(req, res, next){
  const validationResult = validateLoginForm(req);
  if(!validationResult.success){
    return res.json({
      confirmation: 'fail',
      message: validationResult.errors
    });
  }
  return passport.authenticate('local-login', function(err, user, info){
    if(info){
      return res.json({
        confirmation: 'fail',
        message: info.message
      });
    }
    if(err){
      return res.json({
        confirmation: 'fail',
        message: 'Could not process the form.'
      });
    }

    return res.json({
      confirmation: 'success',
      message: 'You have successfully logged in!',
      user: user
    });
  })(req, res, next);
});

// Logout route
router.get('/logout', function(req, res, next){
  req.logout();
  return res.json({
    confirmation: 'success',
    message: 'You have successfully logged out!'
  });
});

// Validate user inputs for registering
function validateRegisterForm(req){
  let isFormValid = true;

  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('email', 'Email is required.').notEmpty();
  req.checkBody('email', 'Email is invalid.').isEmail();
  req.checkBody('password', 'Password is required.').notEmpty();

  let errors = req.validationErrors();

  if (!req.body || typeof req.body.name !== 'string'
      || typeof req.body.email !== 'string'
      || typeof req.body.password !== 'string'
      || errors){
    isFormValid = false;
  }
  return {
    success: isFormValid,
    errors: errors
  }
}

// Validate user inputs for logging in
function validateLoginForm(req){
  let isFormValid = true;

  req.checkBody('email', 'Email is required.').notEmpty();
  req.checkBody('password', 'Password is required.').notEmpty();

  let errors = req.validationErrors();

  if (!req.body || typeof req.body.email !== 'string'
      || typeof req.body.password !== 'string'
      || errors){
    isFormValid = false;
  }
  return {
    success: isFormValid,
    errors: errors
  }
}

module.exports = router;
