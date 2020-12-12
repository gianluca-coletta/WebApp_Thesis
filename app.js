/**
* Module dependencies.
*/
var express = require('express')
  // , routes = require('./routes')
  // , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var homeRouter = require("./routes/home.router");
var loginRouter = require("./routes/login.router");
var registrationRouter = require("./routes/registration.router");
var dashboardRouter = require("./routes/dashboard.router");

//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();

var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tesi',
  port: 3307
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected! Browse http://localhost:8080");
});

global.db = connection;

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}))

// development only

// app.get('/', routes.index);//call for main index page

// app.get('/signup', routes.signup);//call for signup page
// app.post('/signup', routes.signup);//call for signup post

// app.get('/login', routes.index);//call for login page
// app.post('/login', routes.login);//call for login post
// app.get('/home/logout', routes.logout);//call for logout

// app.get('/home/dashboard', routes.dashboard);//call for dashboard page after login
// app.get('/home/profile',routes.profile);//to render users profile
// app.get('/home/prenotazione',routes.prenotazione);//to render users prenotazione
app.use("/", homeRouter);
app.use("/registration", registrationRouter);
app.use("/home", loginRouter);
app.use("/dashboard", dashboardRouter);

//Middleware
app.listen(8080)
