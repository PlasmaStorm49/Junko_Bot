function randomizeDespairCall(client) {
  client.on("ready", function () {
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
}

module.exports = { randomizeDespairCall };
