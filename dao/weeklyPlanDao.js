// Načítám knihovnu "fs" (File System) – umožňuje mi pracovat se soubory v Node.js.
const fs = require("fs");

// Cesta k souboru, kde mám uložené všechny týdenní plány. Pokud je ve složce dao, musím mít i "./dao/" v cestě.
const filePath = "./dao/weeklyPlanDatabase.json";

/**
 * Funkce readFromFile načítá data ze souboru.
 * Pokud soubor neexistuje, vytvoří nový prázdný JSON soubor s prázdným polem "[]".
 */
const readFromFile = () => {
  // Kontrola, jestli soubor existuje.
  if (!fs.existsSync(filePath)) {
    console.log("⚠️ Soubor neexistuje, vytvářím nový...");
    fs.writeFileSync(filePath, "[]"); // Pokud neexistuje, vytvořím ho a zapíšu prázdné pole "[]".
  }
  console.log("📂 Čtu data ze souboru: ", filePath);

  // Načítám obsah souboru (JSON) a převádím ho z textu do objektu pomocí JSON.parse.
  return JSON.parse(fs.readFileSync(filePath));
};

/**
 * Funkce writeToFile zapíše data do souboru.
 * @param {Array} data - Data, která chci uložit do souboru.
 */
const writeToFile = (data) => {
  console.log("💾 Zapisuji do souboru: ", filePath);
  console.log("📝 Data k zápisu: ", JSON.stringify(data, null, 2));

  // Převádím objekt na text (JSON string) a zapisuji do souboru.
  // "null, 2" znamená, že to bude hezky naformátované (odsazené).
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

/**
 * ✏️ Vytvoření nového plánu – přidám nový plán do souboru.
 * @param {Object} newPlan - Objekt nového plánu, který chci uložit.
 */
const create = (newPlan) => {
  // Načtu aktuální data z JSON souboru.
  const plans = readFromFile();

  // Přidám nový plán do načteného pole.
  plans.push(newPlan);

  // Uložím změny zpět do souboru.
  writeToFile(plans);
};

/**
 * ✏️ Načtu všechny plány z JSON souboru.
 * @returns {Array} - Vrátí pole všech plánů.
 */
const getAll = () => {
  // Načtu obsah souboru a vrátím ho jako pole objektů.
  return readFromFile();
};

/**
 * ✏️ Načtu jeden plán podle jeho ID.
 * @param {String} id - ID plánu, který chci načíst.
 * @returns {Object} - Vrátí plán, pokud existuje, jinak undefined.
 */
const getById = (id) => {
  // Načtu všechny plány z JSON souboru.
  const plans = readFromFile();

  // Najdu ten, který má stejné ID jako to, co hledám.
  return plans.find(plan => plan.id === id);
};

/**
 * ✏️ Aktualizace existujícího plánu
 * @param {Object} updatedPlan - Objekt plánu, který chci aktualizovat.
 */
const update = (updatedPlan) => {
  // Načtu všechny plány z JSON souboru.
  const plans = readFromFile();

  // Najdu index plánu, který chci aktualizovat podle ID.
  const index = plans.findIndex(plan => plan.id === updatedPlan.id);

  // Pokud plán existuje (index není -1), nahradím ho novým objektem.
  if (index !== -1) {
    plans[index] = updatedPlan;

    // Uložím změny zpět do souboru.
    writeToFile(plans);

    console.log(`✅ Weekly plan [${updatedPlan.id}] byl úspěšně aktualizován.`);
  } else {
    console.log("❌ Plán s tímto ID neexistuje.");
  }
};

/**
 * 📦 Export všech funkcí z tohoto souboru.
 */
module.exports = {
  create,
  getAll,
  getById,
  update
};


/**


/*
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'weeklyPlans.json');

// Načtení dat
const loadData = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

// Uložení dat
const saveData = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing file:", error);
  }
};

// CRUD operace
module.exports = {
  getAllPlans: () => loadData(),

  getPlanById: (id) => loadData().find((plan) => plan.id === id),

  addPlan: (newPlan) => {
    const plans = loadData();
    plans.push(newPlan);
    saveData(plans);
  },

  updatePlan: (id, updatedPlan) => {
    const plans = loadData();
    const index = plans.findIndex((plan) => plan.id === id);
    if (index !== -1) {
      plans[index] = { ...plans[index], ...updatedPlan };
      saveData(plans);
    }
  },

  deletePlan: (id) => {
    const plans = loadData().filter((plan) => plan.id !== id);
    saveData(plans);
  }
};

*/
