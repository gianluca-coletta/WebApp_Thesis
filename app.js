/**
* Module dependencies.
*/
var express = require('express')
  , http = require('http')
  , path = require('path');

var homeRouter = require("./routes/home.router");
var loginRouter = require("./routes/login.router");
var registrationRouter = require("./routes/registration.router");
var dashboardRouter = require("./routes/dashboard.router");
var errorRouter = require("./routes/error.router");

var moment = require("moment");
moment.locale("it");

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
// app.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

var authentication = (req, res, next) => {
  if (!req.session.userId) res.redirect("/home/login");
  next();
};

app.use("/", homeRouter);
app.use("/registration", registrationRouter);
app.use("/home", loginRouter);
app.use("/dashboard", authentication, dashboardRouter);
app.use("/error", errorRouter);

//Middleware
app.listen(8080)
