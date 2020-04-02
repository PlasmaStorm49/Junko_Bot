function getRandom(client) {
  client.on("message", async msg => {
    if (msg.content.slice(0, 7) !== "+random") {
      return;
    }
    let stroptions = msg.content.slice(7);
    let arrayoptions = stroptions.split(",");

    let number = parseInt(Math.random() * arrayoptions.length);

    msg.reply(arrayoptions[number]);
  });
}

module.exports = { getRandom };
