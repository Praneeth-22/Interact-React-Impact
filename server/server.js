const express = require("express");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const accountCreateHtml = fs.readFileSync(
  "./postUpload.handlebars",
  "utf-8"
);
const accountCreateTemplate = handlebars.compile(accountCreateHtml);



app.post("/sendEmail", async (req, res) => {
  const { email, subject } = req.body;
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
    html: accountCreateTemplate({
      name: "Praneeth",
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
