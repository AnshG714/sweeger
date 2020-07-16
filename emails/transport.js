"use strict";
const nodemailer = require("nodemailer");
const nodecron = require("node-cron");
const getScraperResults = require("../node/bridge");

let testAccount = nodemailer.createTestAccount();

// nodecron.schedule("* * * * Monday", function () {
//   console.log("Running Cron Job");
//   //console.log(testAccount)
//   //console.log(testAccount.user)
//   //console.log(testAccount.pass)
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "lladke7yye36ycji@ethereal.email", // generated ethereal user
//       pass: "zMWPYCWyS8G48bVmWT", // generated ethereal password
//     },
//   });

//   let transportOptions = {
//     from: '"MLH Fellowship" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "MLH - Your weekly suggestions for skillbuilding!", // Subject line
//     text: "Your weekly email.", // plain text body
//     html: "<b>Your suggestions here!</b>",
//   };

//   transporter.sendMail(transportOptions, function (err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     }
//   });
// });

const temp =
  '<h4><a href="/all-front/preventing-app-regressions-in-angular-82adb50348f2">Preventing app regressions in Angular</a></h4><h5>Preventing app regressions with lighthouse integration</h5><h5>By Gabriel Stellini</h5><br /><h4><a href="/javascript-in-plain-english/angular-universal-and-i18n-working-together-8828423e8a68">Angular Universal and I18n working together</a></h4><h5>Recently I tried to setup internationalization and Server Side Rendering (SSR) together with Angular. After digging for days and nearly…</h5><h5>By Pierre Machaux</h5><br /><h4><a href="/@aniketeknathjadhav/basic-angular-interview-questions-ebaa7c9b0197">Basic Angular Interview Questions</a></h4><h5>In this article there are some of the common Angular basic interview questions with answers for beginners. Most of them are one liners and…</h5><h5>By Aniket Jadhav</h5><br /><h4><a href="/javascript-in-plain-english/create-a-custom-form-control-component-in-angular-with-control-value-accessor-807f1304bcd7">Create a custom form control component in Angular with Control Value Accessor</a></h4><h5>“Recipes tell you nothing. Learning techniques is the key“— Tom Colicchio</h5><h5>By Bharath Ravi</h5><br /><h4><a href="/weekly-webtips/angular-rxjs-essential-operators-86238034e182">Angular Rxjs essential operators</a></h4><h5>Understanding reactive programming. Handling Observables and Operators</h5><h5>By Gustavo Lage</h5><br /><h4><a href="/@liutingchun_95744/angular-four-ways-for-communication-between-components-b743b9653f8">Angular — Four Ways for Communication Between Components</a></h4><h5>An Angular application is consisted of many smaller components. Here is an introduction to four ways of communication between components.</h5><h5>By Liu Ting Chun</h5><br /><h4><a href="https://www.youtube.com/watch">System of Particles Rotational Motion | Class 11 Physics | String Pulley Problems | Angular Momentum</a></h4><h5>Full Playlist: https://www.youtube.com/playlist?list=PLQHaGos0gnrKf-C2_7apbTdU1dIMvtHk0 Download Pdf Book: ...</h5><h5>By EduventureZ IIT-JEE NEET</h5><br /><h4><a href="https://www.youtube.com/watch">Angular File Manager Part-1</a></h4><h5>Angular File Manager is for managing the file system that allows users to perform most common file operations like accessing, editing, and sorting files or folders.</h5><h5>By kids - Learning</h5><br /><h4><a href="https://www.youtube.com/watch">Angular 9/10 Drag and Drop Multiple Files Upload to Firebase Storage Using AngularFire2 Full Project</a></h4><h5>Angular 9/10 Drag and Drop Multiple Files Upload to Firebase Storage Using AngularFire2 Full Project Download the source code of the application here ...</h5><h5>By Coding Shiksha</h5><br /><h4><a href="https://www.youtube.com/watch">Angular: Tipado y mapear respuestas Http a modelos personalizados</a></h4><h5>Cursos de Angular: https://fernando-herrera.com/#/curso/angular https://fernando-herrera.com/#/curso/angular-adv https://fernando-herrera.com/#/curso/socket ...</h5><h5>By Fernando Herrera</h5><br /><h4><a href="https://www.youtube.com/watch">Angular: Atualizando projetos para Angular v10 (ng update)</a></h4><h5>Atualização de projeto Angular v9 para Angular v10 utilizando o ng update Playlist de Programação: ...</h5><h5>By Felipe Norato</h5><br />';

async function sendEmail(email, keywords) {
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "sweeger.learn@gmail.com", // generated ethereal user
      pass: "swigswag", // generated ethereal password
    },
  });

  let transportOptions = {
    from: '"MLH Fellowship" <anshgodha714@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "MLH - Your weekly suggestions for skillbuilding!", // Subject line
    text: "Your weekly email.", // plain text body
    html: await generateHTML(keywords),
    //
  };

  transporter.sendMail(transportOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  });
}

async function generateHTML(keywords) {
  let results = await getScraperResults(keywords);
  let html = "";
  results.forEach((obj) => {
    html += `<h4><a href="${obj.link}">${obj.title}</a></h4>`;
    html += !!obj.blurb
      ? `<h5>${obj.blurb}</h5>`
      : `<h5>No description available.</h5>`;
    html += `<h5>By ${obj.author}</h5><br />`;
  });
  console.log(html);
  return html;
}

// sendEmail(["Angular"]);

module.exports = sendEmail;
