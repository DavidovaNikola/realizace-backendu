const mealAssignmentDao = require("../dao/mealAssignmentDao");

// Funkce pro úpravu nebo smazání jídla
exports.updateOrDeleteMeal = (req, res) => {
  const { id, updatedMealData } = req.body; // vytáhneme ID a nová data

  if (!id) {
    // Pokud nemáme ID jídla, vracíme chybu
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Meal ID is required."
    });
  }

  if (updatedMealData) {
    // Pokud máme nová data, aktualizujeme jídlo
    mealAssignmentDao.update(id, updatedMealData);
    return res.status(200).json({ message: "Meal updated successfully." });
  } else {
    // Pokud nejsou nová data, smažeme jídlo
    mealAssignmentDao.delete(id);
    return res.status(200).json({ message: "Meal deleted successfully." });
  }
};
