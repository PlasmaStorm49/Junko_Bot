const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://Plasma:${process.env.DB_PASSOWRD}@projectdata-hatwd.gcp.mongodb.net/test?retryWrites=true&w=majority`;
const mclient = new MongoClient(uri, {
  useNewUrlParser: true,
});

client.on("ready", () => {
  functions.DespairAlt.randomdespair(client);
  console.log("Online");
});

const functions = require("./exports/getfunctions");

client.on("message", async (msg) => {
  //Não tira isso daqui pls
  functions.DbTesting.DbInsert(msg, mclient, axios);

  if (!msg.content.startsWith("+")) {
    return;
  }
  functions.DbTesting.FirstReply(msg);
  functions.UserScore.getList(msg, axios);
  functions.MALSearch.getAnimes(msg, axios);
  functions.VoiceActor.getVoiceActor(msg, axios);
  functions.Weather.getWeatherbyCity(msg, axios);
  functions.CurrencyConvert.getCurrency(msg, axios);
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
