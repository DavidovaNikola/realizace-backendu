// Načítám WeeklyPlanDao z cesty "../dao/weeklyPlanDao" – tady mám všechny funkce, které mi pomáhají pracovat s databází.
const weeklyPlanDao = require("../dao/weeklyPlanDao");

// Exportuju funkci updateOrDeleteMeal, která se bude používat pro aktualizaci nebo smazání jídla z týdenního plánu.
exports.updateOrDeleteMeal = (req, res) => {
  // Z requestu (req.body) si vytahuju potřebné informace – ID plánu, den, typ jídla, ID jídla a akci, co chci udělat.
  const { weeklyPlanId, day, mealType, mealId, action } = req.body;

  // Kontroluju, jestli všechny tyhle informace mám – pokud ne, vrátím chybu 400 (Bad Request) a zprávu, že chybí data.
  if (!weeklyPlanId || !day || !mealType || !mealId || !action) {
    return res.status(400).json({
      error: "dtoInIsNotValid", // Chyba – něco chybí v datech.
      message: "All fields are required." // Text chyby, který se vrátí klientovi.
    });
  }

  // Načtu si z databáze týdenní plán podle ID, které jsem dostala z requestu.
  const weeklyPlan = weeklyPlanDao.getById(weeklyPlanId);

  // Když ten plán neexistuje (třeba špatné ID), vrátím chybu 404 (Not Found).
  if (!weeklyPlan) {
    return res.status(404).json({
      error: "PlanNotFound", // Chyba – plán nebyl nalezen.
      message: "Weekly plan not found." // Text chyby, který se vrátí klientovi.
    });
  }

  // Pokud je v requestu akce "update", znamená to, že chci přidat nové jídlo do plánu.
  if (action === "update") {
    weeklyPlan.meals.push({
      day,       // Den, ke kterému to jídlo patří (např. pondělí, úterý...).
      mealType,  // Typ jídla (snídaně, oběd, večeře...).
      mealId     // ID jídla – tím se to propojí s databází jídel.
    });
  } 
  // Pokud je akce "delete", znamená to, že chci jídlo smazat z plánu.
  else if (action === "delete") {
    // Použiju filter, který projde všechny položky v poli "meals" a nechá tam jen ty, které nemají stejné ID, jako to, co chci smazat.
    weeklyPlan.meals = weeklyPlan.meals.filter(
      (meal) => meal.mealId !== mealId // Projde každé jídlo a pokud má stejné ID, vyřadí ho ze seznamu.
    );
  }

  // Aktualizuju plán v databázi – zavolám update z weeklyPlanDao a pošlu mu celý objekt weeklyPlan, aby se uložil.
  weeklyPlanDao.update(weeklyPlan);

  // Nakonec vrátím odpověď s kódem 200 (OK) a informací, že to proběhlo úspěšně.
  return res.status(200).json({
    message: "Meal assignment updated successfully.", // Zpráva, že se to povedlo.
    plan: weeklyPlan // Vrátím zpátky celý plán, aby bylo vidět, jak vypadá po změně.
  });
};
