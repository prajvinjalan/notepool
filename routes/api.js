const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/NoteController');

// GET resource
router.get('/:resource', function(req, res, next){

  let resource = req.params.resource;

  if (resource == 'note'){
    NoteController.find(req.query, function(err, results){
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
      })
    });
  }

});

module.exports = router;
