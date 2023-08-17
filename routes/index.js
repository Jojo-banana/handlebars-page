var express = require('express');
var router = express.Router();
const { PutItem } = require("../controllers/dynamo")
const axios = require('axios');
const { register, authenticate } = require('../controllers/account');
const passport = require('passport')
const auth = require('../bin/authcheck')
/* GET home page. */
router.get('/', function (req, res, next) {
  var user = auth.userdata()
  console.log('this is my user:', user)
  res.render('index', { title: "jojo's page", myPage: "welcome to this amazing website!", isAuthenticated: user.auth });
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

router.get('/task', auth.isauthenticated, function (req, res, next) {
  res.render('task', { title: "Task" });
});

router.get('task/:id', auth.isauthenticated, async (req, res, next) => {

});

router.get('/tasks', auth.isauthenticated, async (req, res, next) => {
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

router.get('/tasks/:user', auth.isauthenticated, async (req, res, next) => {
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

router.get('/updatetask/:id', auth.isauthenticated, async (req, res, next) => {
  const task = await axios.get('/api/task/' + req.params.id);
  console.log('here is task', task)
  var data = task.data.data
  var info = JSON.parse(JSON.stringify(data))
  info.title = 'UpdateText'
  res.render('updatetask', info)
})

router.get('/beatsaver', async (req, res, next) => {
  res.redirect("/beatsaver/4284241")
})

router.get('/beatsaver/:id', async (req, res, next) => {
  var userInfo = await axios.get('/api/beatsaver/' + req.params.id);
  var playlistInfo = await axios.get('/api/beatsaver/playlist/' + req.params.id);
  userInfo = userInfo.data;
  userInfo.playlist = playlistInfo.data;
  console.log(userInfo)
  res.render('beatsaver', userInfo)
})

router.get('/login', async (req, res, next) => {
  res.render('login')
})

router.post('/login', async (req, res, next) => {
  console.log(req.body)
  passport.authenticate('local', (error, user, info) => {
    if (!user) { console.log(JSON.stringify(info, null, 2)); res.redirect('/login'); }
    else {
      req.login(user, (error) => {
        if (error) { console.log('here is my login error', error); return res.redirect('/login'); }
        else {
          console.log('i am logged in');
          req.session.save((err) => {
            if (err) console.log('session saving error', err);
            else {
              console.log('session should be saved');
              console.log('redirecting');
              res.redirect(req.session.returnTo || '/');
              delete req.session.returnTo
            }
          });
        }
      });
    }
  })(req, res);
});

router.get('/register', async (req, res, next) => {
  res.render('register')
})

router.post('/register', async (req, res, next) => {
  if (req.body.password !== req.body.confirm_password) { res.redirect('/error') }
  else {
    await register(req.body.username, req.body.password)
    res.redirect('/')
  }
})

module.exports = router;
