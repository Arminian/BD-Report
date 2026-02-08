const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface City {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_degree?: number;
  pressure?: number;
  clouds?: number;
  weather_main: string;
  weather_description: string;
  icon: string;
  rain_1h: number | null;
  snow_1h: number | null;
  updated_at: string;
}

export const weatherApi = {
  getCities: async (units: 'metric' | 'imperial' | 'standard' = 'metric'): Promise<City[]> => {
    const response = await fetch(`${API_URL}/api/weather/cities?units=${units}`);
    const data = await response.json();
    return data.data;
  },

  getCity: async (id: number, units: 'metric' | 'imperial' | 'standard' = 'metric'): Promise<City> => {
    const response = await fetch(`${API_URL}/api/weather/cities/${id}?units=${units}`);
    const data = await response.json();
    return data.data;
  },

  addCity: async (cityName: string): Promise<City> => {
    const response = await fetch(`${API_URL}/api/weather/cities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityName }),
    });
    const data = await response.json();
    return data.data;
  },

  deleteCity: async (id: number): Promise<void> => {
    await fetch(`${API_URL}/api/weather/cities/${id}`, {
      method: 'DELETE',
    });
  },

  refreshCity: async (id: number): Promise<City> => {
    const response = await fetch(`${API_URL}/api/weather/cities/${id}/refresh`, {
      method: 'PUT',
    });
    const data = await response.json();
    return data.data;
  },
};