"use strict";
const nodemailer = require("nodemailer");
const nodecron = require("node-cron")


let testAccount = nodemailer.createTestAccount();

nodecron.schedule("* * * * Monday", function () {
  console.log("Running Cron Job");
  //console.log(testAccount)
  //console.log(testAccount.user)
  //console.log(testAccount.pass)
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'lladke7yye36ycji@ethereal.email', // generated ethereal user
      pass: 'zMWPYCWyS8G48bVmWT', // generated ethereal password
    }
  });
  
  let transportOptions = {
    from: '"MLH Fellowship" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "MLH - Your weekly suggestons for skillbuilding!", // Subject line
    text: "Your weekly email.", // plain text body
    html: "<b>Your suggestions here!</b>"
  };
  
  transporter.sendMail(transportOptions, function (err, info) {
    
    if (err) {
      console.log(err);
    } else {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  });
  
});




