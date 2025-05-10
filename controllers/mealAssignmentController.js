// Načítám WeeklyPlanDao z cesty "../dao/weeklyPlanDao" – tady mám všechny funkce, které mi pomáhají pracovat s databází.
const weeklyPlanDao = require("../dao/weeklyPlanDao");

// Definujeme si povolené hodnoty pro validaci
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const mealTypes = ["Breakfast", "Lunch", "Dinner"];
const actions = ["update", "delete"];

// Exportuju funkci updateOrDeleteMeal, která se bude používat pro aktualizaci nebo smazání jídla z týdenního plánu.
exports.updateOrDeleteMeal = (req, res) => {
  console.log("✅ Request dorazil do updateOrDeleteMeal");

  // Z requestu (req.body) si vytahuju potřebné informace – ID plánu, den, typ jídla, ID jídla a akci, co chci udělat.
  const { weeklyPlanId, day, mealType, mealId, action } = req.body;

  // ✅ Kontrola, jestli všechny tyhle informace mám – pokud ne, vrátím chybu 400 (Bad Request) a zprávu, že chybí data.
  if (!weeklyPlanId || !day || !mealType || !mealId || !action) {
    console.log("❌ Chybí povinné údaje");
    return res.status(400).json({
      error: "dtoInIsNotValid", // Chyba – něco chybí v datech.
      message: "All fields are required." // Text chyby, který se vrátí klientovi.
    });
  }

  // ✅ Validace, jestli den je správně
  if (!daysOfWeek.includes(day)) {
    console.log("❌ Špatný den v týdnu");
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Invalid day. Allowed values: " + daysOfWeek.join(", ")
    });
  }

  // ✅ Validace, jestli mealType je správně
  if (!mealTypes.includes(mealType)) {
    console.log("❌ Špatný typ jídla");
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Invalid meal type. Allowed values: " + mealTypes.join(", ")
    });
  }

  // ✅ Validace, jestli action je správná
  if (!actions.includes(action)) {
    console.log("❌ Špatná akce");
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Invalid action. Allowed values: " + actions.join(", ")
    });
  }

  console.log("✅ Validace prošla, načítám weekly plan...");

  // Načtu si z databáze týdenní plán podle ID, které jsem dostala z requestu.
  const weeklyPlan = weeklyPlanDao.getById(weeklyPlanId);

  if (!weeklyPlan) {
    console.log("❌ Plán nenalezen");
    return res.status(404).json({
      error: "PlanNotFound",
      message: "Weekly plan not found."
    });
  }

  console.log("✅ Plán nalezen: ", weeklyPlan);

  // Pokud je v requestu akce "update", znamená to, že chci přidat nové jídlo do plánu.
  if (action === "update") {
    console.log("✅ Provádím update...");
    weeklyPlan.meals.push({
      day,       // Den, ke kterému to jídlo patří (např. pondělí, úterý...).
      mealType,  // Typ jídla (snídaně, oběd, večeře...).
      mealId     // ID jídla – tím se to propojí s databází jídel.
    });

    console.log("✅ Update hotov, ukládám plán do databáze...");
    weeklyPlanDao.update(weeklyPlan);

    return res.status(200).json({
      message: "Meal assignment updated successfully.",
      weeklyPlanId,
      day,
      mealType,
      mealId
    });

  } 
  // Pokud je akce "delete", znamená to, že chci jídlo smazat z plánu.
  else if (action === "delete") {
    console.log("✅ Provádím delete...");
    weeklyPlan.meals = weeklyPlan.meals.filter(
      (meal) => meal.mealId !== mealId
    );

    console.log("✅ Delete hotov, ukládám plán do databáze...");
    weeklyPlanDao.update(weeklyPlan);

    return res.status(200).json({
      message: "Meal assignment deleted successfully.",
      weeklyPlanId,
      day,
      mealType
    });
  }
};
