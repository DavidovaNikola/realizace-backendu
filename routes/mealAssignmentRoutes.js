// Načítám Express – backendový framework, který mi pomáhá vytvářet API (routy, requesty, odpovědi).
const express = require("express");

// Vytvářím novou instanci routeru – tady definuju všechny cesty (endpoints) pro MealAssignment.
const router = express.Router();

// Načítám controller pro MealAssignment – obsahuje funkce, které se volají, když uživatel pošle požadavek na API.
const mealAssignmentController = require("../controllers/mealAssignmentController");

// 🛠️ Definice cest:
// Když přijde požadavek PUT (aktualizace) na adresu "/updateDelete", zavolá se funkce updateOrDeleteMeal z controlleru.
router.put("/updateDelete", mealAssignmentController.updateOrDeleteMeal);

// Když přijde požadavek DELETE (smazání) na stejnou adresu "/updateDelete", zavolá se úplně ta stejná funkce.
// Je to proto, že v controlleru je logika, která se rozhoduje podle "action" (jestli má aktualizovat nebo mazat).
router.delete("/updateDelete", mealAssignmentController.updateOrDeleteMeal);

// Exportuju tento router, aby se dal použít v hlavním souboru aplikace (app.js nebo server.js).
module.exports = router;
