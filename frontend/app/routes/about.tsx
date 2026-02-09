export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-block bg-white/95 backdrop-blur-sm rounded-full p-6 shadow-xl shadow-orange-500/20 mb-6">
          <span className="text-7xl">☀️</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
          About BD Report App
        </h1>
        <p className="text-xl text-orange-50/90 font-medium max-w-2xl mx-auto">
          Tracking your favorite locations simple and beautiful.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl shadow-orange-500/20 border border-orange-400/20 overflow-hidden mb-8">
        <div className="p-8 sm:p-12">
          {/* Introduction */}
          <div className="mb-10">
            <p className="text-lg leading-relaxed text-stone-700">
              BD Report is a weather application that provides real-time weather information 
              for cities around the world. Built with React Router v7 and held together by NodeJS and Express server. 
            </p>
          </div>

          {/* Features Section */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-stone-700 mb-6 flex items-center gap-3">
              <span className="text-4xl">✨</span>
              Features
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl">
                <span className="text-2xl flex-shrink-0">🌍</span>
                <div>
                  <h3 className="font-bold text-stone-700 mb-1">Global Coverage</h3>
                  <p className="text-sm text-stone-500">Track weather in cities worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl">
                <span className="text-2xl flex-shrink-0">🔄</span>
                <div>
                  <h3 className="font-bold text-stone-700 mb-1">Real-time Updates</h3>
                  <p className="text-sm text-stone-500">Automatic refresh every 2 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl">
                <span className="text-2xl flex-shrink-0">📊</span>
                <div>
                  <h3 className="font-bold text-stone-700 mb-1">Detailed Metrics</h3>
                  <p className="text-sm text-stone-500">Temperature, humidity, wind, and more</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl">
                <span className="text-2xl flex-shrink-0">🌧️</span>
                <div>
                  <h3 className="font-bold text-stone-700 mb-1">Precipitation Tracking</h3>
                  <p className="text-sm text-stone-500">Monitor rain and snowfall levels</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl">
                <span className="text-2xl flex-shrink-0">📏</span>
                <div>
                  <h3 className="font-bold text-stone-700 mb-1">Unit Flexibility</h3>
                  <p className="text-sm text-stone-500">Metric, imperial, or standard units</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl">
                <span className="text-2xl flex-shrink-0">🎨</span>
                <div>
                  <h3 className="font-bold text-stone-700 mb-1">Beautiful Design</h3>
                  <p className="text-sm text-stone-500">Modern, warm, and intuitive interface</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-stone-700 mb-6 flex items-center gap-3">
              <span className="text-4xl">🛠️</span>
              Built With
            </h2>
            <div className="bg-gradient-to-br from-orange-50 to-orange-50 p-6 rounded-2xl border border-orange-400/20">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-orange-500 mb-3 flex items-center gap-2">
                    <span className="text-xl">🎨</span>
                    Frontend
                  </h3>
                  <ul className="space-y-2 text-stone-700">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      React Router v7
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      Tailwind CSS
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      Vite
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-orange-500 mb-3 flex items-center gap-2">
                    <span className="text-xl">⚙️</span>
                    Backend
                  </h3>
                  <ul className="space-y-2 text-stone-700">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      Node.js
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      Express.js
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      PostgreSQL
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      Docker
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Data Source */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-stone-700 mb-6 flex items-center gap-3">
              <span className="text-4xl">🌐</span>
              Data Source
            </h2>
            <div className="bg-gradient-to-br from-orange-50 to-orange-50 p-6 rounded-2xl border border-orange-400/20">
              <p className="text-lg text-stone-700 mb-4">
                Weather data is powered by{' '}
                <a 
                  href="https://openweathermap.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-500 font-bold no-underline hover:text-orange-400 transition-colors"
                >
                  OpenWeather
                </a>
                , one of the world's leading providers of weather data and forecasting services.
              </p>
              <p className="text-base text-stone-500">
                  Thanks to OpenWeather for providing access to their weather API and documentation, 
                  making this project possible.
              </p>
            </div>
          </div>

          {/* Creator Section */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-stone-700 mb-6 flex items-center gap-3">
              <span className="text-4xl">👨‍💻</span>
              About the Creator
            </h2>
            <div className="bg-gradient-to-br from-orange-50 to-orange-50 p-6 rounded-2xl border border-orange-400/20">
              <p className="text-lg text-stone-700">
                This weather application was created as a full-stack web development project for Baltic Data, 
                showcasing modern technologies including React Router v7, Node.js, Express, 
                and PostgreSQL.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <a 
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white/95 backdrop-blur-sm text-stone-700 border-2 border-orange-400/30 rounded-2xl text-lg font-bold no-underline transition-all hover:bg-gradient-to-r hover:from-amber-400 hover:via-orange-400 hover:to-orange-500 hover:text-white hover:border-transparent shadow-lg shadow-orange-500/15 hover:shadow-xl hover:shadow-orange-500/20 hover:scale-105"
        >
          <span className="text-2xl">🏠</span>
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}