// Načítám Express – backendový framework, který mi umožňuje vytvářet API.
const express = require("express");

// Vytvářím novou instanci routeru – tady definuju všechny cesty (endpoints) pro WeeklyPlan.
const router = express.Router();

// Načítám controller pro WeeklyPlan – obsahuje funkce, které se volají, když uživatel pošle požadavek na API.
const weeklyPlanController = require("../controllers/weeklyPlanController");

// 🛠️ Definice cest (endpoints):
// Když přijde požadavek POST (vytvoření) na adresu "/create", zavolá se funkce createWeeklyPlan z controlleru.
router.post("/create", weeklyPlanController.createWeeklyPlan);

// Když přijde požadavek GET (načtení všech plánů) na adresu "/getAll", zavolá se funkce getAllWeeklyPlans.
router.get("/getAll", weeklyPlanController.getAllWeeklyPlans);

// Když přijde požadavek PUT (aktualizace) na adresu "/setFavourite", zavolá se funkce setFavouriteWeeklyPlan.
// Tato funkce nastaví, jestli je plán oblíbený nebo ne.
router.put("/setFavourite", weeklyPlanController.setFavouriteWeeklyPlan);

// Exportuju tento router, aby se dal použít v hlavním souboru aplikace (app.js nebo server.js).
module.exports = router;
