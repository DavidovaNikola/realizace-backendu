const express = require("express");
const app = express();

// Import routeru
const weeklyPlanRoutes = require("./routes/weeklyPlanRoutes");

app.use(express.json());

// Připojení routy
app.use("/weeklyPlan", weeklyPlanRoutes);

// Start serveru
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
