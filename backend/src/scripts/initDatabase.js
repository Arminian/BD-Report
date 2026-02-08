const db = require('../config/db');

const initializeDatabase = async () => {
  try {
    console.log("Initializing database...");

    // Create cities table
    await db.query(`
            CREATE TABLE IF NOT EXISTS cities (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                country VARCHAR(100),
                lat DECIMAL(10, 7),
                lon DECIMAL(10, 7),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    // Create weather_data table
    await db.query(`
            CREATE TABLE IF NOT EXISTS weather_data (
                id SERIAL PRIMARY KEY,
                city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
                temperature DECIMAL(5, 2),
                feels_like DECIMAL(5, 2),
                pressure INTEGER,
                humidity INTEGER,
                wind_speed DECIMAL(5, 2),
                wind_degree INTEGER,
                clouds INTEGER,
                weather_main VARCHAR(50),
                weather_description VARCHAR(100),
                icon VARCHAR(10),
                rain_1h DECIMAL(5, 2),
                snow_1h DECIMAL(5, 2),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(city_id)
            );
        `);

    // Create index for faster queries
    await db.query(`
            CREATE INDEX IF NOT EXISTS idx_city_id ON weather_data(city_id);
        `);

    console.log("Database tables created successfully");

    // Insert default cities
    const defaultCities = [
      { name: "Riga", country: "LV", lat: 56.9496, lon: 24.1052 },
      { name: "Vilnius", country: "LT", lat: 54.6872, lon: 25.2797 },
      { name: "Tallinn", country: "EE", lat: 59.437, lon: 24.7536 },
      { name: "London", country: "GB", lat: 51.5074, lon: -0.1278 },
      { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 },
      { name: "Delhi", country: "IN", lat: 28.7041, lon: 77.1025 },
      { name: "Shanghai", country: "CN", lat: 31.2304, lon: 121.4737 },
      { name: "New York", country: "US", lat: 40.7128, lon: -74.006 },
      { name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },
      { name: "Jakarta", country: "ID", lat: -6.2088, lon: 106.8456 },
    ];

    for (const city of defaultCities) {
      await db.query(
        `INSERT INTO cities (name, country, lat, lon) 
                VALUES ($1, $2, $3, $4) 
                ON CONFLICT (name) DO NOTHING`,
        [city.name, city.country, city.lat, city.lon],
      );
    }

    console.log("Default cities inserted successfully");
    console.log("Database initialization complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
};

initializeDatabase();
