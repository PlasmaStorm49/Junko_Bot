function getRandom(msg) {
  if (msg.content.slice(1, 7) !== "random") {
    return;
  }
  let stroptions = msg.content.slice(7);
  let arrayoptions = stroptions.split(",");

  let number = parseInt(Math.random() * arrayoptions.length);

  msg.reply(arrayoptions[number]);
}

module.exports = { getRandom };
