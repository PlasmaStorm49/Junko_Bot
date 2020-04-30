async function getResult(sterm, axios) {
  const idurl = process.env.MAL_API_SEARCHANIME + sterm + "&page=1";
  let malresult = await axios.get(idurl);
  return malresult;
}

async function getAnimes(msg, axios) {
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

    const filter = (msg) =>
      (!Number.isNaN(Number(msg.content)) && Number(msg.content) < 11) ||
      msg.content.startsWith("+");
    const collector = msg.channel.createMessageCollector(filter, {
      max: 1,
      time: 15000,
    });
    collector.on("collect", function (collected) {
      if (Number.isNaN(Number(collected.content))) {
        return;
      }
      let choice = collected.content - 1;
      let year = results[choice].start_date.slice(0, 4);
      let embedConstructor = {
        title: results[choice].title,
        color: "#2e51a2",
        image: { url: results[choice].image_url },
        footer: {
          text: `https://myanimelist.net/anime/${results[choice].mal_id}`,
          icon_url:
            "https://image.myanimelist.net/ui/OK6W_koKDTOqqqLDbIoPAiC8a86sHufn_jOI-JGtoCQ",
        },
        description: `**Tipo**: ${results[choice].type}
              **Episódios**: ${results[choice].episodes}
              **Mean Score**: ${results[choice].score}
              **Membros**: ${results[choice].members}
              **Ano do Início da Exibição**: ${year}
               **Sinopse:** ${results[choice].synopsis}`,
      };

      msg.channel.send({ embed: embedConstructor });
    });
  } catch (err) {
    if (err) {
      msg.reply("Houve um problema na sua pesquisa");
      console.log(err);
    }
  }
}

module.exports = { getAnimes };
