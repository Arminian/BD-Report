# BD Weather Report Application

Web application for city weather report using OpenWeather API, built with React Router and NodeJS/Express.

Demo available [here](https://bd-report-production.up.railway.app/)

## 💡 Features
- 🕒 **Real-time weather updates** <br>
*Update is every 2 hours as per OpenWeather pricing: https://openweathermap.org/price*
- ⭐ **Dashboard with favorites** <br>
*Favorite city cards provide weather overview*
- ✏️ **Customizable dashboard** <br>
*Add a city with search navigation and remove on city pages*
- 🍃 **In-depth weather conditions** <br>
*City pages provide all available OpenWeather conditions*


## ⚙️ Quick Start

To build and run using Docker:

```bash
# Build Docker files
docker compose build

# Run Docker container
docker compose up 
```


## 💿 Important Modules
### Frontend
- Tailwind CSS
- React router v7
- Typescript
- Vite

### Backend
- Axios
- Cors
- Dotenv
- Express
- PG
- Node-Cron


## 🔌 Project Structure
```
├── backend
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── package.json
│   ├── wait-for-db.sh                -- await postgres to start db
│   └── src
│       ├── config
│       │   └── db.js                 -- posgres connection
│       ├── jobs
│       │   └── weatherUpdateJob.js   -- update db every two hours
│       ├── routes
│       │   └── weatherRoutes         -- api endpoints
│       ├── scripts
│       │   └── initDatabase.js       -- create db & tables
│       ├── server.js                 -- express entry point
│       └── services
│           ├── openWeatherService.js -- openweather communication
│           └── weatherService.js     -- backend server logic

├── frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── react-router.config.ts
│   ├── app
│   │   ├── components
│   │   │   ├── CityCard.tsx          -- dynamic city cards
│   │   │   ├── Footer.tsx            -- page footer
│   │   │   ├── Navigation.tsx        -- navigation bar
│   │   │   └── WeatherIcon.tsx       -- weather icons with backup
│   │   ├── routes
│   │   │   ├── about.tsx             -- about page
│   │   │   ├── city.$id.tsx          -- city-specific page
│   │   │   └── dashboard.tsx         -- index/home page
│   │   ├── services
│   │   │   └── weatherApi.ts         -- making api calls
│   │   ├── routes.ts
│   │   ├── app.css
│   │   ├── root.tsx
│   │   ├── postcss.config.js         -- postcss because tailwind issues
│   │   └── tailwind.config.js
│   └── public
│       ├── favicon.ico
│       └── weather-icons             -- icons are taken from here

├── docker-compose.yml                -- runs your docker container
├── download_ico.sh                   -- initial icons download (dev only)
├── package.json
└── README.md
```

## 📸 Screenshots

<img src="https://i.postimg.cc/ZnyyXN1w/Screenshot_20260209_074640.png" alt="Home page">

<img src="https://i.postimg.cc/8crrxvqq/Screenshot_20260209_074628.png" alt="Riga city page">

---

Built for demonstration 🛐 with React Router v7.
