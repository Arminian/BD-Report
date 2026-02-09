import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import CityCard from "../components/CityCard";
import { weatherApi, type City } from "../services/weatherApi";

export default function Dashboard() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [adding, setAdding] = useState(false);
  const [units, setUnits] = useState<'metric' | 'imperial' | 'standard'>('metric');

  // Load units preference from localStorage
  useEffect(() => {
    const savedUnits = localStorage.getItem('weatherUnits') as 'metric' | 'imperial' | 'standard';
    if (savedUnits) {
      setUnits(savedUnits);
    }

    // Listen for units changes from Navigation
    const handleUnitsChange = () => {
      const newUnits = localStorage.getItem('weatherUnits') as 'metric' | 'imperial' | 'standard';
      if (newUnits) {
        setUnits(newUnits);
      }
    };

    window.addEventListener('storage', handleUnitsChange);
    return () => window.removeEventListener('storage', handleUnitsChange);
  }, []);

  // Fetch cities
  useEffect(() => {
    fetchCities();
  }, [units]);

  const fetchCities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherApi.getCities(units);
      setCities(data);
    } catch (err) {
      setError('Failed to load cities. Please try again.');
      console.error('Error fetching cities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchInput.trim()) return;

    try {
      setAdding(true);
      setError(null);
      await weatherApi.addCity(searchInput.trim());
      setSearchInput('');
      await fetchCities(); // Refresh the list
    } catch (err: any) {
      if (err.message === 'City not found') {
        setError(`City "${searchInput}" not found. Please check the spelling.`);
      } else if (err.message === 'City already exists') {
        setError(`"${searchInput}" is already in your list.`);
      } else {
        setError('Failed to add city. Please try again.');
      }
      console.error('Error adding city:', err);
    } finally {
      setAdding(false);
    }
  };

  if (loading && cities.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mb-4"></div>
          <p className="text-xl text-stone-700 font-medium">Loading your weather...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Section */}
      <div className="text-center mb-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
          Your Weather Dashboard
        </h1>
        <p className="text-lg sm:text-xl text-orange-50/90 font-medium">
          Track weather conditions across your favorite cities
        </p>
      </div>

      {/* Search Section */}
      <form onSubmit={handleAddCity} className="max-w-4xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl shadow-orange-500/20 p-3 border border-orange-400/20">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
              <input
                type="text"
                className="w-full pl-14 pr-6 py-4 bg-transparent border-none text-lg text-stone-700 placeholder-stone-500 font-medium focus:outline-none"
                placeholder="Search for a city..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                disabled={adding}
              />
            </div>
            <button 
              type="submit" 
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 text-white border-none rounded-2xl text-lg font-bold cursor-pointer transition-all hover:shadow-xl hover:shadow-orange-500/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
              disabled={adding || !searchInput.trim()}
            >
              {adding ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Adding...
                </span>
              ) : (
                '+ Add City'
              )}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-2xl shadow-md">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cities Grid */}
      {cities.length === 0 ? (
        <div className="text-center py-30">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto shadow-xl shadow-orange-500/20 border border-orange-400/20">
            <span className="text-7xl mb-6 block">🌤️</span>
            <h2 className="text-3xl font-bold text-stone-700 mb-3">No cities yet</h2>
            <p className="text-stone-500 text-lg">
              Start by adding your first city using the search bar above
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} units={units} />
          ))}
        </div>
      )}
    </div>
  );
}