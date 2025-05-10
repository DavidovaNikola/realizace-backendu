<<<<<<< HEAD
# 🗂️ Realizace Backendu - Weekly Plan API  

---

## 🚀 Spuštění aplikace
- Spouštím aplikaci příkazem:
  - `npx nodemon app.js` (automatický restart při změně kódu)
  - nebo: `node app.js` (bez restartu při změnách)
- API běží na: `http://localhost:3000`
=======
Struktura složek
>>>>>>> 121f004f9e2d9a52e85b08f4b5bdb5a174c8e8a8

---

## 🛣️ Routy  
- `/weeklyPlan/create` → Vytvoření nového týdenního plánu (POST)
- `/weeklyPlan/getAll` → Načtení všech existujících plánů (GET)
- `/weeklyPlan/setFavourite` → Nastavení plánu jako oblíbený nebo zrušení oblíbenosti(PUT)

---

## 🗄️ Struktura projektu  
- **controllers/** → Obsahuje logiku zpracování požadavků (Controllers)
- **dao/** → Obsahuje funkce pro čtení a zápis do JSON databáze (Data Access Object)
- **routes/** → Definuje jednotlivé cesty API (Routes)
- **app.js** → Hlavní vstupní bod aplikace
- **weeklyPlanDatabase.json** → Místo, kde se ukládají všechny plány

---

## 🔎 Poznámky
- JSON databáze je uložená ve složce `dao/`.
- Když databázový soubor neexistuje, vytvoří se automaticky prázdný.
- CRUD operace (Create, Read, Update, Delete) jsou v `weeklyPlanDao.js`.
- Když přidám novou funkci do DAO, musím ji **exportovat** v `module.exports`.
- Pokud se mi něco neukládá, zkontroluju, jestli mám:
  - Správnou cestu k JSON souboru (`./dao/weeklyPlanDatabase.json`)
  - Restartovaný server (`npx nodemon app.js` nebo `node app.js`)