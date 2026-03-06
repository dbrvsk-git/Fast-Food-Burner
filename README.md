# 🔥 Fast Food Burner Kalkulačka

Interaktivní React aplikace pro výpočet kalorií z oblíbených fast foodů a vizualizaci, jak dlouho je budeš spalovat při různých sportech.

---

## ✨ Funkce

- **7 fast foodů v jedné aplikaci** — KFC, McDonald's, Popeyes, Five Guys, Bageterie Boulevard a Starbucks
- **Kombinování položek napříč řetězci** — přidej si Big Mac od McDonalda i Frappuccino ze Starbucks do jednoho výběru
- **Starbucks velikosti** — výběr velikosti nápoje (Short / Tall / Grande / Venti) přímo u každé položky
- **Počet porcí** — u každé vybrané položky lze nastavit množství (1–20 ks)
- **Kalkulačka spalování** — zadej svoji váhu a zobraz, jak dlouho bys musel běhat, jezdit na kole, plavat, cvičit v posilovně nebo chodit pěšky, abys kalorie spálil
- **Barevné indikátory** — přehledný progress bar ukazuje náročnost spalování
- **Responzivní design** — na mobilu se záložky zobrazují jako grid (3 × 2), na desktopu jako řada

---

## 📸 Přehled fast foodů a zdrojů dat

| Fast food | Zdroj dat |
|---|---|
| 🍗 KFC | Oficiální CZ nutriční PDF |
| 🍔 McDonald's | Oficiální CZ nutriční tabulka |
| 🌶️ Popeyes | Oficiální CZ PDF |
| 🍟 Five Guys | Oficiální CZ nutriční tabulka |
| 🥖 Bageterie Boulevard | Oficiální CZ nutriční tabulka |
| ☕ Starbucks | PL nutriční PDF (Autumn 2024), polotučné mléko 1,5% |

---

## 🚀 Spuštění projektu

### Požadavky

- Node.js 18+
- npm nebo yarn

### Instalace

```bash
git clone https://github.com/tvuj-username/fastfood-burner.git
cd fastfood-burner
npm install
```

### Spuštění vývojového serveru

```bash
npm run dev
```

Aplikace běží na [http://localhost:5173](http://localhost:5173)

### Build pro produkci

```bash
npm run build
```

---

## 🛠️ Technologie

- **React** — funkcionální komponenty, hooks (`useState`, `useMemo`)
- **Vite** — build tool a dev server
- Žádné externí UI knihovny — čistý inline CSS

---

## 📁 Struktura projektu

```
src/
└── App.jsx       # Celá aplikace v jednom souboru
                  # — data všech fast foodů (BRANDS)
                  # — logika výběru, počtu porcí a velikostí
                  # — výpočet spalování dle MET hodnot
                  # — renderování UI
```

---

## ⚙️ Jak funguje výpočet spalování

Kalorie za minutu se počítají pomocí standardního **MET vzorce**:

```
kcal/min = (MET × váha_kg × 3.5) / 200
```

| Sport | MET hodnota |
|---|---|
| 🏃 Běh | 9.8 |
| 🚴 Cyklistika | 7.5 |
| 🏊 Plavání | 8.0 |
| 🏋️ Posilovna | 6.0 |
| 🚶 Chůze | 3.5 |

> Výpočet je orientační a závisí na intenzitě cvičení, věku a kondici.

---

## 📝 Licence

MIT
