var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
const cors = require("cors");
// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
//

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
// app.use(fs)
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use('/', indexRouter);
app.use("/users", usersRouter);


var express = require("express");
var router = express.Router();
// const fs = require("fs");
// const handlebars = require("handlebars");
const accountCreateHtml = fs.readFileSync(
  "./mailTemplates/postUpload.handlebars",
  "utf-8"
);
const eventCreateHtml = fs.readFileSync(
  "./mailTemplates/eventUpload.handlebars",
  "utf-8"
);

const chatCreateHtml = fs.readFileSync(
  "./mailTemplates/chatMessage.handlebars",
  "utf-8"
);
const emailEventCreateHtml = fs.readFileSync(
  "./mailTemplates/emailEvent.handlebars",
  "utf-8"
);
// const {accountCreateHtml, eventCreateHtml, chatCreateHtml, emailEventCreateHtml} = require('../app.js')
const accountCreateTemplate = handlebars.compile(accountCreateHtml);

const eventCreateTemplate = handlebars.compile(eventCreateHtml);

const chatCreateTemplate = handlebars.compile(chatCreateHtml);

const emailEventCreateTemplate = handlebars.compile(emailEventCreateHtml);

app.post("/sendEmail", async (req, res) => {
  const { email, subject, info } = req.body;
  let myType;
  if (info.type === "userPost") {
    myType = accountCreateTemplate;
  } else if (info.type === "event") {
    myType = eventCreateTemplate;
  } else if (info.type === "chatbot") {
    myType = emailEventCreateTemplate;
  } else {
    myType = chatCreateTemplate;
  }
  //console.log(email, subject, message);
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "interactreactimpact@gmail.com",
      pass: "xaytjypzkqqknqob",
    },
  });

  let mailDetails = {
    from: "interactreactimpact@gmail.com",
    to: email,
    subject: subject,
    html: myType({
      data: info,
    }),
  };

  mailTransporter.sendMail(mailDetails, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully");
    }
  });

  res.send("Email sent!");
});
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
