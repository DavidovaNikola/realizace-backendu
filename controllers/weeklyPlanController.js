// Načítám WeeklyPlanDao z cesty "../dao/weeklyPlanDao" – tady mám všechny funkce, které mi pomáhají pracovat s databází.
const weeklyPlanDao = require("../dao/weeklyPlanDao");

/**
 * Funkce createWeeklyPlan vytvoří nový týdenní plán.
 * Očekává v requestu (req.body) název plánu (name).
 */
exports.createWeeklyPlan = (req, res) => {
  // Z requestu (req.body) si vytahuju jméno plánu.
  const { name } = req.body;

  // Kontrola, jestli jméno existuje a jestli je typu string.
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      error: "dtoInIsNotValid", // Chyba – špatný vstup.
      message: "Name is required and must be a string." // Text chyby.
    });
  }

  // Vytvářím nový objekt plánu – generuju náhodné ID, nastavuju name, oblíbenost na false a prázdný seznam jídel.
  const newWeeklyPlan = {
    id: Math.random().toString(36).substr(2, 9), // Generuju náhodné ID – čistě náhodná hodnota.
    name,                                       // Jméno plánu, které jsem dostala v requestu.
    isFavourite: false,                          // Nastavuju defaultně, že není oblíbený.
    meals: []                                    // Pole s jídly – zatím prázdné.
  };

  // Ukládám nový plán do databáze pomocí funkce create.
  weeklyPlanDao.create(newWeeklyPlan);

  // Vrátím odpověď s kódem 201 (Created) a celý nový plán v JSON formátu.
  return res.status(201).json(newWeeklyPlan);
};

/**
 * Funkce getAllWeeklyPlans načte všechny týdenní plány z databáze.
 */
exports.getAllWeeklyPlans = (req, res) => {
  // Z weeklyPlanDao načtu všechny plány.
  const plans = weeklyPlanDao.getAll();

  // Vrátím je v odpovědi s kódem 200 (OK).
  res.status(200).json(plans);
};

/**
 * Funkce setFavouriteWeeklyPlan nastaví status "Favourite" (oblíbený) pro daný plán.
 * Očekává v requestu ID plánu a hodnotu isFavourite (true/false).
 */
exports.setFavouriteWeeklyPlan = (req, res) => {
  // Z requestu (req.body) si vytahuju ID plánu a boolean, jestli je oblíbený.
  const { weeklyPlanId, isFavourite } = req.body;

  // Kontroluju, jestli obě hodnoty jsou platné (weeklyPlanId existuje a isFavourite je boolean).
  if (!weeklyPlanId || typeof isFavourite !== "boolean") {
    return res.status(400).json({
      error: "dtoInIsNotValid", // Chyba – špatný vstup.
      message: "weeklyPlanId and isFavourite are required." // Text chyby.
    });
  }

  // Načtu plán z databáze podle ID.
  const weeklyPlan = weeklyPlanDao.getById(weeklyPlanId);

  // Pokud plán neexistuje, vrátím chybu 404 (Not Found).
  if (!weeklyPlan) {
    return res.status(404).json({
      error: "PlanNotFound", // Chyba – plán nebyl nalezen.
      message: "Weekly plan not found." // Text chyby.
    });
  }

  // Pokud jsem plán našla, nastavím jeho oblíbenost podle hodnoty isFavourite z requestu.
  weeklyPlan.isFavourite = isFavourite;

  // Uložím změnu do databáze pomocí funkce update.
  weeklyPlanDao.update(weeklyPlan);

  // Vrátím odpověď s kódem 200 (OK) a zprávou o úspěšné aktualizaci.
  return res.status(200).json({
    message: "Favourite status updated successfully.", // Zpráva, že to proběhlo v pohodě.
    plan: weeklyPlan // Vrátím zpátky celý plán, aby bylo vidět, že se to opravdu změnilo.
  });
};
