import { useState, useMemo } from "react";

// sizes: [{l: label, k: kcal}]
// mleko 1,5% = polotučné mléko (výchozí)
const BRANDS = {
  KFC: {
    label: "KFC",
    emoji: "🍗",
    color: "#c8102e",
    light: "#fff0f0",
    categories: {
      "Kuřecí kousky Kentucky": [
        { name: "Nožička", kcal: 169 },
        { name: "Prsa", kcal: 236 },
        { name: "Žebra", kcal: 310 },
        { name: "Stehno", kcal: 276 },
        { name: "Křídlo", kcal: 189 },
        { name: "Grander", kcal: 271 },
      ],
      "Kuřecí kousky": [
        { name: "Hot & Spicy Strips (1 ks)", kcal: 92 },
        { name: "Hot Wings (1 ks)", kcal: 114 },
        { name: "Hot & Spicy Bites standard", kcal: 594 },
        { name: "Hot & Spicy Bites grande", kcal: 990 },
      ],
      "Sendviče & Wrappy": [
        { name: "Zinger", kcal: 445 },
        { name: "Zinger Double", kcal: 590 },
        { name: "Grander Texas", kcal: 756 },
        { name: "Kentucky Gold Grander", kcal: 842 },
        { name: "Kentucky Gold Wrapper", kcal: 1197 },
        { name: "Twister Classic", kcal: 579 },
        { name: "iTwist Classic", kcal: 350 },
        { name: "Twister se sýrem a slaninou", kcal: 622 },
        { name: "Halloumi Twister", kcal: 697 },
        { name: "Qurrito", kcal: 692 },
        { name: "Longer", kcal: 309 },
        { name: "Cheeseburger", kcal: 309 },
        { name: "Kentucky Hot Dog Classic", kcal: 588 },
        { name: "Teriyaki Katsu Sando", kcal: 689 },
      ],
      "Rýže & Poké Bowly": [
        { name: "Poké Bowl Rýže + Bites", kcal: 435 },
        { name: "Poké Bowl Rýže + Halloumi", kcal: 407 },
        { name: "Rýže s Bites Std Sweet Chilli", kcal: 697 },
        { name: "Rýže s Bites Grande Sweet Chilli", kcal: 884 },
        { name: "Rýže s Bites Std Teriyaki", kcal: 476 },
      ],
      Přílohy: [
        { name: "Hranolky malé", kcal: 202 },
        { name: "Hranolky velké", kcal: 290 },
        { name: "Kyblík hranolků", kcal: 605 },
        { name: "Bramborové lupínky malé", kcal: 292 },
        { name: "Cibulové kroužky", kcal: 288 },
        { name: "Salát Coleslaw", kcal: 141 },
        { name: "Kukuřice s máslem", kcal: 168 },
      ],
      "Omáčky & Dipy": [
        { name: "Sweet chilli", kcal: 43 },
        { name: "BBQ", kcal: 26 },
        { name: "Česneková", kcal: 108 },
        { name: "Tatarská", kcal: 88 },
        { name: "Kečup", kcal: 31 },
      ],
      "Dezerty & Nápoje": [
        { name: "Brownie slaný karamel", kcal: 355 },
        { name: "Churros (1 ks)", kcal: 132 },
        { name: "Shake jahodový malý", kcal: 234 },
        { name: "Shake čokoládový malý", kcal: 326 },
        { name: "Shake karamelový malý", kcal: 279 },
        { name: "Shake vanilkový malý", kcal: 216 },
        { name: "Pepsi 300ml", kcal: 84 },
        { name: "Cappuccino", kcal: 52 },
      ],
      Snídaně: [
        { name: "Snídaňové Qurrito s vejcem a slaninou", kcal: 548 },
        { name: "Snídaňový talíř", kcal: 538 },
        { name: "Snídaňová brioška", kcal: 399 },
        { name: "Avokádový toast", kcal: 328 },
        { name: "Toast se slaninou a sýrem", kcal: 304 },
      ],
    },
  },
  MCD: {
    label: "McDonald's",
    emoji: "🍔",
    color: "#DA291C",
    light: "#fff9e6",
    categories: {
      "Hovězí burgery": [
        { name: "Hamburger", kcal: 242 },
        { name: "Cheeseburger", kcal: 300 },
        { name: "Big Mac", kcal: 508 },
        { name: "Double Big Mac", kcal: 726 },
        { name: "McRoyal", kcal: 497 },
        { name: "McRoyal Bacon", kcal: 560 },
        { name: "Quarter Pounder with Cheese", kcal: 520 },
      ],
      "Kuřecí & ryby": [
        { name: "McChicken", kcal: 395 },
        { name: "Crispy McBacon", kcal: 500 },
        { name: "McNuggets 4 ks", kcal: 193 },
        { name: "McNuggets 6 ks", kcal: 289 },
        { name: "McNuggets 9 ks", kcal: 434 },
        { name: "McNuggets 20 ks", kcal: 963 },
        { name: "McWrap Classic", kcal: 430 },
        { name: "Filet-O-Fish", kcal: 328 },
      ],
      Přílohy: [
        { name: "Hranolky malé", kcal: 224 },
        { name: "Hranolky střední", kcal: 337 },
        { name: "Hranolky velké", kcal: 444 },
        { name: "Salát Coleslaw", kcal: 107 },
      ],
      "Dezerty & Nápoje": [
        { name: "McFlurry Oreo", kcal: 340 },
        { name: "Apple Pie", kcal: 253 },
        { name: "McShake jahodový malý", kcal: 264 },
        { name: "McShake čokoládový malý", kcal: 295 },
        { name: "McShake vanilkový malý", kcal: 260 },
        { name: "Coca-Cola 400ml", kcal: 168 },
        { name: "McCafé Cappuccino", kcal: 110 },
        { name: "McCafé Latte", kcal: 130 },
      ],
      Snídaně: [
        { name: "Egg McMuffin", kcal: 300 },
        { name: "Sausage McMuffin", kcal: 400 },
        { name: "Sausage McMuffin with Egg", kcal: 470 },
        { name: "Palačinky", kcal: 340 },
      ],
    },
  },
  POPEYES: {
    label: "Popeyes",
    emoji: "🌶️",
    color: "#f26522",
    light: "#fff5ee",
    categories: {
      "Signature Chicken": [
        { name: "Classic Signature Chicken 1 ks", kcal: 690 },
        { name: "Classic Signature Chicken 2 ks", kcal: 1035 },
        { name: "Classic Signature Chicken 5 ks", kcal: 1725 },
      ],
      Wings: [
        { name: "Classic Wings 3 ks", kcal: 440 },
        { name: "Classic Wings 5 ks", kcal: 733 },
        { name: "Classic Wings 8 ks", kcal: 1172 },
        { name: "Voodoo Wings 3 ks", kcal: 546 },
        { name: "Bold BBQ Wings 3 ks", kcal: 466 },
        { name: "Garlic & Parmesan Wings 3 ks", kcal: 603 },
        { name: "Swing Onion Wings 3 ks", kcal: 630 },
      ],
      "Chicken Tenders": [
        { name: "Classic Tenders 3 ks", kcal: 482 },
        { name: "Classic Tenders 5 ks", kcal: 803 },
        { name: "Spicy Tenders 3 ks", kcal: 441 },
        { name: "Spicy Tenders 5 ks", kcal: 734 },
      ],
      "Fillet Nuggets": [
        { name: "Classic Nuggets 3 ks", kcal: 242 },
        { name: "Classic Nuggets 5 ks", kcal: 404 },
        { name: "Classic Nuggets 8 ks", kcal: 646 },
        { name: "Voodoo Nuggets 3 ks", kcal: 278 },
        { name: "Garlic & Parmesan Nuggets 3 ks", kcal: 329 },
      ],
      "Sendviče & Wrappy": [
        { name: "Chicken Sandwich", kcal: 715 },
        { name: "Spicy Chicken Sandwich", kcal: 713 },
        { name: "Chicken Sandwich Deluxe", kcal: 753 },
        { name: "Voodoo Chicken Sandwich", kcal: 808 },
        { name: "Classic Chicken Wrap", kcal: 703 },
        { name: "Classic Mini Wrap", kcal: 388 },
      ],
      "Přílohy & Dipy": [
        { name: "Střední hranolky", kcal: 317 },
        { name: "Velké hranolky", kcal: 444 },
        { name: "Cajun Fries střední", kcal: 299 },
        { name: "Coleslaw", kcal: 188 },
        { name: "Bold BBQ Dip", kcal: 45 },
        { name: "Česnekový dip", kcal: 85 },
      ],
      "Dezerty & Shakes": [
        { name: "New Orleans Beignets 3 ks", kcal: 393 },
        { name: "New Orleans Beignets 5 ks", kcal: 653 },
        { name: "Vanilkový Shake malý", kcal: 306 },
        { name: "Jahodový Shake malý", kcal: 312 },
        { name: "Čokoládový Shake malý", kcal: 318 },
        { name: "Lotus Biscoff Shake malý", kcal: 398 },
      ],
    },
  },
  FG: {
    label: "Five Guys",
    emoji: "🍟",
    color: "#cf1f25",
    light: "#fff0f0",
    categories: {
      Burgery: [
        { name: "Hovězí burger (1 patty + houska)", kcal: 433 },
        { name: "Hovězí burger (2 patty + houska)", kcal: 628 },
        { name: "Hot Dog + houska", kcal: 407 },
        { name: "Vegetariánský sendvič", kcal: 330 },
        { name: "Sýrový vegetariánský sendvič", kcal: 428 },
        { name: "Grilovaný sýr", kcal: 434 },
        { name: "BLT sendvič", kcal: 652 },
      ],
      "Přísady do burgeru": [
        { name: "Slanina (2 ks)", kcal: 76 },
        { name: "Sýr (1 plátek)", kcal: 64 },
        { name: "Grilované houby", kcal: 12 },
        { name: "Grilovaná cibule", kcal: 11 },
        { name: "Nakládané okurky", kcal: 3 },
        { name: "Jalapeños", kcal: 1 },
        { name: "Rajčata", kcal: 6 },
        { name: "Salát", kcal: 3 },
        { name: "Majonéza", kcal: 113 },
        { name: "Grilovací omáčka", kcal: 20 },
        { name: "Kečup", kcal: 14 },
        { name: "Hořčice", kcal: 5 },
      ],
      Hranolky: [
        { name: "Malé hranolky", kcal: 694 },
        { name: "Běžné hranolky", kcal: 1122 },
        { name: "Velké hranolky", kcal: 1491 },
      ],
      "Mléčné koktejly": [
        { name: "Základ mléčného koktejlu", kcal: 690 },
        { name: "Šlehačka", kcal: 88 },
        { name: "Banán", kcal: 158 },
        { name: "Jahody", kcal: 94 },
        { name: "Čokoláda", kcal: 184 },
        { name: "Arašídové máslo", kcal: 348 },
        { name: "Slaný karamel", kcal: 208 },
        { name: "Kousky sušenek Oreo", kcal: 120 },
        { name: "Lotus Biscoff", kcal: 145 },
      ],
    },
  },
  BB: {
    label: "Bageterie Blvd",
    emoji: "🥖",
    color: "#8B0000",
    light: "#fff5f0",
    categories: {
      Bagety: [
        { name: "Caesar", kcal: 487 },
        { name: "Caprese", kcal: 496 },
        { name: "Bruselská", kcal: 604 },
        { name: "Grilled Roastbeef", kcal: 493 },
        { name: "Sweet Ribs", kcal: 580 },
        { name: "Švýcarská", kcal: 520 },
        { name: "Sweet Chilli", kcal: 228 },
        { name: "Lososová", kcal: 366 },
        { name: "Tuňáková", kcal: 446 },
      ],
      Wrapy: [
        { name: "Losos wrap", kcal: 332 },
        { name: "Caesar wrap", kcal: 453 },
        { name: "Caprese wrap", kcal: 462 },
        { name: "Tuňák wrap", kcal: 378 },
        { name: "Grilled roastbeef wrap", kcal: 427 },
        { name: "Brusel wrap", kcal: 570 },
        { name: "Švýcar wrap", kcal: 460 },
        { name: "Sweet ribs wrap", kcal: 536 },
      ],
      Patatas: [
        { name: "Patatas s domácí tatarskou omáčkou", kcal: 339 },
        { name: "Patatas s kečupem Heinz", kcal: 201 },
        { name: "Patatas s pepřovou omáčkou Pepperfield", kcal: 276 },
        { name: "Patatas košík", kcal: 545 },
      ],
      Saláty: [
        { name: "Salát s kozím sýrem", kcal: 596 },
        { name: "Caesar salát", kcal: 456 },
        { name: "Zahradní salát malý", kcal: 25 },
      ],
      Polévky: [
        { name: "Tomatová s tymiánem", kcal: 55 },
        { name: "Karotková se zázvorem", kcal: 28 },
        { name: "Cibulová", kcal: 70 },
      ],
      "Dezerty & Nápoje": [
        { name: "Crêpe s Nutellou", kcal: 320 },
        { name: "Crêpe s ovocem", kcal: 270 },
        { name: "Ice Tea", kcal: 17 },
        { name: "Americano", kcal: 5 },
        { name: "Cappuccino", kcal: 95 },
        { name: "Latte", kcal: 120 },
      ],
    },
  },
  SBX: {
    label: "Starbucks",
    emoji: "☕",
    color: "#00704A",
    light: "#f0faf5",
    // Data: Starbucks PL PDF (Autumn 2024), polotučné mléko 1,5% tuku
    categories: {
      "Espresso — teplé": [
        {
          name: "Americano",
          sizes: [
            { l: "Short", k: 5 },
            { l: "Tall", k: 10 },
            { l: "Grande", k: 16 },
            { l: "Venti", k: 21 },
          ],
        },
        {
          name: "Cappuccino",
          sizes: [
            { l: "Short", k: 82 },
            { l: "Tall", k: 132 },
            { l: "Grande", k: 174 },
            { l: "Venti", k: 226 },
          ],
        },
        {
          name: "Caffè Latte",
          sizes: [
            { l: "Short", k: 65 },
            { l: "Tall", k: 120 },
            { l: "Grande", k: 139 },
            { l: "Venti", k: 193 },
          ],
        },
        {
          name: "Latte Macchiato",
          sizes: [
            { l: "Short", k: 82 },
            { l: "Tall", k: 132 },
            { l: "Grande", k: 174 },
            { l: "Venti", k: 226 },
          ],
        },
        {
          name: "Caramel Macchiato",
          sizes: [
            { l: "Short", k: 164 },
            { l: "Tall", k: 241 },
            { l: "Grande", k: 317 },
            { l: "Venti", k: 368 },
          ],
        },
        { name: "Flat White", sizes: [{ l: "Short", k: 92 }] },
        {
          name: "Mocha",
          sizes: [
            { l: "Short", k: 172 },
            { l: "Tall", k: 262 },
            { l: "Grande", k: 322 },
            { l: "Venti", k: 398 },
          ],
        },
        {
          name: "White Mocha",
          sizes: [
            { l: "Short", k: 188 },
            { l: "Tall", k: 286 },
            { l: "Grande", k: 364 },
            { l: "Venti", k: 454 },
          ],
        },
        {
          name: "Misto (Café au Lait)",
          sizes: [
            { l: "Short", k: 109 },
            { l: "Tall", k: 171 },
            { l: "Grande", k: 219 },
            { l: "Venti", k: 266 },
          ],
        },
        { name: "Espresso Doppio", sizes: [{ l: "Doppio", k: 10 }] },
        { name: "Espresso Single", sizes: [{ l: "Single", k: 5 }] },
        { name: "Cortado", sizes: [{ l: "Short", k: 56 }] },
        {
          name: "Hot White Chocolate",
          sizes: [
            { l: "Short", k: 199 },
            { l: "Tall", k: 294 },
            { l: "Grande", k: 374 },
            { l: "Venti", k: 448 },
          ],
        },
        {
          name: "Classic Hot Chocolate",
          sizes: [
            { l: "Short", k: 187 },
            { l: "Tall", k: 278 },
            { l: "Grande", k: 342 },
            { l: "Venti", k: 385 },
          ],
        },
      ],
      "Espresso — ledové": [
        {
          name: "Iced Americano",
          sizes: [
            { l: "Tall", k: 10 },
            { l: "Grande", k: 16 },
            { l: "Venti", k: 21 },
          ],
        },
        {
          name: "Iced Caffè Latte",
          sizes: [
            { l: "Tall", k: 98 },
            { l: "Grande", k: 121 },
            { l: "Venti", k: 141 },
          ],
        },
        {
          name: "Iced Latte Macchiato",
          sizes: [
            { l: "Tall", k: 311 },
            { l: "Grande", k: 410 },
            { l: "Venti", k: 473 },
          ],
        },
        {
          name: "Iced Caramel Macchiato",
          sizes: [
            { l: "Tall", k: 151 },
            { l: "Grande", k: 187 },
            { l: "Venti", k: 222 },
          ],
        },
        {
          name: "Iced Mocha",
          sizes: [
            { l: "Tall", k: 275 },
            { l: "Grande", k: 363 },
            { l: "Venti", k: 414 },
          ],
        },
        {
          name: "Iced White Mocha",
          sizes: [
            { l: "Tall", k: 304 },
            { l: "Grande", k: 399 },
            { l: "Venti", k: 456 },
          ],
        },
        {
          name: "Classic Iced Cappuccino",
          sizes: [
            { l: "Tall", k: 88 },
            { l: "Grande", k: 117 },
            { l: "Venti", k: 143 },
          ],
        },
        {
          name: "Iced Brown Sugar Oat Shaken Espresso",
          sizes: [
            { l: "Tall", k: 163 },
            { l: "Grande", k: 221 },
            { l: "Venti", k: 297 },
          ],
        },
      ],
      "Cold Coffee & Nitro": [
        {
          name: "Cold Brew",
          sizes: [
            { l: "Tall", k: 10 },
            { l: "Grande", k: 16 },
            { l: "Venti", k: 21 },
          ],
        },
        {
          name: "Cold Brew Latte",
          sizes: [
            { l: "Tall", k: 99 },
            { l: "Grande", k: 131 },
            { l: "Venti", k: 163 },
          ],
        },
        {
          name: "Nitro Cold Brew",
          sizes: [
            { l: "Tall", k: 35 },
            { l: "Grande", k: 47 },
            { l: "Venti", k: 60 },
          ],
        },
        {
          name: "Nitro Latte",
          sizes: [
            { l: "Tall", k: 163 },
            { l: "Grande", k: 221 },
            { l: "Venti", k: 297 },
          ],
        },
        {
          name: "Nitro Cappuccino",
          sizes: [
            { l: "Tall", k: 59 },
            { l: "Grande", k: 81 },
            { l: "Venti", k: 114 },
          ],
        },
      ],
      Frappuccino: [
        {
          name: "Caramel Frappuccino",
          sizes: [
            { l: "Tall", k: 253 },
            { l: "Grande", k: 304 },
            { l: "Venti", k: 352 },
          ],
        },
        {
          name: "Mocha Frappuccino",
          sizes: [
            { l: "Tall", k: 264 },
            { l: "Grande", k: 349 },
            { l: "Venti", k: 399 },
          ],
        },
        {
          name: "White Mocha Frappuccino",
          sizes: [
            { l: "Tall", k: 290 },
            { l: "Grande", k: 381 },
            { l: "Venti", k: 435 },
          ],
        },
        {
          name: "Coffee Frappuccino",
          sizes: [
            { l: "Tall", k: 232 },
            { l: "Grande", k: 307 },
            { l: "Venti", k: 352 },
          ],
        },
        {
          name: "Java Chip Frappuccino",
          sizes: [
            { l: "Tall", k: 268 },
            { l: "Grande", k: 354 },
            { l: "Venti", k: 399 },
          ],
        },
        {
          name: "Matcha Crème Frappuccino",
          sizes: [
            { l: "Tall", k: 278 },
            { l: "Grande", k: 353 },
            { l: "Venti", k: 404 },
          ],
        },
      ],
      "Čaj & ostatní": [
        {
          name: "Freshly Brewed Coffee",
          sizes: [
            { l: "Short", k: 24 },
            { l: "Tall", k: 35 },
            { l: "Grande", k: 47 },
            { l: "Venti", k: 59 },
          ],
        },
        {
          name: "Chai Tea Latte",
          sizes: [
            { l: "Short", k: 120 },
            { l: "Tall", k: 179 },
            { l: "Grande", k: 237 },
            { l: "Venti", k: 294 },
          ],
        },
        {
          name: "Matcha Tea Latte",
          sizes: [
            { l: "Short", k: 166 },
            { l: "Tall", k: 250 },
            { l: "Grande", k: 313 },
            { l: "Venti", k: 368 },
          ],
        },
        {
          name: "London Fog Tea Latte",
          sizes: [
            { l: "Short", k: 107 },
            { l: "Tall", k: 188 },
            { l: "Grande", k: 229 },
            { l: "Venti", k: 296 },
          ],
        },
        {
          name: "Čaj (černý/zelený/ovocný)",
          sizes: [
            { l: "Tall", k: 0 },
            { l: "Grande", k: 0 },
            { l: "Venti", k: 0 },
          ],
        },
      ],
    },
  },
};

const SPORTS = [
  { id: "run", icon: "🏃", name: "Běh", met: 9.8 },
  { id: "bike", icon: "🚴", name: "Cyklistika", met: 7.5 },
  { id: "swim", icon: "🏊", name: "Plavání", met: 8.0 },
  { id: "gym", icon: "🏋️", name: "Posilovna", met: 6.0 },
  { id: "walk", icon: "🚶", name: "Chůze", met: 3.5 },
];

function fmtTime(m) {
  if (m < 1) return "< 1 min";
  const h = Math.floor(m / 60),
    min = Math.round(m % 60);
  if (!h) return `${min} min`;
  if (!min) return `${h} hod`;
  return `${h} hod ${min} min`;
}
function burnColor(m) {
  if (m < 30) return "#16a34a";
  if (m < 60) return "#d97706";
  if (m < 120) return "#dc2626";
  return "#7f1d1d";
}

export default function App() {
  const [weight, setWeight] = useState(70);
  const [activeBrand, setActiveBrand] = useState("KFC");
  const [openCat, setOpenCat] = useState(null);
  const [selected, setSelected] = useState({});
  const [qtys, setQtys] = useState({});
  const [sizeIdx, setSizeIdx] = useState({});

  const brand = BRANDS[activeBrand];

  const getKcal = (item, si) =>
    item.sizes ? item.sizes[si ?? 0].k : item.kcal;

  const totalKcal = useMemo(
    () =>
      Object.entries(selected).reduce((s, [k, v]) => s + v * (qtys[k] || 1), 0),
    [selected, qtys],
  );

  const selectedByBrand = useMemo(() => {
    const g = {};
    Object.entries(selected).forEach(([key, kcal]) => {
      const [b] = key.split("::");
      if (!g[b]) g[b] = [];
      g[b].push({ key, kcal });
    });
    return g;
  }, [selected]);

  const toggle = (key, item, si) => {
    // For sized items, require a size to be selected first
    if (item.sizes && si === null) return;
    const kcal = getKcal(item, si ?? 0);
    setSelected((p) => {
      const n = { ...p };
      if (n[key]) delete n[key];
      else n[key] = kcal;
      return n;
    });
    setQtys((p) => ({ ...p, [key]: p[key] || 1 }));
  };
  const setQty = (key, val) =>
    setQtys((p) => ({
      ...p,
      [key]: Math.max(1, Math.min(20, parseInt(val) || 1)),
    }));
  const updateSize = (key, item, si) => {
    setSizeIdx((p) => ({ ...p, [key]: si }));
    // Always update kcal in selected (or add if not yet selected)
    setSelected((p) => ({ ...p, [key]: getKcal(item, si) }));
    setQtys((q) => ({ ...q, [key]: q[key] || 1 }));
  };
  const burnMins = (met) =>
    totalKcal === 0 ? 0 : totalKcal / ((met * weight * 3.5) / 200);
  const total = Object.keys(selected).length;

  return (
    <div
      style={{
        background: "#f2f2f2",
        fontFamily: "'Segoe UI',sans-serif",
        color: "#111",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e8e8e8",
          padding: "12px 16px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>
          🔥 Fast Food Burner Kalkulačka
        </h1>
        <p style={{ margin: "3px 0 0", fontSize: 11, color: "#aaa" }}>
          Kombinuj jídla z různých fast foodů a zjisti, jak dlouho je budeš
          spalovat
        </p>
      </div>

      {/* Brand tabs */}
      <div
        style={{
          background: "#fff",
          borderBottom: "2px solid #e8e8e8",
          padding: "8px 8px 0",
        }}
      >
        <style>{`
          .brand-tabs {
            display: flex;
            overflow-x: auto;
            justify-content: center;
            gap: 4px;
          }
          .brand-tabs button {
            flex-shrink: 0;
            min-width: 76px;
          }
          @media (max-width: 600px) {
            .brand-tabs {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 4px;
              overflow-x: unset;
            }
            .brand-tabs button {
              min-width: 0;
              width: 100%;
            }
          }
        `}</style>
        <div className="brand-tabs">
          {Object.entries(BRANDS).map(([key, b]) => {
            const isActive = activeBrand === key;
            const cnt = Object.keys(selected).filter((k) =>
              k.startsWith(key + "::"),
            ).length;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveBrand(key);
                  setOpenCat(null);
                }}
                style={{
                  padding: "8px 12px 10px",
                  border: "none",
                  borderRadius: "8px 8px 0 0",
                  background: isActive ? b.light : "#f8f8f8",
                  color: isActive ? b.color : "#999",
                  fontWeight: 800,
                  fontSize: 18,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  position: "relative",
                  borderBottom: isActive
                    ? `3px solid ${b.color}`
                    : "3px solid #e8e8e8",
                  boxShadow: isActive ? "0 -1px 4px #0001" : "none",
                }}
              >
                <div style={{ fontSize: 22 }}>{b.emoji}</div>
                <div
                  style={{
                    fontSize: 16,
                    marginTop: 2,
                    lineHeight: 1.2,
                    fontWeight: "bold",
                    color: isActive ? b.color : "#777",
                  }}
                >
                  {b.label}
                </div>
                {cnt > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 3,
                      right: 3,
                      background: b.color,
                      color: "#fff",
                      borderRadius: 10,
                      padding: "0 4px",
                      fontSize: 9,
                      fontWeight: 700,
                      lineHeight: "14px",
                    }}
                  >
                    {cnt}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "10px 10px" }}>
        {/* Weight */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "11px 14px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 1px 3px #0001",
          }}
        >
          <span style={{ fontSize: 20 }}>⚖️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>
              Tvoje váha
            </div>
            <input
              type="range"
              min={40}
              max={150}
              value={weight}
              onChange={(e) => setWeight(+e.target.value)}
              style={{ width: "100%", accentColor: brand.color }}
            />
          </div>
          <div style={{ minWidth: 56, textAlign: "right" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: brand.color }}>
              {weight}
            </span>
            <span style={{ fontSize: 12, color: "#aaa" }}> kg</span>
          </div>
        </div>

        {/* Menu */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            marginBottom: 10,
            overflow: "hidden",
            boxShadow: "0 1px 3px #0001",
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid #f0f0f0",
              fontSize: 13,
              fontWeight: 700,
              color: brand.color,
            }}
          >
            {brand.emoji} Výběr — {brand.label}
            {activeBrand === "SBX" && (
              <span
                style={{
                  fontSize: 10,
                  color: "#aaa",
                  fontWeight: 400,
                  marginLeft: 8,
                }}
              >
                polotučné mléko 1,5%
              </span>
            )}
          </div>
          {Object.entries(brand.categories).map(([cat, items]) => {
            const selCount = items.filter(
              (i) => selected[`${activeBrand}::${i.name}`],
            ).length;
            const catKey = `${activeBrand}::${cat}`;
            const isOpen = openCat === catKey;
            return (
              <div key={cat}>
                <button
                  onClick={() => setOpenCat(isOpen ? null : catKey)}
                  style={{
                    width: "100%",
                    background: isOpen ? brand.light : "transparent",
                    border: "none",
                    borderBottom: "1px solid #f0f0f0",
                    color: "#111",
                    padding: "10px 14px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                    }}
                  >
                    {selCount > 0 && (
                      <span
                        style={{
                          background: brand.color,
                          color: "#fff",
                          borderRadius: 20,
                          padding: "1px 8px",
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      >
                        ✓{selCount}
                      </span>
                    )}
                    <span style={{ color: "#bbb" }}>{isOpen ? "▲" : "▼"}</span>
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "6px 8px 8px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 5,
                    }}
                  >
                    {items.map((item) => {
                      const k = `${activeBrand}::${item.name}`;
                      const active = !!selected[k];
                      const qty = qtys[k] || 1;
                      const hasSizes = !!item.sizes;
                      const si = sizeIdx[k] ?? null;
                      const curKcal = hasSizes
                        ? si !== null
                          ? item.sizes[si].k
                          : null
                        : item.kcal;
                      return (
                        <div
                          key={item.name}
                          onClick={() => !hasSizes && toggle(k, item, si)}
                          style={{
                            background: active ? brand.light : "#fafafa",
                            border: `2px solid ${active ? brand.color : "#eee"}`,
                            borderRadius: 8,
                            padding: "7px 9px",
                            cursor: hasSizes ? "default" : "pointer",
                            transition: "all 0.12s",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: "#111",
                              lineHeight: 1.3,
                            }}
                          >
                            {item.name}
                          </div>
                          {hasSizes ? (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                marginTop: 4,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 3,
                              }}
                            >
                              {item.sizes.map((s, idx) => {
                                const isSel = si === idx && active;
                                return (
                                  <button
                                    key={s.l}
                                    onClick={() => {
                                      if (isSel) {
                                        // deselect
                                        setSelected((p) => {
                                          const n = { ...p };
                                          delete n[k];
                                          return n;
                                        });
                                        setSizeIdx((p) => {
                                          const n = { ...p };
                                          delete n[k];
                                          return n;
                                        });
                                      } else {
                                        updateSize(k, item, idx);
                                      }
                                    }}
                                    style={{
                                      padding: "2px 6px",
                                      borderRadius: 4,
                                      border: `1px solid ${isSel ? brand.color : "#ddd"}`,
                                      background: isSel ? brand.color : "#fff",
                                      color: isSel ? "#fff" : "#666",
                                      fontSize: 10,
                                      cursor: "pointer",
                                      fontWeight: isSel ? 700 : 400,
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    {s.l}
                                    <br />
                                    <span style={{ fontSize: 9 }}>
                                      {s.k} kcal
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div
                              style={{
                                fontSize: 11,
                                color: active ? brand.color : "#bbb",
                                fontWeight: active ? 700 : 400,
                                marginTop: 1,
                              }}
                            >
                              {item.kcal} kcal
                            </div>
                          )}
                          {active && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                marginTop: 5,
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <button
                                onClick={() => setQty(k, qty - 1)}
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 4,
                                  border: `1px solid ${brand.color}`,
                                  background: "#fff",
                                  color: brand.color,
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  fontSize: 13,
                                  lineHeight: 1,
                                  padding: 0,
                                }}
                              >
                                −
                              </button>
                              <span
                                style={{
                                  fontWeight: 700,
                                  color: brand.color,
                                  minWidth: 16,
                                  textAlign: "center",
                                  fontSize: 12,
                                }}
                              >
                                {qty}
                              </span>
                              <button
                                onClick={() => setQty(k, qty + 1)}
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 4,
                                  border: `1px solid ${brand.color}`,
                                  background: "#fff",
                                  color: brand.color,
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  fontSize: 13,
                                  lineHeight: 1,
                                  padding: 0,
                                }}
                              >
                                +
                              </button>
                              <span
                                style={{
                                  fontSize: 10,
                                  color: "#999",
                                  marginLeft: 2,
                                }}
                              >
                                {curKcal !== null
                                  ? `${curKcal * qty} kcal`
                                  : ""}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {total > 0 && (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "12px 14px",
              marginBottom: 10,
              boxShadow: "0 1px 3px #0001",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700 }}>
                🧾 Tvůj výběr ({total})
              </span>
              <button
                onClick={() => {
                  setSelected({});
                  setQtys({});
                  setSizeIdx({});
                }}
                style={{
                  background: "#f5f5f5",
                  border: "none",
                  color: "#888",
                  padding: "3px 10px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                Vymazat vše
              </button>
            </div>
            {Object.entries(selectedByBrand).map(([bKey, items]) => {
              const b = BRANDS[bKey];
              if (!b) return null;
              const bTotal = items.reduce(
                (s, { kcal, key }) => s + kcal * (qtys[key] || 1),
                0,
              );
              return (
                <div key={bKey} style={{ marginBottom: 8 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: b.color,
                      marginBottom: 3,
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    {b.emoji} {b.label}{" "}
                    <span style={{ color: "#bbb", fontWeight: 400 }}>
                      — {bTotal} kcal
                    </span>
                  </div>
                  {items.map(({ key, kcal }) => {
                    const name = key.split("::")[1];
                    const qty = qtys[key] || 1;
                    return (
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: "#fafafa",
                          borderRadius: 7,
                          padding: "5px 10px",
                          marginBottom: 3,
                          fontSize: 12,
                        }}
                      >
                        <span
                          style={{ color: "#333", flex: 1, marginRight: 8 }}
                        >
                          {name}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <button
                            onClick={() => setQty(key, qty - 1)}
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 4,
                              border: `1px solid ${b.color}`,
                              background: "#fff",
                              color: b.color,
                              fontWeight: 700,
                              cursor: "pointer",
                              fontSize: 11,
                              lineHeight: 1,
                              padding: 0,
                            }}
                          >
                            −
                          </button>
                          <span
                            style={{
                              fontWeight: 700,
                              color: b.color,
                              minWidth: 14,
                              textAlign: "center",
                            }}
                          >
                            {qty}
                          </span>
                          <button
                            onClick={() => setQty(key, qty + 1)}
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 4,
                              border: `1px solid ${b.color}`,
                              background: "#fff",
                              color: b.color,
                              fontWeight: 700,
                              cursor: "pointer",
                              fontSize: 11,
                              lineHeight: 1,
                              padding: 0,
                            }}
                          >
                            +
                          </button>
                          <span
                            style={{
                              color: b.color,
                              fontWeight: 700,
                              minWidth: 55,
                              textAlign: "right",
                            }}
                          >
                            {kcal * qty} kcal
                          </span>
                          <button
                            onClick={() =>
                              setSelected((p) => {
                                const n = { ...p };
                                delete n[key];
                                return n;
                              })
                            }
                            style={{
                              background: "none",
                              border: "none",
                              color: "#ccc",
                              cursor: "pointer",
                              fontSize: 13,
                              padding: "0 0 0 2px",
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div
              style={{
                background: "#111",
                borderRadius: 10,
                padding: "11px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                Celkem
              </span>
              <span style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>
                {totalKcal} <span style={{ fontSize: 13 }}>kcal</span>
              </span>
            </div>
          </div>
        )}

        {/* Burn */}
        {totalKcal > 0 && (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "12px 14px",
              boxShadow: "0 1px 3px #0001",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
              🔥 Jak dlouho to budeš spalovat?
            </div>
            <div style={{ display: "grid", gap: 7 }}>
              {SPORTS.map(({ id, icon, name, met }) => {
                const mins = burnMins(met);
                const c = burnColor(mins);
                const pct = Math.min(100, (mins / 180) * 100);
                const kcalH = Math.round(((met * weight * 3.5) / 200) * 60);
                return (
                  <div
                    key={id}
                    style={{
                      background: "#fafafa",
                      borderRadius: 9,
                      padding: "9px 12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 20 }}>{icon}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>
                            {name}
                          </div>
                          <div style={{ fontSize: 10, color: "#bbb" }}>
                            ~{kcalH} kcal/hod
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: c }}>
                        {fmtTime(mins)}
                      </div>
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: "#e8e8e8",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: c,
                          borderRadius: 2,
                          transition: "width 0.4s",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 10,
                color: "#ccc",
                textAlign: "center",
              }}
            >
              Výpočet je orientační a závisí na intenzitě cvičení, věku a
              kondici. Starbucks: PL nutriční PDF (Autumn 2024), KFC & Popeyes:
              oficiální CZ PDF. Five Guys: oficiální CZ nutriční tabulka.
            </div>
          </div>
        )}

        {totalKcal === 0 && (
          <div
            style={{ textAlign: "center", padding: "30px 0", color: "#000" }}
          >
            <div style={{ fontSize: 38, marginBottom: 8 }}>👆</div>
            <div style={{ fontSize: 13 }}>
              Vyber fast food nahoře, pak kategorii a položky
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
