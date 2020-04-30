function randomdespair(client) {
  const guild = client.guilds.cache.get("687181966759559198");
  const channel = guild.channels.cache.get("687181967199830095");

  async function getcall() {
    let list = await Array.from(channel.members);
    console.log(list.length);
    if (list.length > 0 && channel.name !== "Call do Desespero") {
      let randomnumber = parseInt(Math.random() * 100);
      return randomnumber;
    } else if (list.length < 1 && channel.name == "Call do Desespero") {
      channel.edit({ name: "Geral" });
      return null;
    } else {
      return null;
    }
  }
  async function execute() {
    let number = await getcall();
    console.log(number);

    if (number > 50) {
      channel.edit({ name: "Call do Desespero" });

      const connection = await channel.join();
      const play = connection.play("static/desespero.mp3");
      play.on("finish", async () => {
        await channel.leave();
      });
    } else {
      return null;
    }
  }
  setInterval(execute, 1800000);
}

function despairalert(oldS, newS) {
  if (oldS.channel == null) {
    return;
  }
  if (oldS.channel.name !== "Call do Desespero") {
    return;
  }

  let textchannel = null;
  if (oldS.guild.id == "687181966759559198") {
    textchannel = oldS.guild.channels.cache.get("687181966759559202");
  }
  if (newS.channel !== oldS.channel) {
    textchannel.send(
      `Puhuhu, ${oldS.member.displayName} acabou de fugir da call do desespero.`
    );
  }
}
module.exports = { randomdespair, despairalert };
