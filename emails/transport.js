"use strict";
const nodemailer = require("nodemailer");
const nodecron = require("node-cron")

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  nodecron.schedule("* * * * *", function(){

    let transportOptions = {
      from: '"MLH Fellowship" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "MLH - Your weekly suggestons for skillbuilding!", // Subject line
      text: "Your weekly email.", // plain text body
      html: "<b>Your suggestions here!</b>", // HTML we have from our formatted emails
    };
  // send mail with defined transport object
    let info = transporter.sendMail(transportOptions, function(error,information) {
      if (error) {
        throw error;
      } else {
        console.log("Everything here!");
      }    
    });
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  
}

main().catch(console.error);