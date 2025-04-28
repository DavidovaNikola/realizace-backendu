const express = require("express");
const router = express.Router();
const weeklyPlanController = require("../controllers/weeklyPlanController");

// Route = cesta /weeklyPlan/create
router.post("/create", weeklyPlanController.createWeeklyPlan);

module.exports = router;



// Přidáme k existujícímu routeru -  weeklyPlan/setFavourite
router.post("/setFavourite", weeklyPlanController.setFavourite);



// Přidáme k existujícímu routeru - weeklyPlan/get - Zobrazení celého plánu)
router.get("/get/:id", weeklyPlanController.getWeeklyPlan);
