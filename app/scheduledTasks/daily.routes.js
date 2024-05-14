"use strict";

const https = require("https");
const { getMain } = require("../helpers/dailyUpdateHelpers");

module.exports = async (app) => {
  await getMain(app);

  const now = new Date();
  const utc = now.setHours(9, 0, 0, 0);
  const delay = now - utc;

  setTimeout(() => {
    setInterval(async () => {
      console.log("Daily update starting...");

      await getMain(app);

      console.log("Daily update complete...");
    }, 24 * 60 * 60 * 1 * 1000);
  }, delay);

  setInterval(() => {
    https
      .get("https://thelabbackground-08ce2d0051a2.herokuapp.com/", (res) => {
        console.log(`Ping BACKGROUND sucessful... CODE:${res.statusCode}`);
      })
      .on("error", (e) => {
        console.log(`ERROR Pinging BACKGROUND!!! CODE:${e.statusCode}`);
      });

    https
      .get("https://thelabdev-b1caa03bf550.herokuapp.com/", (res) => {
        console.log(`Ping CLIENT sucessful... CODE:${res.statusCode}`);
      })
      .on("error", (e) => {
        console.log(`ERROR Pinging CLIENT!!! CODE:${e.statusCode}`);
      });
  }, 14 * 60 * 1000);
};
