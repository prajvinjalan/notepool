import express from 'express'
import passport from 'passport'
const router = express.Router();
import bcrypt from 'bcryptjs'

import User from '../models/User'

// Register route
router.post('/register', (req, res, next) => {
  const validationResult = validateRegisterForm(req);
  if(!validationResult.success){
    return res.json({
      confirmation: 'fail',
      message: validationResult.errors
    });
  }
  return passport.authenticate('local-register', (err, user, info) => {
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
      user: user.summary()
    });
  })(req, res, next);
});

// Login route
router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req);
  if(!validationResult.success){
    return res.json({
      confirmation: 'fail',
      message: validationResult.errors
    });
  }
  return passport.authenticate('local-login', (err, user, info) => {
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
      user: user.summary()
    });
  })(req, res, next);
});

// Change password route
router.post('/changepassword', (req, res, next) => {
  let passwords = req.body.passwords;
  User.findOne({'local.email': req.body.email}, (err, user) => {
    if (err){
      return res.json({
        confirmation: 'fail',
        message: err
      });
    }
    if (!user){
      return res.json({
        confirmation: 'fail',
        message: 'That user was not found.'
      });
    }

    //Match Password
    bcrypt.compare(passwords.oldPass, user.local.password, (err, isMatch) => {
      if (err){
        return res.json({
          confirmation: 'fail',
          message: err
        });
      }
      if (isMatch){
        bcrypt.genSalt(10, (err, salt) => {
          if (err){
            return res.json({
              confirmation: 'fail',
              message: err
            });
          }
          bcrypt.hash(passwords.newPass, salt, (err, hash) => {
            if (err){
              return res.json({
                confirmation: 'fail',
                message: err
              });
            }
            let data = {
              $set: {
                'local.password': hash
              }
            }
            User.findByIdAndUpdate({_id: req.body.id}, data, (err) => {
              if (err){
                return res.json({
                  confirmation: 'fail',
                  message: err
                });
              } else {
                return res.json({
                  confirmation: 'success',
                  message: 'You have successfully updated your password!'
                })
              }
            });
          })
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
router.get('/logout', (req, res, next) => {
  req.logout();
  return res.json({
    confirmation: 'success',
    message: 'You have successfully logged out!'
  });
});

// Google routes
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth_success',
    failureRedirect: '/login'
  })
);

// Facebook routes
router.get('/facebook',
  passport.authenticate('facebook', {
    display: 'popup',
    scope: ['public_profile', 'email']
  })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/auth_success',
    failureRedirect: '/login'
  })
);

// Get user route
router.get('/user', (req, res, next) => {
  return res.json({
    confirmation: 'success',
    message: 'You have successfully logged in!',
    user: req.user.summary()
  });
});

// Validate user inputs for registering
const validateRegisterForm = (req) => {
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
const validateLoginForm = (req) => {
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

export default router
