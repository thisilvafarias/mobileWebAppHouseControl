var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* livingRoom  */
router.get('/livingRoom', function(req, res) {
  res.render('livingRoom');
});


module.exports = router;
