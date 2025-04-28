const weeklyPlanDao = require("../dao/weeklyPlanDao");

// Funkce pro vytvoření nového týdenního plánu
exports.createWeeklyPlan = (req, res) => {
  const { name } = req.body; // z těla požadavku si vytáhnu jméno plánu

  // VALIDACE vstupu
  if (!name || typeof name !== "string") {
    // Pokud není jméno nebo není text, vrátíme chybu
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Name is required and must be a string."
    });
  }

  // Vytvoříme nový plán
  const newWeeklyPlan = {
    id: generateId(), // náhodné ID
    name,
    isFavourite: false // nové plány nejsou oblíbené hned
  };

  // Uložíme do "databáze"
  weeklyPlanDao.create(newWeeklyPlan);

  // Vrátíme nový plán jako odpověď
  return res.status(201).json(newWeeklyPlan);
};

// Funkce pro vygenerování náhodného ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Funkce pro nastavení plánu jako oblíbeného
exports.setFavourite = (req, res) => {
    const { id, isFavourite } = req.body;
  
    if (!id || typeof isFavourite !== "boolean") {
      return res.status(400).json({
        error: "dtoInIsNotValid",
        message: "Plan ID and isFavourite flag are required."
      });
    }
  
    // Najdeme plán podle ID
    const plan = weeklyPlanDao.getById(id);
    if (!plan) {
      return res.status(404).json({ error: "PlanNotFound", message: "Plan not found." });
    }
  
    // Nastavíme oblíbenost
    plan.isFavourite = isFavourite;
    weeklyPlanDao.update(plan);
  
    return res.status(200).json(plan);
  };
  


  // Funkce pro získání jednoho plánu
exports.getWeeklyPlan = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Plan ID is required."
    });
  }

  const plan = weeklyPlanDao.getById(id);
  if (!plan) {
    return res.status(404).json({ error: "PlanNotFound", message: "Plan not found." });
  }

  return res.status(200).json(plan);
};



// weeklyPlanController.js

// Funkce pro získání jednoho plánu
exports.getWeeklyPlan = (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({
        error: "dtoInIsNotValid",
        message: "Plan ID is required."
      });
    }
  
    const plan = weeklyPlanDao.getById(id);
    if (!plan) {
      return res.status(404).json({ error: "PlanNotFound", message: "Plan not found." });
    }
  
    return res.status(200).json(plan);
  };
  