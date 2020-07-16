const { PythonShell } = require("python-shell");

const getScraperResults = (keywords) => {
  return new Promise((resolve, reject) => {
    console.log("Initializing JS Bridge...");

    const script = new PythonShell("./../scraper/js_bridge.py", {
      args: [`[${String(keywords)}]`],
    });

    let json;

    script.on("message", function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      try {
        // Uncomment the following line to see live output.
        // console.log(message.toString());
        json = JSON.parse(message.toString());
        console.log("parsing successful!");
        return resolve(json);
      } catch (_) {
        json = {};
      }
      // console.log(message);
    });
  });
  // return json;
};

// async function test() {
//   let a = await getScraperResults(["Angular", "TensorFlow"]);
//   console.log(a);
// }

// test();

module.exports = getScraperResults;
