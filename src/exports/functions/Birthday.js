function sendCongrats(client) {
  const birthdays = require("./data/BirthdayData");

  client.on("ready", async function () {
    async function getDates() {
      let date = Date.now();
      return date;
    }

    getDates();
  });
}

module.exports = { sendCongrats };
