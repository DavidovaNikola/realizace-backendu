Struktura složek

controllers/ – soubory, kde bude napsaná hlavní logika pro jednotlivé operace (např. vytvoření plánu, úprava jídel...).

- dao/ – zde budou funkce na práci s daty, jako je vytvoření, načtení, úprava nebo smazání záznamu.

- routes/ – nastavení jednotlivých cest v aplikaci (např. /weeklyPlan/create).

- validation/ – soubory pro kontrolu správnosti vstupních dat (DTOIn).

- models/ – zatím prázdné, připraveno pro případné datové modely.

- node_modules/ – složka s balíčky nainstalovanými přes npm.

Jak spustit projekt

Otevřít terminál ve složce projektu.

Spustit příkaz npm install – tím se nainstalují všechny potřebné balíčky.

Spustit příkaz npm start – tím se spustí server.

Server běží na adrese http://localhost:3000/.

Poznámky

a/ Backend zatím obsahuje jen základní připravenou strukturu bez plné logiky.

b/ Validace vstupních dat je připravená přes jednoduché DTOIn soubory.

c/ Připojení k databázi zatím není implementováno, data by zatím byla jen v paměti.

d/ Projekt je připraven na další rozšíření (dopsání DAO metod, Controllers a propojení s frontendem).


    
## Main Endpoints

- POST `/weeklyPlan/create`
- PUT `/mealAssignment/updateDelete`
- PUT `/weeklyPlan/setFavourite`
- GET `/weeklyPlan/get`
