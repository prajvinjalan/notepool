const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// GET resource
router.get('/:resource', function(req, res, next){

  let resource = req.params.resource;
  let query = req.query;
  let controller = controllers[resource];

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
  }

  controller.find(query, function(err, results){
    if(err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return;
    }
    res.json({
      confirmation: 'success',
      results: results
    });
  });
});

// GET resource by id
router.get('/:resource/:id', function(req, res, next){

  let resource = req.params.resource;
  let id = req.params.id
  let controller = controllers[resource];

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
  }

  controller.findById(id, function(err, result){
    if(err){
      res.json({
        confirmation: 'fail',
        message: 'Invalid Resource ID: ' + id + ', Resource: ' + resource
      });
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
    });
  })
});

// POST resource
router.post('/:resource', function(req, res, next){

  let resource = req.params.resource;
  let controller = controllers[resource];

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
  }

  controller.create(req.body, function(err, result){
    if(err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
    });
  });
});

// PUT resource
router.put(':/resource/:id', function(req, res, next){

  let resource = req.params.resource;
  let id = req.params.id;
  let controller = controllers[resource];

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
  }

  controller.update(id, req.body, function(err, result){
    if(err){
      res.json({
        confirmation: 'fail',
        message: 'Invalid Resource ID: ' + id + ', Resource: ' + resource
      });
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
    });
  });
});

module.exports = router;
