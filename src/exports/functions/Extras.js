async function setExtras(msg) {
  if (msg.guild.id !== process.env.ID_PIADAS) {
    return;
  }

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
      files: ["static/Junko_Monokuma.png"],
    });
  }

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

  if (msg.content == "hibari-kun") {
    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join();
      const play = connection.play("static/hibari-kun.mp3", {
        volume: 0.8,
      });
      play.on("finish", async () => {
        await msg.member.voice.channel.leave();
      });
    } else {
      msg.channel.send(retorno);
    }
  }
}

module.exports = { setExtras };
