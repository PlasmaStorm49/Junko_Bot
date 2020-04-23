function deleteCringe(client) {
  client.on("message", async (msg) => {
    if (msg.author.id == process.env.ID_SLOPPY) {
      const lowcasemsgs = msg.content.toLowerCase();
      if (
        lowcasemsgs.includes("maria") ||
        lowcasemsgs.includes("malu") ||
        lowcasemsgs.includes("aleatória") ||
        lowcasemsgs.includes("aleatoria") ||
        lowcasemsgs.includes("magalu") ||
        msg.mentions.users.has(process.env.ID_ALEATORIA)
      ) {
        msg.delete();
        msg.channel.send("Pare de fazer coisas vergonhosas seu porco nojento.");
      }
    } else if (msg.author.id == process.env.ID_ALEATORIA) {
      const lowcasemsga = msg.content.toLowerCase();
      if (
        lowcasemsga.includes("gabriel") ||
        lowcasemsga.includes("sloppy") ||
        lowcasemsga.includes("sloppyboy") ||
        lowcasemsga.includes("gab") ||
        lowcasemsgs.includes("spoppy") ||
        lowcasemsgs.includes("poyo") ||
        msg.mentions.users.has(process.env.ID_SLOPPY)
      ) {
        msg.delete();
        msg.channel.send("Pare de fazer coisas vergonhosas sua vadia imunda.");
      }
    }
  });
}

module.exports = { deleteCringe };
