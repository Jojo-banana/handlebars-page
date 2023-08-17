var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('./bin/config')
const sess = {secret:config.secret, cookie:{maxAge: 60000}}
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { engine } = require('express-handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api')

var apiBeatsaver = require('./routes/beatsaver');
const { authenticate } = require('./controllers/account');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.set('trust proxy', 1);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutDir: path.join(__dirname + '/views/layouts'),
  partialsDir: path.join(__dirname + '/views/partials')
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/api/beatsaver', apiBeatsaver);

passport.serializeUser((user,done) => {
  return done(null, user);
})

passport.deserializeUser((user,done) => {
  return done(null, user);
})

app.use(passport.authenticate('session'));
app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = [];
  next();
})

// app.use(passport.initialize())
// app.use(passport.session())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

passport.use(new LocalStrategy(async (username, password, done) => {
  var user = await authenticate(username, password);
  return done(null, user);
}))

module.exports = app;
