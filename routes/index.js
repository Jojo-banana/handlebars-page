var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "jojo's page", myPage: "welcome to this amazing website!" });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: "jojo's page", myPage: "welcome to this amazing website!" });
});

router.get('/loading', function(req, res, next) {
  res.render('loading', { title: "Loading Dock", myPage: "welcome to this amazing website!" });
});

router.get('/checking', function(req, res, next) {
  res.render('checking', { title: "Checking Form", myPage: "welcome to this amazing website!" });
});

module.exports = router;
