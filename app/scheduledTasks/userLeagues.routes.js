"use strict";

module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const league = require("../controllers/league.controller.js");

  setInterval(async () => {
    if (app.get("syncing") !== true) {
      await user.user(app);

      await league.league(app);
    } else {
      console.log("Skipping SYNC...");
    }
    const used = process.memoryUsage();
    for (let key in used) {
      console.log(
        `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
      );
    }
  }, 30 * 1000);

  setTimeout(async () => {
    //await user.playershares(app);

    await user.user(app);

    await league.league(app);

    setInterval(async () => {
      await user.playershares(app);
    }, 0.5 * 60 * 1000);
  }, 15000);
};
