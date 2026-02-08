mkdir -p frontend/public/weather-icons
cd frontend/public/weather-icons

# Day and night icons
icons=(
  "01d" "01n"  # clear sky
  "02d" "02n"  # few clouds
  "03d" "03n"  # scattered clouds
  "04d" "04n"  # broken clouds
  "09d" "09n"  # shower rain
  "10d" "10n"  # rain
  "11d" "11n"  # thunderstorm
  "13d" "13n"  # snow
  "50d" "50n"  # mist
)

for icon in "${icons[@]}"; do
  curl -o "${icon}@2x.png" \
    "https://openweathermap.org/img/wn/${icon}@2x.png"
done