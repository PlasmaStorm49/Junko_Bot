const curl = city =>
  process.env.WEATHER_API_URL + city + "&appid=" + process.env.WEATHER_API_CODE;

async function getWeather(city, axios) {
  const result = await axios.get(curl(city));
  const celsius = result.data.main.temp - 273.15;
  return celsius.toFixed(2) + "°C";
}

function getWeatherbyCity(client, axios) {
  client.on("message", async msg => {
    if (msg.content.slice(0, 5) !== "+temp") {
      return;
    }

    const city = msg.content.slice(5);
    try {
      const result = await getWeather(city, axios);
      await msg.reply(result);
    } catch (err) {
      if (err.response.status === 404) {
        await msg.reply("Cidade não encontrada");
      } else {
        await msg.reply("Há um erro no seu comando: " + err.message);
      }
    }
  });
}

module.exports = { getWeatherbyCity };
