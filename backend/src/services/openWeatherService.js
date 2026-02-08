const axios = require("axios");
require("dotenv").config();

class OpenWeatherService {
  constructor() {
    this.apiKey = process.env.EXTERNAL_API_KEY; // OpenWeather requires API key for calls
    this.baseUrl = process.env.EXTERNAL_API_URL;
  }

  // Fetch current weather data by city coordinates
  async getCurrentWeatherByCoords(lat, lon, units = "metric") {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units,
        },
      });

      return this.formatWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      throw new Error("Failed to fetch weather data from OpenWeather API");
    }
  }

  // Fetch current weather data by city name
  async getCurrentWeatherByCity(cityName, units = "metric") {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          q: cityName,
          appid: this.apiKey,
          units,
        },
      });

      return {
        ...this.formatWeatherData(response.data),
        coordinates: {
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
        },
        country: response.data.sys.country,
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("City not found");
      }
      console.error("Error fetching weather data:", error.message);
      throw new Error("Failed to fetch weather data from OpenWeather API");
    }
  }

  // Format weather data into consistent structure
  formatWeatherData(data) {
    return {
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDegree: data.wind.deg,
      clouds: data.clouds.all,
      weatherMain: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      icon: data.weather[0].icon,
      rain1h: data.rain?.['1h'] || null,  // Rain volume in mm only
      snow1h: data.snow?.['1h'] || null   // And snow too
    };
  }
}

module.exports = new OpenWeatherService();
