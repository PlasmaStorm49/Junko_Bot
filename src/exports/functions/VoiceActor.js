async function getResult(sterm, axios) {
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
    let info = "";
    for (let i = 0; i < getfinal.length; i++) {
      (info += getfinal[i] + " --- " + getfinal[i + 1] + ",\n"), i++;
    }
    return info;
  }
  const freturn = await getData();
  return freturn;
}

function getVoiceActor(client, axios) {
  client.on("message", async msg => {
    if (msg.content.slice(0, 2) !== "++") {
      return;
    }
    const sterm = msg.content.slice(2);
    try {
      const result = await getResult(sterm, axios);
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
        console.log(err);
        await msg.channel.send("Dublador não encontrado");
      }
    }
  });
}
module.exports = { getVoiceActor };
