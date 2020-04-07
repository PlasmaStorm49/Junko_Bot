const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

client.on("ready", () => {
  console.log("Online");
});

const functions = require("./exports/getfunctions");

functions.Weather.getWeatherbyCity(client, axios);
functions.VoiceActor.getVoiceActor(client, axios);
functions.EasterEggs.setEasterEggs(client);
functions.DespairCall.randomizeDespairCall(client);
functions.Extras.setExtras(client);
functions.Randomize.getRandom(client);
functions.Help.getHelp(client);
functions.AntiCringe.deleteCringe(client);
functions.UserScore.getList(client, axios);
functions.MALSearch.getAnimes(client, axios);

client.login(process.env.TOKEN);
