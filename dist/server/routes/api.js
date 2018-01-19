'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// GET resource
router.get('/:resource', function (req, res, next) {

  var resource = req.params.resource;
  var query = req.query;
  var controller = _controllers2.default[resource];

  if (controller == null) {
    return res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
  }

  controller.find(query, false).then(function (result) {
    res.json({
      confirmation: 'success',
      result: result
    });
  }).catch(function (err) {
    res.json({
      confirmation: 'fail',
      message: err
    });
  });
});

// GET resource by id
router.get('/:resource/:id', function (req, res, next) {

  var resource = req.params.resource;
  var id = req.params.id;
  var controller = _controllers2.default[resource];

  if (controller == null) {
    return res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
  }

  controller.findById(id, false).then(function (result) {
    res.json({
      confirmation: 'success',
      result: result
    });
  }).catch(function (err) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource ID: ' + id + ', Resource: ' + resource
    });
  });
});

// POST resource
router.post('/:resource', function (req, res, next) {

  var resource = req.params.resource;
  var controller = _controllers2.default[resource];

  if (controller == null) {
    return res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
  }

  controller.create(req.body, false).then(function (result) {
    res.json({
      confirmation: 'success',
      result: result
    });
  }).catch(function (err) {
    res.json({
      confirmation: 'fail',
      message: err
    });
  });
});

// PUT resource
router.put('/:resource/:id', function (req, res, next) {

  var resource = req.params.resource;
  var id = req.params.id;
  var controller = _controllers2.default[resource];

  if (controller == null) {
    return res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
  }

  controller.update(id, req.body, false).then(function (result) {
    res.json({
      confirmation: 'success',
      result: result
    });
  }).catch(function (err) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource ID: ' + id + ', Resource: ' + resource
    });
  });
});

// DELETE resource by id
router.delete('/:resource/:id', function (req, res, next) {

  var resource = req.params.resource;
  var id = req.params.id;
  var controller = _controllers2.default[resource];

  if (controller == null) {
    return res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
  }

  controller.delete(id).then(function (result) {
    res.json({
      confirmation: 'success',
      result: result
    });
  }).catch(function (err) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource ID: ' + id + ', Resource: ' + resource
    });
  });
});

exports.default = router;