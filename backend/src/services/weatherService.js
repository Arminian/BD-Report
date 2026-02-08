const db = require("../config/db");
const openWeatherService = require("./openWeatherService");

class WeatherService {
  // Get all cities with their current weather data
  async getAllCitiesWeather(units = "metric") {
    try {
      const result = await db.query(`
            SELECT 
            c.id,
            c.name,
            c.country,
            c.lat,
            c.lon,
            w.temperature,
            w.feels_like,
            w.pressure,
            w.humidity,
            w.wind_speed,
            w.wind_degree,
            w.clouds,
            w.weather_main,
            w.weather_description,
            w.icon,
            w.rain_1h,
            w.snow_1h,
            w.updated_at
            FROM cities c
            LEFT JOIN weather_data w ON c.id = w.city_id
            ORDER BY c.id
      `);

      return result.rows.map(city => this.convertUnits(city, units));
    } catch (error) {
      console.error("Error fetching cities weather:", error);
      throw error;
    }
  }

  // Get weather data for a specific city
  async getCityWeather(cityId, units = "metric") {
    try {
      const result = await db.query(
        `
            SELECT 
            c.id,
            c.name,
            c.country,
            c.lat,
            c.lon,
            w.temperature,
            w.feels_like,
            w.pressure,
            w.humidity,
            w.wind_speed,
            w.wind_degree,
            w.clouds,
            w.weather_main,
            w.weather_description,
            w.icon,
            w.rain_1h,
            w.snow_1h,
            w.updated_at
            FROM cities c
            LEFT JOIN weather_data w ON c.id = w.city_id
            WHERE c.id = $1
          `,
        [cityId],
      );

      if (result.rows.length === 0) {
        throw new Error("City not found");
      }

      return this.convertUnits(result.rows[0], units);
    } catch (error) {
      console.error("Error fetching city weather:", error);
      throw error;
    }
  }

  // Update weather data for a specific city
  async updateCityWeather(cityId) {
    try {
      // Get city coordinates
      const cityResult = await db.query(
        "SELECT lat, lon FROM cities WHERE id = $1",
        [cityId],
      );

      if (cityResult.rows.length === 0) {
        throw new Error("City not found");
      }

      const { lat, lon } = cityResult.rows[0];

      // Fetch current weather from OpenWeather API
      const weatherData = await openWeatherService.getCurrentWeatherByCoords(
        lat,
        lon,
      );

      // Update or insert weather data
      await db.query(
        `
            INSERT INTO weather_data 
            (city_id, temperature, feels_like, pressure, humidity, wind_speed, 
            wind_degree, clouds, weather_main, weather_description, icon, 
            rain_1h, snow_1h, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP)
            ON CONFLICT (city_id) 
            DO UPDATE SET
            temperature = EXCLUDED.temperature,
            feels_like = EXCLUDED.feels_like,
            pressure = EXCLUDED.pressure,
            humidity = EXCLUDED.humidity,
            wind_speed = EXCLUDED.wind_speed,
            wind_degree = EXCLUDED.wind_degree,
            clouds = EXCLUDED.clouds,
            weather_main = EXCLUDED.weather_main,
            weather_description = EXCLUDED.weather_description,
            icon = EXCLUDED.icon,
            rain_1h = EXCLUDED.rain_1h,
            snow_1h = EXCLUDED.snow_1h,
            updated_at = EXCLUDED.updated_at
        `,
        [
          cityId,
          weatherData.temperature,
          weatherData.feelsLike,
          weatherData.pressure,
          weatherData.humidity,
          weatherData.windSpeed,
          weatherData.windDegree,
          weatherData.clouds,
          weatherData.weatherMain,
          weatherData.weatherDescription,
          weatherData.icon,
          weatherData.rain1h,
          weatherData.snow1h
        ],
      );

      return await this.getCityWeather(cityId);
    } catch (error) {
      console.error("Error updating city weather:", error);
      throw error;
    }
  }

  // Update weather data for all cities
  async updateAllCitiesWeather() {
    try {
      const citiesResult = await db.query("SELECT id FROM cities");
      const cities = citiesResult.rows;

      console.log(`Updating weather for ${cities.length} cities...`);

      for (const city of cities) {
        try {
          await this.updateCityWeather(city.id);
          console.log(`Updated weather for city ID: ${city.id}`);
        } catch (error) {
          console.error(`Failed to update city ID ${city.id}:`, error.message);
        }
      }

      console.log("Weather update completed");
    } catch (error) {
      console.error("Error updating all cities weather:", error);
      throw error;
    }
  }

  // Add a new city
  async addCity(cityName) {
    try {
      // Fetch city data from OpenWeather API
      const weatherData =
        await openWeatherService.getCurrentWeatherByCity(cityName);

      // Insert city
      const cityResult = await db.query(
        `INSERT INTO cities (name, country, lat, lon) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id`,
        [
          cityName,
          weatherData.country,
          weatherData.coordinates.lat,
          weatherData.coordinates.lon,
        ],
      );

      const cityId = cityResult.rows[0].id;

      // Insert weather data
      await db.query(
        `
            INSERT INTO weather_data 
            (city_id, temperature, feels_like, pressure, humidity, wind_speed, 
            wind_degree, clouds, weather_main, weather_description, icon, 
            rain_1h, snow_1h, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP)
        `,
        [
          cityId,
          weatherData.temperature,
          weatherData.feelsLike,
          weatherData.pressure,
          weatherData.humidity,
          weatherData.windSpeed,
          weatherData.windDegree,
          weatherData.clouds,
          weatherData.weatherMain,
          weatherData.weatherDescription,
          weatherData.icon,
          weatherData.rain1h,
          weatherData.snow1h
        ],
      );

      return await this.getCityWeather(cityId);
    } catch (error) {
      if (error.message === "City not found") {
        throw error;
      }
      if (error.code === "23505") {
        // Postgres-speciftc violation
        throw new Error("City already exists");
      }
      console.error("Error adding city:", error);
      throw error;
    }
  }

  // Delete a city
  async deleteCity(cityId) {
    try {
      const result = await db.query(
        "DELETE FROM cities WHERE id = $1 RETURNING id",
        [cityId],
      );

      if (result.rows.length === 0) {
        throw new Error("City not found");
      }
    } catch (error) {
      console.error("Error deleting city:", error);
      throw error;
    }
  }

  // Get measurement units without API calls
  convertUnits(weatherData, units = 'metric') {
    if (units === 'metric') {
      return weatherData; // Default is metric
    }

    const converted = { ...weatherData };

    if (units === 'imperial') {
      // Convert °C to °F
      converted.temperature = +(converted.temperature * 9/5).toFixed(2) + 32;
      converted.feels_like = +(converted.feels_like * 9/5).toFixed(2) + 32;
      // Convert m/s to mph
      converted.wind_speed = +(converted.wind_speed * 2.237).toFixed(2);
    } else if (units === 'standard') {
      // Convert °C to K
      converted.temperature = converted.temperature + 273.15;
      converted.feels_like = converted.feels_like + 273.15;
    }

    // Rounded to 2 decimals
    return converted;
  }
}

module.exports = new WeatherService();
