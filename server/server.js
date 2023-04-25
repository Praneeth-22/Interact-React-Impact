const express = require("express");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
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

const accountCreateTemplate = handlebars.compile(accountCreateHtml);

const eventCreateTemplate = handlebars.compile(eventCreateHtml);

const chatCreateTemplate = handlebars.compile(chatCreateHtml);

const emailEventCreateTemplate = handlebars.compile(emailEventCreateHtml);

app.post("/sendEmail", async (req, res) => {
  const { email, subject,info } = req.body;
  let myType
  if(info.type==="userPost"){
    myType= accountCreateTemplate
  } else if(info.type==="event"){
    myType= eventCreateTemplate
  }else if(info.type==="chatbot"){
    myType= emailEventCreateTemplate
  }
  else{
    myType= chatCreateTemplate
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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

exports.app = app;
