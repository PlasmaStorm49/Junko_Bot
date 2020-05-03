async function getResult(sterm, axios) {
  const url = `https://api.exchangeratesapi.io/latest?base=${sterm}`;
  let result = await axios.get(url);
  return result;
}

function convertMessage(req, msg) {
  if (req.length !== 5) {
    msg.reply(
      `A mensagem de comando deve ter 4 informações seguindo o modelo:
      +convert [valor] [moeda1] em [moeda2]`
    );
    return;
  }
  let quantity = Number(req[1]);
  if (Number.isNaN(quantity)) {
    msg.reply(
      `Insira um valor numérico a ser convertido seguindo o moodelo:
      +convert [valor] [moeda1] em [moeda2]`
    );
    return;
  }
  if (req[3] !== "em") {
    msg.reply(
      `Você deve usar o "em" para separar as moedas seguindo o moodelo:
      +convert [valor] [moeda1] em [moeda2]`
    );
    return;
  }

  const currencys = [
    "CAD",
    "HKD",
    "ISK",
    "PHP",
    "DKK",
    "HUF",
    "CZK",
    "GBP",
    "RON",
    "SEK",
    "IDR",
    "INR",
    "BRL",
    "RUB",
    "HRK",
    "JPY",
    "THB",
    "CHF",
    "EUR",
    "MYR",
    "BGN",
    "TRY",
    "CNY",
    "NOK",
    "NZD",
    "ZAR",
    "USD",
    "MXN",
    "SGD",
    "AUD",
    "ILS",
    "KRW",
    "PLN",
  ];
  let moedas = [req[2].toLowerCase(), req[4].toLowerCase()];
  let convertedcy = [];
  for (let i = 0; i < moedas.length; i++) {
    let moeda = moedas[i];
    switch (moeda) {
      case "real":
      case "reais":
        moeda = "BRL";
        break;
      case "dólar":
      case "dolar":
      case "dolares":
      case "dólares":
        moeda = "USD";
        break;
      case "iene":
      case "yen":
      case "yene":
      case "yenes":
      case "ienes":
      case "yens":
        moeda = "JPY";
        break;
    }
    convertedcy.push(moeda.toUpperCase());
  }
  if (!currencys.includes(convertedcy[0])) {
    msg.reply(`A primeira moeda informada não existe ou está escrita incorretamente.
    Caso não esteja conseguindo informar a moeda desejada informe a abreviação dela em 3 dígitos, por exemplo:
    Real: "BRL" ou Dólar: "USD"`);
    return;
  } else if (!currencys.includes(convertedcy[1])) {
    msg.reply(`A segunda moeda informada não existe ou está escrita incorretamente,
    Caso não esteja conseguindo informar a moeda desejada informe a abreviação dela em 3 dígitos, por exemplo:
    Real: "BRL" ou Dólar: "USD"`);
    return;
  }
  return convertedcy;
}

async function getCurrency(msg, axios) {
  if (msg.content.slice(1, 8) !== "convert") {
    return;
  }
  let req = msg.content.split(" ");
  let sterm = convertMessage(req, msg);

  if (!sterm) {
    return;
  }

  try {
    let result = await getResult(sterm[0], axios);
    let resolved = (req[1] * result.data.rates[sterm[1]]).toFixed(2);
    msg.channel.send(`${req[1]} ${req[2]} equivalem a ${resolved} ${req[4]}`);
  } catch (err) {
    if (err) {
      console.log(err);
      msg.reply("Houve um erro!");
    }
  }
}

module.exports = { getCurrency };
