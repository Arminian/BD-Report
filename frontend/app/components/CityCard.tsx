import { Link } from "react-router";
import type { City } from "../services/weatherApi";

interface CityCardProps {
  city: City;
  units: 'metric' | 'imperial' | 'standard';
}

export default function CityCard({ city, units }: CityCardProps) {
  const getTemperatureUnit = () => {
    if (units === 'imperial') return '°F';
    if (units === 'standard') return 'K';
    return '°C';
  };

  const getWindSpeedUnit = () => {
    return units === 'imperial' ? 'mph' : 'm/s';
  };

  const getWindDirection = (degree: number | null | undefined): string => {
    if (degree === null || degree === undefined) return '↑';
    
    const directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
    const index = Math.round(((degree % 360) / 45)) % 8;
    return directions[index];
  };

  return (
    <Link to={`/city/${city.id}`} className="no-underline group">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-warm transition-all duration-300 hover:shadow-warm-lg hover:-translate-y-2 cursor-pointer border border-warm-peach/20 overflow-hidden relative">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-warm-gradient opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-warm-brown mb-1 font-display group-hover:text-sunset-orange transition-colors">
                {city.name}
              </h3>
              <p className="text-sm text-warm-gray font-medium">{city.country}</p>
            </div>
            <div className="bg-gradient-to-br from-soft-cream to-warm-white rounded-2xl p-2 shadow-sm">
              <img 
                src={`../../public/weather-icons/${city.icon}@2x.png`}
                alt={city.weather_description}
                className="w-16 h-16"
              />
            </div>
          </div>

          <div className="text-5xl font-black text-transparent bg-warm-gradient bg-clip-text mb-5 font-display">
            {city.temperature !== null ? Math.round(city.temperature) : '--'}{getTemperatureUnit()}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-warm-gray text-sm font-medium flex items-center gap-2">
                <span className="text-lg">🌡️</span> Feels like
              </span>
              <span className="font-bold text-warm-brown text-base">
                {city.feels_like !== null ? Math.round(city.feels_like) : '--'}{getTemperatureUnit()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-warm-gray text-sm font-medium flex items-center gap-2">
                <span className="text-lg">💨</span> Wind
              </span>
              <span className="font-bold text-warm-brown text-base flex items-center gap-1.5">
                {city.wind_speed !== null ? city.wind_speed.toFixed(1) : '--'} {getWindSpeedUnit()}
                <span 
                  className="inline-block transition-transform duration-300 text-sunset-orange text-xl"
                  style={{ 
                    transform: `rotate(${city.wind_degree || 0}deg)`,
                  }}
                >
                  {getWindDirection(city.wind_degree)}
                </span>
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-warm-gray text-sm font-medium flex items-center gap-2">
                <span className="text-lg">💧</span> Humidity
              </span>
              <span className="font-bold text-warm-brown text-base">
                {city.humidity !== null ? city.humidity : '--'}%
              </span>
            </div>
          </div>

          {(city.rain_1h !== null || city.snow_1h !== null) && (
            <div className="flex gap-2 mt-4 pt-4 border-t border-warm-peach/20">
              {city.rain_1h !== null && city.rain_1h > 0 && (
                <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 flex items-center gap-1.5 shadow-sm">
                  🌧️ {city.rain_1h}mm
                </span>
              )}
              {city.snow_1h !== null && city.snow_1h > 0 && (
                <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 flex items-center gap-1.5 shadow-sm">
                  ❄️ {city.snow_1h}mm
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}