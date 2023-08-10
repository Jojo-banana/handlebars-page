var express = require('express');
var router = express.Router();
const axios = require("axios");
// const { response } = require('../app');

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

router.get('/task', function(req, res, next) {
  res.render('task', { title: "task" });
});

router.get('/beatsaver', function(req, res, next) {
  res.render('beatsaver-stats', { title: "BeatSaver Stats", myPage: "welcome to this amazing website!" });
});

router.get('/tasks', async (req, res, next) => {
  const tasks = await axios.get("api")
  console.log("this is my", tasks.data)
  if (tasks.data.success) {
    var response = tasks.data.data
  } else {
    var response = []
  }
  res.render('tasks', { title: "tasks", tasks:response});
});

router.get('/tasks/status/:status', async (req, res, next) => {
  console.log("I am in status.")
  const tasks = await axios.get(`api?Status=${req.params.status}`)
  console.log("this is my", tasks.data)
  if (tasks.data.success) {
    var response = tasks.data.data
  } else {
    var response = []
  }
  res.render('tasks', { title: "tasks", tasks:response});
});

router.get('/tasks/:user', async (req, res, next) => {
  const tasks = await axios.get(`api?Owner=${req.params.user}`)
  console.log("this is my", tasks.data)
  if (tasks.data.success) {
    var response = tasks.data.data
  } else {
    var response = []
  }
  res.render('tasks', { title: "tasks", tasks:response});
});

module.exports = router;
