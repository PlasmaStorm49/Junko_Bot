async function getResult(sterm, axios) {
  const idurl = process.env.MAL_API_SEARCHANIME + sterm + "&page=1";
  let malresult = await axios.get(idurl);
  return malresult;
}

function getAnimes(client, axios) {
  client.on("message", async (msg) => {
    if (msg.content.slice(0, 10) !== "+findanime") {
      return;
    }

    let sterm = msg.content.slice(10);

    try {
      let malresult = await getResult(sterm, axios);
      let results = malresult.data.results;
      let resultsresolved = "";
      let index = 1;
      for (let i = 0; i < 10; i++) {
        resultsresolved += index + "-" + results[i].title + "\n";
        index++;
      }
      msg.channel.send(
        "Resultado da pesquisa por" +
          sterm +
          " no MyAnimeList: \n \n" +
          resultsresolved
      );

      // client.on("message", async (msg) => {

      //   let nmessage = Number(msg.content);
      //   if (!Number.isNaN(nmessage) && nmessage < 11) {
      //     let choice = msg.content - 1;
      //     const embedcontent = {
      //       title: results[choice].title,
      //       color: "#2e51a2",
      //       image: { url: results[choice].image_url },
      //       footer: {
      //         text: `https://myanimelist.net/anime/${results[choice].mal_id}`,
      //         icon_url:
      //           "https://image.myanimelist.net/ui/OK6W_koKDTOqqqLDbIoPAiC8a86sHufn_jOI-JGtoCQ",
      //       },
      //       description: `**Tipo**: ${results[choice].type}
      //       **Episódios:** ${results[choice].episodes}
      //       **Mean Score**: ${results[choice].score}
      //       **Membros:** ${results[choice].members}
      //        **Sinopse:** ${results[choice].synopsis}`,
      //     };
      //     msg.channel.send({ embed: embedcontent });

      //   } else if (msg.content == "cancelar") {
      //     msg.reply("Pesquisa Cancelada!");

      //   } else if (msg.content.slice(0, 10) == "+findanime") {
      //   }
      // });
    } catch (err) {
      if (err) {
        msg.reply("Houve um problema na sua pesquisa");
      }
    }
  });
}

module.exports = { getAnimes };
