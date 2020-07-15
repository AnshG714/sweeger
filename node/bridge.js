const { PythonShell } = require("python-shell");

const getScraperResults = (keywords, callback) => {
  console.log("Initializing JS Bridge...");

  const script = new PythonShell("./../scraper/js_bridge.py", {
    args: [`[${String(keywords)}]`],
  });

  let json;

  script.on("message", function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    try {
      // Uncomment the following line to see live output.
      console.log(message.toString());
      json = JSON.parse(message.toString());
      callback(json);
    } catch (_) {
      json = {};
    }
    // console.log(message);
  });

  // script.end(function (err, code, signal) {
  //   if (err) throw err;
  //   console.log("The exit code was: " + code);
  //   console.log("The exit signal was: " + signal);
  //   console.log("finished");
  // });

  // return json;
};

getScraperResults(["Angular", "TensorFlow"], function (response) {
  console.log("-------- THIS IS THE FINAL JSON ----------");
  console.log(response);
});

module.exports = getScraperResults;
