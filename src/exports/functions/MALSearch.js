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
      for (let i = 0; i < 10; i++) {
        resultsresolved += results[i].title + "\n";
      }
      msg.channel.send(
        "Resultado da pesquisa por" +
          sterm +
          " no MyAnimeList: \n \n" +
          resultsresolved
      );
    } catch (err) {
      if (err) {
        msg.reply("Houve um problema na sua pesquisa");
      }
    }
  });
}

module.exports = { getAnimes };
