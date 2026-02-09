const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');

/*
    Get all cities with their current weather data
    GET /api/weather/cities
*/
router.get('/cities', async (req, res) => {
  try {
    const { units = 'metric' } = req.query;
    const cities = await weatherService.getAllCitiesWeather(units);
    res.json({
      success: true,
      data: cities
    });
  } catch (error) {
    console.error('Error in GET /cities:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cities'
    });
  }
});

/*  
    Get weather data for a specific city
    GET /api/weather/cities/:id
*/
router.get('/cities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { units = 'metric' } = req.query;
    const city = await weatherService.getCityWeather(parseInt(id), units);
    res.json({
      success: true,
      data: city
    });
  } catch (error) {
    console.error('Error in GET /cities/:id:', error);
    if (error.message === 'City not found') {
      res.status(404).json({
        success: false,
        error: 'City not found'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch city weather'
      });
    }
  }
});

/*
    Add a new city
    POST /api/weather/cities
*/
router.post('/cities', async (req, res) => {
  try {
    const { cityName } = req.body;

    if (!cityName) {
      return res.status(400).json({
        success: false,
        error: 'City name is required'
      });
    }

    const city = await weatherService.addCity(cityName);
    res.status(201).json({
      success: true,
      data: city
    });
  } catch (error) {
    console.error('Error in POST /cities:', error);
    if (error.message === 'City not found') {
      res.status(404).json({
        success: false,
        error: 'City not found in OpenWeather database'
      });
    } else if (error.message === 'City already exists') {
      res.status(409).json({
        success: false,
        error: 'City already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to add city'
      });
    }
  }
});

/*
    Delete a city
    DELETE /api/weather/cities/:id
*/
router.delete('/cities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await weatherService.deleteCity(parseInt(id));
    res.json({
      success: true,
      message: 'City deleted successfully'
    });
  } catch (error) {
    console.error('Error in DELETE /cities/:id:', error);
    if (error.message === 'City not found') {
      res.status(404).json({
        success: false,
        error: 'City not found'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to delete city'
      });
    }
  }
});

/*
    Refresh weather data for a specific city
    PUT /api/weather/cities/:id/refresh
*/
router.put('/cities/:id/refresh', async (req, res) => {
  try {
    const { id } = req.params;
    const city = await weatherService.updateCityWeather(parseInt(id));
    res.json({
      success: true,
      data: city
    });
  } catch (error) {
    console.error('Error in PUT /cities/:id/refresh:', error);
    if (error.message === 'City not found') {
      res.status(404).json({
        success: false,
        error: 'City not found'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to refresh city weather'
      });
    }
  }
});

module.exports = router;