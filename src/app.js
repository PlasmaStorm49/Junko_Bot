const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

client.on("ready", () => {
  console.log("Online");
});

client.on("message", async (msg) => {
  if (!msg.content.startsWith("+")) {
    return;
  }

  functions.Extras.setExtras(msg);
  functions.Help.getHelp(msg);
  functions.Randomize.getRandom(msg);
});

const functions = require("./exports/getfunctions");

functions.Weather.getWeatherbyCity(client, axios);
functions.VoiceActor.getVoiceActor(client, axios);
// functions.DespairCall.randomizeDespairCall(client);
functions.UserScore.getList(client, axios);
functions.MALSearch.getAnimes(client, axios);
functions.MonkeyJr.changeName(client);
functions.DespairAlt.randomdespair(client);
client.login(process.env.TOKEN);
