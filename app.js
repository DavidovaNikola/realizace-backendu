const express = require("express");
const app = express();
const weeklyPlanRoutes = require("./routes/weeklyPlanRoutes");

app.use(express.json());
app.use("/weeklyPlan", weeklyPlanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
