import { useState } from 'react';

interface WeatherIconProps {
  icon: string;
  description: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

/*
    WeatherIcon component that displays OpenWeather icons with fallback
*/
export default function WeatherIcon({ 
  icon, 
  description, 
  className = '',
  size = 'medium'
}: WeatherIconProps) {
  const [imageError, setImageError] = useState(false);
  
  // Size mappings
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32 sm:w-40 sm:h-40',
    large: 'w-40 h-40 sm:w-48 sm:h-48'
  };
  
  // Fallback emoji mapping
  const getFallbackEmoji = (iconCode: string): string => {
    const code = iconCode.substring(0, 2);
    const emojiMap: Record<string, string> = {
      '01': '☀️',
      '02': '⛅',
      '03': '☁️',
      '04': '☁️',
      '09': '🌧️',
      '10': '🌦️',
      '11': '⛈️',
      '13': '❄️',
      '50': '🌫️',
    };
    return emojiMap[code] || '🌤️';
  };
  
  const iconPath = `/weather-icons/${icon}@2x.png`;
  
  if (imageError) {
    // Use emoji if image fails to load
    return (
      <div 
        className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}
        title={description}
        role="img"
        aria-label={description}
      >
        <span className="text-6xl">{getFallbackEmoji(icon)}</span>
      </div>
    );
  }
  
  return (
    <img 
      src={iconPath}
      alt={description}
      className={`${sizeClasses[size]} ${className}`}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
}