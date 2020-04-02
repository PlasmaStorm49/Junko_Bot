function getHelp(client) {
  client.on("message", async msg => {
    if (msg.content.slice(0, 5) == "+help") {
      msg.reply(
        "\nLista de Comandos: \n" +
          "+random - Seleciona uma opção aleatoriamente, separe as opções por ',' \n" +
          "+dub - Exibe os animes e os personagens feitos por algum dublador \n" +
          "+temp - Exibe a temperatura atual em alguma cidade fornecida \n" +
          "+help - Exibe os comandos do bot \n" +
          "\n Lista de Funções Automáticas: \n" +
          "Call do Desespero - Transforma aleatóriamente uma call com mais de 3 " +
          "pessoas na call do desespero - (3% a cada 30 min) \n" +
          "Extras - Emite sons no canal de voz quando certas palavras " +
          "são digitadas no chat - (bbb, não to brincando) \n" +
          "Easter Eggs- Responde a ações diversas realizadas no servidor com imagens " +
          "e frases, podendo ter reações diversas aleatoriamente."
      );
    }
  });
}

module.exports = { getHelp };
