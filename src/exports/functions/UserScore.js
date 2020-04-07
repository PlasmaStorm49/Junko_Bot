async function getResult(sterm, axios) {
  const idurl = process.env.MAL_API_SEARCHUSER + sterm + "/animelist";
  let mal = await axios.get(idurl);
  return mal;
}

function getList(client, axios) {
  client.on("message", async (msg) => {
    if (msg.content.slice(0, 6) !== "+score") {
      return;
    }

    let splitmsg = msg.content.split(" ");
    let sterm = splitmsg[1];
    let animename = "";
    for (let i = 2; i < splitmsg.length; i++) {
      animename += splitmsg[i] + " ";
    }

    let stringindex = animename.lastIndexOf(" ");
    let animenameresolved = animename.slice(0, stringindex);

    try {
      let result = await getResult(sterm, axios);
      let resarr = [];
      for (let i = 0; i < result.data.anime.length; i++) {
        resarr.push(result.data.anime[i].title);
      }
      let resultindex = resarr.indexOf(animenameresolved);
      let final = result.data.anime[resultindex];

      function changewstatus() {
        if (final.watching_status == 1) {
          let status = "Watching";
          return status;
        } else if (final.watching_status == 2) {
          let status = "Completed";
          return status;
        } else if (final.watching_status == 3) {
          let status = "On-Hold";
          return status;
        } else if (final.watching_status == 4) {
          let status = "Dropped";
          return status;
        } else {
          let status = "Plan to Watch";
          return status;
        }
      }
      function changes() {
        if (final.score == 0) {
          let score = "-";
          return score;
        } else {
          return final.score;
        }
      }

      let fscore = changes();
      let fstatus = changewstatus();

      msg.channel.send(
        "Nome do Anime: " +
          final.title +
          "\nStatus: " +
          fstatus +
          "\nEpisódios: " +
          final.watched_episodes +
          "\nNota: " +
          fscore
      );
    } catch (err) {
      if (err.message == "Request failed with status code 400") {
        await msg.channel.send("Usuário não encontrado");
      } else if (err.message == `Cannot read property 'score' of undefined`) {
        await msg.channel.send("Este anime não está na lista deste usuário");
      }
    }
  });
}

module.exports = { getList };
