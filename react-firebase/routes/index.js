var express = require("express");
var router = express.Router();
const sendEmail = require("../../emails/transport");

router.post("/api/sendKeywords", function (req, res) {
  const { email, keywords } = req.body;
  sendEmail(email, keywords)
    .then(() => res.send({ success: true }))
    .catch((err) => {
      console.log(err);
      res.send({ success: false });
    });
});

module.exports = router;
