var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/extends/bedroom.html', function(req, res, next) {
  res.render('extends/bedroom', { title: 'Express' });
});

router.get('/extends/livingRoom.html', function(req, res, next) {
  res.render('extends/livingRoom', { title: 'Express' });
});

router.get('/extends/toilet.html', function(req, res, next) {
  res.render('extends/toilet', { title: 'Express' });
});

router.get('/extends/kitchen.html', function(req, res, next) {
  res.render('extends/kitchen', { title: 'Express' });
});

router.get('/extends/office.html', function(req, res, next) {
  res.render('extends/office', { title: 'Express' });
});

router.get('/extends/babyRoom.html', function(req, res, next) {
  res.render('extends/babyRoom', { title: 'Express' });
});




module.exports = router;
