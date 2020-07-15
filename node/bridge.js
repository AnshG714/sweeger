const { PythonShell } = require("python-shell");

const getScraperResults = (keywords) => {
  return new Promise((resolve, reject) => {
    console.log("Initializing JS Bridge...");

    const script = new PythonShell("./../scraper/js_bridge.py", {
      args: [`[${String(keywords)}]`],
    });

    script.on("message", function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      try {
        // Uncomment the following line to see live output.
        // console.log(message.toString());
        resolve(JSON.parse(message.toString()));
      } catch (_) {}
      // console.log(message);
    });

    script.end(function (err, code, signal) {
      if (err) reject(err);
      console.log("The exit code was: " + code);
      console.log("The exit signal was: " + signal);
      console.log("finished");
    });
  });
};

getScraperResults(["Angular", "TensorFlow"]);

module.exports = getScraperResults;
