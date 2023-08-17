var express = require('express');
var router = express.Router();
const {PutItem} = require("../controllers/dynamo")
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

router.get('task/:id', async(req, res, next) => {
  
});

router.get('/tasks', async (req, res, next) => {
  const tasks = await axios.get('api');
  // console.log('here are taks', tasks.data);
  if (tasks.data.success) {
    var response = tasks.data.data;
  } else {
    var response = [];
  };
  console.log(response);
  res.render('tasks', { title: "Tasks", tasks: response });
});

router.get('/tasks/:user', async (req, res, next) => {
  const tasks = await axios.get(`api?Owner=${req.params.user}`);
  console.log('here are taks', tasks.data);
  if (tasks.data.success) {
    var response = tasks.data.data;
  } else {
    var response = [];
  };
  console.log(response);
  res.render('tasks', { title: "Tasks", tasks: response });
});

router.get('/updatetask/:id', async (req, res, next) =>{
  const task = await axios.get('/api/task/' + req.params.id);
  console.log('here is task', task)
  var data = task.data.data
  var info = JSON.parse(JSON.stringify(data))
  info.title = 'UpdateText'
  res.render('updatetask', info)
})



router.get('/beatsaver/:id', async(req, res, next)=>{
  var userInfo = await axios.get('/api/beatsaver/' + req.params.id);
  var playlistInfo = await axios.get('/api/beatsaver/playlist/' + req.params.id);
  userInfo = userInfo.data;
  userInfo.playlist = playlistInfo.data;
  console.log(userInfo)
  res.render('beatsaver', userInfo)
})

module.exports = router;
