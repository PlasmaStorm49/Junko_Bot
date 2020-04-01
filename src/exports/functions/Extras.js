function setExtras(client) {
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
}
module.exports = { setExtras };
