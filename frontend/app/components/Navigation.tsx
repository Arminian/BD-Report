import { Link, useLocation } from "react-router";
import { useState, useRef, useEffect } from "react";

interface NavigationProps {
  units?: 'metric' | 'imperial' | 'standard';
  onUnitsChange?: (units: 'metric' | 'imperial' | 'standard') => void;
}

export default function Navigation({ units = 'metric', onUnitsChange }: NavigationProps) {
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const settingsRef = useRef<HTMLLIElement>(null);

  // Close settings popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSettings]);

  const handleUnitsChange = (newUnits: 'metric' | 'imperial' | 'standard') => {
    if (onUnitsChange) {
      onUnitsChange(newUnits);
    }
    // Store in localStorage for persistence
    localStorage.setItem('weatherUnits', newUnits);
    setShowSettings(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-orange-400/20 sticky top-0 z-50 shadow-lg shadow-orange-500/15">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-25">
          <Link 
            to="/" 
            className="flex items-center gap-3 no-underline group"
          >
            <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500 rounded-2xl p-3 shadow-lg shadow-orange-500/15 group-hover:scale-110 transition-transform">
              <span className="text-3xl">☀️</span>
            </div>
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
              BD Report
            </span>
          </Link>
          
          <ul className="flex gap-2 sm:gap-4 items-center list-none m-0 p-0">
            <li>
              <Link 
                to="/" 
                className={`text-base sm:text-lg font-medium no-underline px-4 sm:px-6 py-2.5 rounded-xl transition-all ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 text-white shadow-lg shadow-orange-500/15' 
                    : 'text-stone-700 hover:bg-orange-50'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`text-base sm:text-lg font-medium no-underline px-4 sm:px-6 py-2.5 rounded-xl transition-all ${
                  location.pathname === '/about' 
                    ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 text-white shadow-lg shadow-orange-500/15' 
                    : 'text-stone-700 hover:bg-orange-50'
                }`}
              >
                About
              </Link>
            </li>
            <li className="relative" ref={settingsRef}>
              <button 
                className="bg-orange-500 text-white border-none px-4 sm:px-6 py-2.5 rounded-xl text-base sm:text-lg font-semibold cursor-pointer transition-all hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/15 flex items-center gap-2"
                onClick={() => setShowSettings(!showSettings)}
              >
                <span className="text-xl">⚙️</span>
                <span className="hidden sm:inline">Settings</span>
              </button>
              
              {showSettings && (
                <div className="absolute top-full right-0 mt-3 bg-white border border-orange-400/30 rounded-2xl p-6 shadow-xl shadow-orange-500/20 min-w-[280px] z-50">
                  <h3 className="mb-4 text-lg text-stone-700 font-bold">Measurement Units</h3>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer text-stone-700 hover:bg-orange-50 p-3 rounded-xl transition-colors">
                      <input
                        type="radio"
                        name="units"
                        value="metric"
                        checked={units === 'metric'}
                        onChange={() => handleUnitsChange('metric')}
                        className="cursor-pointer w-5 h-5 accent-orange-500"
                      />
                      <span className="text-base font-medium">Metric (°C, m/s)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer text-stone-700 hover:bg-orange-50 p-3 rounded-xl transition-colors">
                      <input
                        type="radio"
                        name="units"
                        value="imperial"
                        checked={units === 'imperial'}
                        onChange={() => handleUnitsChange('imperial')}
                        className="cursor-pointer w-5 h-5 accent-orange-500"
                      />
                      <span className="text-base font-medium">Imperial (°F, mph)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer text-stone-700 hover:bg-orange-50 p-3 rounded-xl transition-colors">
                      <input
                        type="radio"
                        name="units"
                        value="standard"
                        checked={units === 'standard'}
                        onChange={() => handleUnitsChange('standard')}
                        className="cursor-pointer w-5 h-5 accent-orange-500"
                      />
                      <span className="text-base font-medium">Standard (K, m/s)</span>
                    </label>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}