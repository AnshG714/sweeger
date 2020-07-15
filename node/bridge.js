const { spawn } = require("child_process");

const getScraperResults = (keywords) => {
  return new Promise((resolve, reject) => {
    const scr = spawn("python", [
      "./../scraper/js_bridge.py",
      `[${String(keywords)}]`,
    ]);

    scr.stdout.on("data", (data) => {
      try {
        resolve(JSON.parse(data.toString()));
      } catch (_) {}
    });

    scr.stderr.on("data", (err) => {
      console.log(err.toString());
      reject(err);
    });
  });
};

// getScraperResults(["Angular", "TensorFlow"]);

module.exports = getScraperResults;
