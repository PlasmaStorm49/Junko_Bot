const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

//Função de Temperatura

const curl = city =>
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  process.env.API_CODE;

async function getWeatherbyCity(city) {
  const result = await axios.get(curl(city));
  const celsius = result.data.main.temp - 273.15;
  return celsius.toFixed(2) + "°C";
}

client.on("ready", () => {
  console.log("Online");
});

client.on("message", async msg => {
  if (msg.content.slice(0, 1) !== "%") {
    return;
  }

  const city = msg.content.slice(1);
  try {
    const result = await getWeatherbyCity(city);
    await msg.reply(result);
  } catch (err) {
    if (err.response.status === 404) {
      await msg.reply("Cidade não encontrada");
    } else {
      await msg.reply("Há um erro no seu comando: " + err.message);
    }
  }
});

//Função de Dubladores
async function getResult(sterm) {
  const idurl = `https://api.jikan.moe/v3/search/people?q=` + sterm;

  async function getIDbysearch() {
    const idresult = await axios.get(idurl);
    return idresult.data.results[0].mal_id;
  }
  async function getPersonbyID() {
    const id = await getIDbysearch();
    const newurl = "https://api.jikan.moe/v3/person/" + id;
    const personresult = await axios.get(newurl);
    return personresult.data.voice_acting_roles;
  }

  async function getData() {
    const APIresult = await getPersonbyID();
    const finalresult = [];
    for (let i = 0; i < APIresult.length; i++) {
      finalresult.push(APIresult[i].character.name, APIresult[i].anime.name);
    }
    const uniq = finalresult.reduce(function(a, b) {
      if (a.indexOf(b) < 0) {
        a.push(b);
      } else {
        a.push("%_del%");
      }
      return a;
    }, []);

    const getfinal = uniq.reduce(function(a, b) {
      if (b == "%_del%") {
        delete uniq[uniq.indexOf(b) + 1];
        delete uniq[uniq.indexOf(b)];
      } else {
        a.push(b);
      }
      return a;
    }, []);
    let plasma = "";
    for (let i = 0; i < getfinal.length; i++) {
      (plasma += getfinal[i] + " --- " + getfinal[i + 1] + ",\n"), i++;
    }
    return plasma;
  }
  const freturn = await getData();
  return freturn;
}

client.on("message", async msg => {
  if (msg.content.slice(0, 2) !== "++") {
    return;
  }
  const sterm = msg.content.slice(2);
  try {
    const result = await getResult(sterm);
    let content = [];
    const limit = 1000;
    const lines = result.split("\n");
    const vezes = parseInt(result.length / limit);
    for (let i = 0; i < vezes; i++) {
      for (let j = 0; j < lines.length; j++) {
        if (!content[i]) {
          content[i] = [];
          content[i].push(lines[j]);
          lines.splice(j, 1);
        }

        if (content[i].join("\n").length + lines[j].length <= limit) {
          content[i].push(lines[j]);
          lines.splice(j, 1);
        } else {
          break;
        }
      }
    }
    content.push(lines);
    for (let i = 0; i < content.length; i++) {
      await msg.channel.send(content[0].join("\n"));
    }
  } catch (err) {
    if (err) {
      await msg.channel.send("Dublador não encontrado");
    }
  }
});

//Easter Eggs

client.on("message", async msg => {
  if (msg.content.includes("quebrar") && msg.content.includes("regra")) {
    msg.channel.send(
      `A-Aonde? Aonde está o transgressor? Eu vou acabar com ele até o último pedacinho, juro que não questiono nada!`,
      { files: ["static/Monokuma_Gun.png"] }
    );
  }

  if (
    msg.content.includes("sexo") ||
    msg.content.includes("Sexo") ||
    msg.content.includes("comer sua mãe") ||
    msg.content.includes("transar")
  ) {
    msg.react("😡");
  }

  if (
    (msg.content.includes("desesperado") && msg.author.bot == false) ||
    (msg.content.includes("desespero") &&
      msg.content.length < 100 &&
      msg.author.bot == false)
  ) {
    msg.channel.send("Puhuhu", {
      files: ["static/Junko_Monokuma.png"]
    });
  }
});

client.on("guildMemberAdd", async newmember => {
  const geralI = newmember.guild.channels.cache.get(process.env.ID_PTXC_GERAL);

  let chance = parseInt(Math.random() * 10);
  console.log(chance);
  if (newmember.guild.id == process.env.ID_PIADAS && chance <= 3) {
    await geralI.send(
      "Este é o mais novo convidado do desespero? Puhuhu, não tem ideia de quão ansiosa estou para te conhecer",
      { files: ["static/Junko_Horny.png"], reply: newmember }
    );
  } else if (
    newmember.guild.id == process.env.ID_PIADAS &&
    chance > 3 &&
    chance <= 6
  ) {
    await geralI.send(
      " ...este nome, esta foto, algo me diz que eu acabei de ter mais um ENCONTRO FATÍDICO",
      { files: ["static/Junko_Style.png"], reply: newmember }
    );
  } else if (newmember.guild.id == process.env.ID_PIADAS && chance > 6) {
    await geralI.send(
      "Olha só o nome deste novato me soa como uma alma inocente cheia de esperança.",
      { files: ["static/Junko_Disgust.png"], reply: newmember }
    );

    await geralI.send(
      "Algo me diz que nós vamos ter que ensinar um pouco de desespero a ele... Puhuhu.",
      { files: ["static/Junko_Style.png"] }
    );
  }
});

client.on("channelDelete", async delchannel => {
  const geralI = delchannel.guild.channels.cache.get(process.env.ID_PTXC_GERAL);

  if ((delchannel.guild.id = process.env.ID_PIADAS)) {
    await geralI.send(
      "Porque apagaram o " +
        delchannel.name +
        "? \n" +
        "Eu gostava tanto daquele canal...",
      { files: ["static/Junko_Sad.png"] }
    );
    async function chance() {
      let cnumber = parseInt(Math.random() * 10);
      if (cnumber < 6) {
        await geralI.send(
          "Mentira, eu não poderia me importar menos com aquele lixo, hahaha",
          { files: ["static/Junko_Laught.png"] }
        );
      } else {
        await geralI.send("Meh, já passou.", {
          files: ["static/Junko_Monokuma.png"]
        });
      }
    }
    setTimeout(chance, 4000);
  }
});

client.on("guildUpdate", async function(oldg, newg) {
  const geralI = newg.channels.cache.get(process.env.ID_PTXC_GERAL);

  if ((newg.id = process.env.ID_PIADAS)) {
    await geralI.send(newg.name + ". esse novo nome me soa..., desesperador.");
  } else {
    return;
  }
});

//Função da Call do Inferno

client.on("ready", function() {
  const piadas = client.guilds.cache.first();
  const geral1 = piadas.channels.cache.get(process.env.ID_PVC_GERAL1);

  async function getcall() {
    let voiceinfo = await client.channels.fetch(process.env.ID_PVC_GERAL1);
    let list = Array.from(voiceinfo.members);

    console.log(list.length);

    if (list.length > 3 && geral1.name == "Geral I") {
      let number = parseInt(Math.random() * 100);
      return number;
    } else if (list.length < 4 && geral1.name == "Call do Desespero") {
      geral1.edit({ name: "Geral I" });
      return null;
    } else {
      return null;
    }
  }

  async function execute() {
    let number = await getcall();
    console.log(number);

    if (number > 97) {
      geral1.edit({ name: "Call do Desespero" });
      const connection = await geral1.join();
      const play = connection.play("static/desespero.mp3");
      play.on("finish", async () => {
        await geral1.leave();
      });
    } else {
      console.log("unlucky");
      return null;
    }
  }

  setInterval(execute, 1800000);
});

//Extras

client.on("message", async msg => {
  if (msg.guild == process.env.ID_PIADAS) {
    const retorno =
      "Seu porco imbecil, como você quer ouvir algo sem estar em um canal de voz? Qual seu problema?";
    if (msg.content == "não to brincando") {
      if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
        const play = connection.play("static/oceano.mp3", { volume: 0.4 });
        play.on("finish", async () => {
          await msg.member.voice.channel.leave();
        });
      } else {
        msg.channel.send(retorno);
      }
    }
    if (msg.content == "bbb") {
      if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
        const play = connection.play("static/bbb.mp3", { volume: 0.4 });
        play.on("finish", async () => {
          await msg.member.voice.channel.leave();
        });
      } else {
        msg.channel.send(retorno);
      }
    }
  }
});

client.login(process.env.TOKEN);
