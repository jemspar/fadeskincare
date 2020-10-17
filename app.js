var createError = require('http-errors');
var express = require('express');
// var sass = require('node-sass');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// db
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// .env
var dotenv = require('dotenv').config();


// ROUTES
var indexRouter = require('./routes/index');

var app = express();

// var stripe = require("stripe")("pk_test_babuAnnlO0CWBPRj3GugrxDI00pa8C57xW");


// MONGOOSE
mongoose
.connect('mongodb+srv://' + process.env.MONGO_CLIENT_USER + ':' + process.env.MONGO_CLIENT_PW + '@fadeskincare-g2mqj.azure.mongodb.net/fadeskincare?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Successfully connected to MongoDB."))
.catch(err => {
  console.error("Connection error", err)
  db.close()
});

var db = mongoose.connection;
app.use(session({
  store: new MongoStore({ mongooseConnection: db }),
  secret: "almost like someone lives here",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true},
  collection: 'sessions'
}));


// view engine setup -----------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// END -------------------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session setup
app.set('trust proxy', 1) // trust first proxy


// helmet
// TO DO: remove unsafe-inline scripts using nonces
if (process.env.PRODUCTION) {
  var helmet = require('helmet');
  app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "code.jquery.com", "'unsafe-inline'", "www.paypal.com"],
      styleSrc: ["'self'", "fonts.googleapis.com", "https://unpkg.com/normalize.css@8.0.1/normalize.css"],
      fontSrc: ["fonts.gstatic.com"]
    },
  })
);
}



// SASS PREPROCESSING FOR ALL PAGES ------------
var srcPath = path.join(__dirname,'public');
var destPath = path.join(__dirname,'public');

app.use('/', sassMiddleware({
  src: srcPath,
  dest: destPath,
  debug: true,
  outputStyle: 'expanded'
}));
// END -----------------------------------------

app.use(express.static(path.join(__dirname, 'public')));


// ROUTERS ---------------------
app.use('/', indexRouter);
// END -------------------------

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
});

module.exports = app;
