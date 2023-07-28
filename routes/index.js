var express = require('express');
var router = express.Router();
const axios = require('axios');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: "jojo's page", myPage: "welcome to this amazing website!" });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: "jojo's page", myPage: "welcome to this amazing website!" });
});

router.get('/loading', function (req, res, next) {
  res.render('loading', { title: "Loading Dock", myPage: "welcome to this amazing website!" });
});

router.get('/checking', function (req, res, next) {
  res.render('checking', { title: "Checking Form", myPage: "welcome to this amazing website!" });
});

router.get('/task', function (req, res, next) {
  res.render('task', { title: "Task" });
});

router.post('/task', function (req, res, next) {
  console.log('here is my formdata', req.body);
  // res.render('task', { title: "Task" });
});

router.get('/tasks', async (req, res, next) => {
  const tasks = await axios.get('api');
  console.log('here are taks', tasks.data);
  if (tasks.data.success) {
    var response = tasks.data.data;
  } else {
    var response = [];
  };
  console.log(response);
  res.render('tasks', { title: "Tasks", tasks: response });
});

router.get('/tasks/:user', async (req, res, next) => {
  const tasks = await axios.get(`api?owner=${req.params.user}`);
  console.log('here are taks', tasks.data);
  if (tasks.data.success) {
    var response = tasks.data.data;
  } else {
    var response = [];
  };
  console.log(response);
  res.render('tasks', { title: "Tasks", tasks: response });
});

module.exports = router;
