const cron = require("node-cron");
const weatherService = require("../services/weatherService");

// Schedule automatic weather update every 2 hours
const scheduleWeatherUpdates = () => {
  // Run the job every 2nd hour at zero minutes (0:00, 2:00, 4:00, etc.)
  cron.schedule("0 */2 * * *", async () => {
    console.log("Running scheduled weather update...");
    try {
      await weatherService.updateAllCitiesWeather();
      console.log("Scheduled weather update completed successfully");
    } catch (error) {
      console.error("Error in scheduled weather update:", error);
    }
  });

  console.log("Weather update scheduler initialized (runs every 2 hours)");
};

// Run initial update on server startup
const runInitialUpdate = async () => {
  console.log("Running initial weather update...");
  try {
    await weatherService.updateAllCitiesWeather();
    console.log("Initial weather update completed successfully");
  } catch (error) {
    console.error("Error in initial weather update:", error);
  }
};

module.exports = {
  scheduleWeatherUpdates,
  runInitialUpdate,
};
