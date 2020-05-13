async function FirstReply(msg) {
  if (msg.content !== "+dbcontest") {
    return;
  }
  msg.channel.send("Atualizando Listas...");
}
async function DbInsert(msg, mclient, axios) {
  if (msg.author.id !== "687180575387287565") {
    return;
  }
  if (!msg.author.bot) {
    return;
  }
  if (msg.content !== "Atualizando Listas...") {
    return;
  }
  let userIdList = [
    "kirbycolus",
    "AlexandreEsteves",
    "Joh_n",
    "MarchingPossum12",
    "Lucas64_",
    "MaxMaximus",
    "Xanshi",
    "SloppyBoy",
    "Ig0y",
    "Ira_Games",
    "PlasmaStorm49",
    "Felipe_Viana",
    "RangelAlb",
    "Nascente",
  ];
  msg.edit(`Atualizando Listas (0/${userIdList.length})`);
  let apiresult = [];
  for (i = 0; i < userIdList.length; i++) {
    msg.edit(
      `Atualizando Listas (${i + 1}/${userIdList.length} [${userIdList[i]}])`
    );
    apiresult.push(
      await axios.get(
        "http://api.jikan.moe/v3/user/" + userIdList[i] + "/animelist"
      )
    );
  }
  let finalresult = [];
  for (i = 0; i < apiresult.length; i++) {
    finalresult.push({
      user: userIdList[i],
    });
  }
  for (i = 0; i < finalresult.length; i++) {
    finalresult[i].data = [];
    for (j = 0; j < apiresult[i].data.anime.length; j++) {
      finalresult[i].data.push({
        anime: apiresult[i].data.anime[j].title,
        nota: apiresult[i].data.anime[j].score,
      });
    }
  }
  msg.edit(`Transferindo listas para o banco de dados...`);
  console.log(finalresult);
  mclient.connect((err) => {
    const coll = mclient.db("Junko(BOT)").collection("piadas_anime_data");
    coll.drop();
    coll.insertMany(finalresult);
    mclient.close();
  });
  msg.edit(`Operação Concluída com sucesso`);
}

module.exports = { DbInsert, FirstReply };
