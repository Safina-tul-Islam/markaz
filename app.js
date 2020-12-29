var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//-------------------------------------------------
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//Only for debugging
var dummyRouter = require("./routes/dummy");
//-------------------------------------------------

var app = express();
app.use(logger("dev"));
//--------------------------------------------------------------------
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//--------------------------------------------------------------------
// Static Routes
//-------------------------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);
app.use(
  "/bicons",
  express.static(path.join(__dirname, "node_modules/bootstrap-icons"))
);
//--------------------------------------------------------------------
//
//------------------------------------------------------------------
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/test", dummyRouter);
//------------------------------------------------------------------
const passport = require("./utils/passport");
const session = require("express-session");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "some very very secret thing",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(require("connect-flash")());
//--------------------------------------------------------------------
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
