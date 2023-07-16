if (process.env.NODE_ENV !=='production') {
  require("dotenv").config();
}
const express = require("express");
const axios = require("axios");
const app = express();
const server_port = process.env.PORT;
app.use(express.json());
app.use(express.static("frontend"));
const IPGEOLOC_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOC_API_KEY}`;

app.listen(server_port || "3000", () => {
  console.log("Server is running!");
});

app.get("/home", (req, res) => {
  let locWeatherObject = {}
  let ipLatitude, ipLongitude
  let WEATHER_URL;
  //First call to ipgeolocation API
  axios({
    url: IPGEOLOC_URL,
    responseType: 'json'
  }).then(locData => {
    locWeatherObject.city = locData.data.city;
    locWeatherObject.country_code = locData.data.country_code2;
    locWeatherObject.country_name = locData.data.country_name;
    ipLatitude = locData.data.latitude;
    ipLongitude = locData.data.longitude;
    return locData;
  }).then(locData => {
    WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${ipLatitude}&lon=${ipLongitude}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
    //Nested Axios call
    axios({
      url: WEATHER_URL,
      responseType: 'json'
    }).then(weatherData => {
      locWeatherObject.mainWeatherInfo = weatherData.data.main;
      locWeatherObject.weatherDesc = weatherData.data.weather;
      axios({
        url: "https://zenquotes.io/api/random",
        responseType: "json"
      }).then(quoteData => {
        locWeatherObject.quoteData = quoteData.data;
        res.json(locWeatherObject);
      });
    });
    //End of nested axios call
  }).catch(err => console.log(err));
});