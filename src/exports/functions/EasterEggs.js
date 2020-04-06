function setEasterEggs(client) {
  client.on("message", async (msg) => {
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
  });

  client.on("guildMemberAdd", async (newmember) => {
    const geralI = newmember.guild.channels.cache.get(
      process.env.ID_PTXC_GERAL
    );

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

  client.on("channelDelete", async (delchannel) => {
    const geralI = delchannel.guild.channels.cache.get(
      process.env.ID_PTXC_GERAL
    );

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
            files: ["static/Junko_Monokuma.png"],
          });
        }
      }
      setTimeout(chance, 4000);
    }
  });

  client.on("guildUpdate", async function (oldg, newg) {
    const geralI = newg.channels.cache.get(process.env.ID_PTXC_GERAL);

    if (newg.id == process.env.ID_PIADAS) {
      await geralI.send(
        newg.name + ". esse novo nome me soa..., desesperador."
      );
    } else {
      return;
    }
  });
}

module.exports = { setEasterEggs };
