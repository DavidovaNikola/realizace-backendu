const express = require("express");
const router = express.Router();
const mealAssignmentController = require("../controllers/mealAssignmentController");

// Cesta /mealAssignment/updateDelete
router.post("/updateDelete", mealAssignmentController.updateOrDeleteMeal);

module.exports = router;
