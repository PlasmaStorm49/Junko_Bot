const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

client.on("ready", () => {
  functions.DespairAlt.randomdespair(client);
  console.log("Online");
});

const functions = require("./exports/getfunctions");

client.on("message", async (msg) => {
  if (!msg.content.startsWith("+")) {
    return;
  }

  functions.UserScore.getList(msg, axios);
  functions.MALSearch.getAnimes(msg, axios);
  functions.VoiceActor.getVoiceActor(msg, axios);
  functions.Weather.getWeatherbyCity(msg, axios);
  functions.Extras.setExtras(msg);
  functions.Help.getHelp(msg);
  functions.Randomize.getRandom(msg);
});

client.on("guildMemberUpdate", async (oldM, newM) => {
  functions.MonkeyJr.changeName(oldM, newM);
});

client.on("voiceStateUpdate", async (oldS, newS) => {
  functions.DespairAlt.despairalert(oldS, newS);
});

client.login(process.env.TOKEN);
