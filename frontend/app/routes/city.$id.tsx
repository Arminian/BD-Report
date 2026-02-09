import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { weatherApi, type City } from "../services/weatherApi";
import WeatherIcon from "../components/WeatherIcon";

export default function CityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);
  const [units, setUnits] = useState<'metric' | 'imperial' | 'standard'>('metric');

  // Load units preference
  useEffect(() => {
    const savedUnits = localStorage.getItem('weatherUnits') as 'metric' | 'imperial' | 'standard';
    if (savedUnits) {
      setUnits(savedUnits);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchCity();
    }
  }, [id, units]);

  const fetchCity = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherApi.getCity(parseInt(id!), units);
      setCity(data);
    } catch (err) {
      setError('Failed to load city details. Please try again.');
      console.error('Error fetching city:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm(`Are you sure you want to remove ${city?.name} from your dashboard?`)) {
      return;
    }

    try {
      setRemoving(true);
      await weatherApi.deleteCity(parseInt(id!));
      navigate('/');
    } catch (err) {
      setError('Failed to remove city. Please try again.');
      console.error('Error removing city:', err);
      setRemoving(false);
    }
  };

  const getTemperatureUnit = () => {
    if (units === 'imperial') return '°F';
    if (units === 'standard') return 'K';
    return '°C';
  };

  const getWindSpeedUnit = () => {
    return units === 'imperial' ? 'mph' : 'm/s';
  };

  const getWindDirection = (degree: number | null | undefined): string => {
    if (degree === null || degree === undefined) return 'N';
    
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((degree % 360) / 45)) % 8;
    return directions[index];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mb-4"></div>
          <p className="text-xl text-white font-medium drop-shadow-lg">Loading city details...</p>
        </div>
      </div>
    );
  }

  if (error && !city) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-2xl shadow-md">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-2xl shadow-md">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="font-medium">City not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Action Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <Link 
          to="/" 
          className="px-6 py-3 bg-white/95 backdrop-blur-sm text-stone-700 border-2 border-orange-400/30 rounded-2xl text-base font-bold no-underline inline-flex items-center gap-2 transition-all hover:bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 hover:text-white hover:border-transparent shadow-lg shadow-orange-500/15"
        >
          <span className="text-xl">←</span>
          Back to Dashboard
        </Link>
        <button 
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white border-none rounded-2xl text-base font-bold cursor-pointer transition-all hover:from-red-600 hover:to-red-700 hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleRemove}
          disabled={removing}
        >
          <span className="text-xl">✕</span>
          {removing ? 'Removing...' : 'REMOVE CITY'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-2xl shadow-md mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Main Weather Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl shadow-orange-500/20 border border-orange-400/20 overflow-hidden">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg shadow-orange-500/15">
                <WeatherIcon 
                icon={city.icon}
                description={city.weather_description}
                size="small"
              />
              </div>
              <div className="flex-1 text-white">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3  drop-shadow-lg">
                  {city.name}
                </h1>
                <p className="text-xl sm:text-2xl font-medium mb-4 opacity-90">{city.country}</p>
                <div className="text-6xl sm:text-7xl font-black mb-4 drop-shadow-lg ">
                  {Math.round(city.temperature)}{getTemperatureUnit()}
                </div>
                <p className="text-2xl font-semibold capitalize opacity-90">{city.weather_description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-8 sm:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-50 p-6 rounded-2xl border border-orange-400/20 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🌡️</span>
                <span className="text-stone-500 text-sm uppercase tracking-wider font-bold">Feels Like</span>
              </div>
              <span className="text-3xl font-black text-stone-700 ">
                {Math.round(city.feels_like)}{getTemperatureUnit()}
              </span>
            </div>

            {city.pressure !== null && city.pressure !== undefined && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-50 p-6 rounded-2xl border border-orange-400/20 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🎚️</span>
                  <span className="text-stone-500 text-sm uppercase tracking-wider font-bold">Pressure</span>
                </div>
                <span className="text-3xl font-black text-stone-700 ">{city.pressure} hPa</span>
              </div>
            )}

            <div className="bg-gradient-to-br from-orange-50 to-orange-50 p-6 rounded-2xl border border-orange-400/20 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">💧</span>
                <span className="text-stone-500 text-sm uppercase tracking-wider font-bold">Humidity</span>
              </div>
              <span className="text-3xl font-black text-stone-700 ">{city.humidity}%</span>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-50 p-6 rounded-2xl border border-orange-400/20 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">💨</span>
                <span className="text-stone-500 text-sm uppercase tracking-wider font-bold">Wind Speed</span>
              </div>
              <span className="text-3xl font-black text-stone-700 ">
                {city.wind_speed} {getWindSpeedUnit()}
              </span>
            </div>

            {city.wind_degree !== null && city.wind_degree !== undefined && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-50 p-6 rounded-2xl border border-orange-400/20 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🧭</span>
                  <span className="text-stone-500 text-sm uppercase tracking-wider font-bold">Wind Direction</span>
                </div>
                <span className="text-3xl font-black text-stone-700 ">
                  {getWindDirection(city.wind_degree)} ({city.wind_degree}°)
                </span>
              </div>
            )}

            {city.clouds !== null && city.clouds !== undefined && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-50 p-6 rounded-2xl border border-orange-400/20 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">☁️</span>
                  <span className="text-stone-500 text-sm uppercase tracking-wider font-bold">Cloudiness</span>
                </div>
                <span className="text-3xl font-black text-stone-700 ">{city.clouds}%</span>
              </div>
            )}

            {city.rain_1h !== null && city.rain_1h > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🌧️</span>
                  <span className="text-blue-700 text-sm uppercase tracking-wider font-bold">Rain (1h)</span>
                </div>
                <span className="text-3xl font-black text-blue-800 ">{city.rain_1h} mm</span>
              </div>
            )}

            {city.snow_1h !== null && city.snow_1h > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">❄️</span>
                  <span className="text-gray-700 text-sm uppercase tracking-wider font-bold">Snow (1h)</span>
                </div>
                <span className="text-3xl font-black text-gray-800 ">{city.snow_1h} mm</span>
              </div>
            )}

            <div className="bg-gradient-to-br from-orange-50 to-orange-50 p-6 rounded-2xl border border-orange-400/20 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🕐</span>
                <span className="text-stone-500 text-sm uppercase tracking-wider font-bold">Last Updated</span>
              </div>
              <span className="text-xl font-bold text-stone-700">
                {new Date(city.updated_at).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}