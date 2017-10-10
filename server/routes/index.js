var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Notepool' });
});

router.get('/createnote', function(req, res, next) {
  res.render('createNote', { title: 'Notepool' });
});

module.exports = router;
