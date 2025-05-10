// Načítám potřebné knihovny:
const express = require("express"); // Express – backendový framework pro vytváření API
const app = express();              // Vytvářím novou instanci aplikace Express
const cors = require("cors");       // CORS – povoluje přístup k API z jiných domén (např. frontend na jiném serveru)

// 🛡️ Middleware
app.use(cors());              // Povolím CORS pro všechny domény (jinak by byl problém při volání z frontendu)
app.use(express.json());      // Umožním aplikaci pracovat s JSON daty v requestech (req.body)

// 🛣️ Načítám routy
const weeklyPlanRoutes = require("./routes/weeklyPlanRoutes");
const mealAssignmentRoutes = require("./routes/mealAssignmentRoutes"); // ✅ Přidala jsem mealAssignmentRoutes

// 🌐 Nastavuji prefix pro routy
app.use("/weeklyPlan", weeklyPlanRoutes);
app.use("/mealAssignment", mealAssignmentRoutes); // ✅ Přidala jsem tento řádek

// 🚀 Spuštění serveru
const PORT = 3000; // Nastavuji port, na kterém bude aplikace běžet
app.listen(PORT, () => {
  console.log(`✅ Server běží na http://localhost:${PORT}`);
});
