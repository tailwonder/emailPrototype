var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var bodyParser = require('body-parser')
var flash = require('flash-express')
var RedisStore = require('connect-redis')(session);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var inboxRouter = require('./routes/inbox');
var composeRouter = require('./routes/compose');
var testConxRouter = require('./routes/test');
var sentRouter = require('./routes/sent');
var app = express();


if (global.Connection === undefined)  global.Connection = [];

function checkAuth (req, res, next) {
	console.log('checkAuth ' + req.url);
  	console.log('authed ' + req.session.authenticated);

	// don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	if (req.url === '/favicon.ico' ) {
		res.status(204)
	}

	if (req.url === '/home' && (!req.session || !req.session.authenticated)) {
		res.render('unauthorised', { status: 403 });
		return;
	}

  if (req.url === '/users' && (!req.session || !req.session.authenticated)) {
		res.render('unauthorised', { status: 403 });
		return;
	}

  if (req.url === '/inbox' && (!req.session || !req.session.authenticated)) {
    res.render('unauthorised', { status: 403 });
    return;
  }

  if (req.url === '/home' && (!req.session || !req.session.authenticated)) {
    res.render('unauthorised', { status: 403 });
    return;
  }

  if (req.url === '/compose' && (!req.session || !req.session.authenticated)) {
    res.render('unauthorised', { status: 403 });
    return;
  }

  if (req.url === '/sent' && (!req.session || !req.session.authenticated)) {
    res.render('unauthorised', { status: 403 });
    return;
  }

  if (req.url === '/logout' || req.url === '/logout' ) {
    delete req.session.authenticated;
    global.Connection[req.session.username].close()
    delete global.Connection[req.session.username]
    delete req.session.username;

  }

	console.log('next ');
	next();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

/*
var sess = {
  secret: 'keyboard cat',
  cookie: {},
  resave: true,
  saveUninitialized: true
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))
*/

app.use(session({
    store: new RedisStore(),
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: false
}));

app.use(checkAuth);

app.use('/', indexRouter);
app.use('/inbox', inboxRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logoff', loginRouter);
app.use('/logout', loginRouter);
app.use('/home', homeRouter);
app.use('/compose', composeRouter);
app.use('/sent', sentRouter);
app.use('/test', testConxRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
S
});

module.exports = app;
