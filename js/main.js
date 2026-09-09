// Desktop Lights — collection & bundle data
// Kept in one place so the catalog only needs updating here.

const COLLECTIONS = [
  {
    id: "everyday-joy",
    name: "Everyday Joy",
    tag: "Free",
    tagClass: "tag-free",
    image: "images/showcases/everyday-joy.jpg",
    blurb: "Everyday charm for no occasion at all — hearts, a coffee mug, a rainbow. The free starting point for every install.",
    presets: ["Heart", "Smiley Face", "Coffee Mug", "Music Note", "Wrapped Candy", "Rainbow"],
  },
  {
    id: "fairy-garden",
    name: "Fairy Garden",
    tag: "Complete Collection Bundle",
    tagClass: "tag-bundle",
    image: "images/showcases/fairy-garden.jpg",
    blurb: "Mushrooms, blossoms, and fairy lanterns in soft glowing color, with a Flowering Wisteria garland option.",
    presets: ["Mushroom Glow", "Fairy Glow", "Blossom Glow", "Butterfly Glow", "Fairy Lantern Glow", "Moonflower Glow"],
  },
  {
    id: "gemstones",
    name: "Gemstone Collection",
    tag: "Complete Collection Bundle",
    tagClass: "tag-bundle",
    image: "images/showcases/gemstones.jpg",
    blurb: "All twelve birthstones, January through December — one for every month of the year.",
    presets: ["Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl", "Ruby", "Peridot", "Sapphire", "Opal", "Citrine", "Turquoise"],
  },
  {
    id: "haunted-glow",
    name: "Halloween Collection",
    tag: "Complete Collection Bundle · Seasonal 3-Pack",
    tagClass: "tag-bundle",
    image: "images/showcases/haunted-glow.jpg",
    blurb: "Skulls, ghosts, and jack-o'-lanterns with an optional Cobwebs garland, light or heavy.",
    presets: ["Skull", "Witch Hat", "Ghost", "Jack-o'-Lantern", "Bat", "Eyeball Orb", "Black Widow Spider"],
  },
  {
    id: "autumn-harvest",
    name: "Autumn Harvest",
    tag: "Complete Collection Bundle · Seasonal 3-Pack",
    tagClass: "tag-bundle",
    image: "images/showcases/autumn-harvest.jpg",
    blurb: "Maple leaves, acorns, and a woodland deer for cozy, sweater-weather screens.",
    presets: ["Maple Leaf", "Acorn", "Harvest Lantern", "Apple", "Hedgehog", "Woodland Deer"],
  },
  {
    id: "celestial-dreams",
    name: "Celestial Dreams",
    tag: "Complete Collection Bundle · Seasonal 3-Pack",
    tagClass: "tag-bundle",
    image: "images/showcases/celestial-dreams.jpg",
    blurb: "Moons, suns, and a galaxy orb for a dreamy, night-sky string of lights.",
    presets: ["Crescent Moon", "Radiant Sun", "Saturn", "Comet", "Cloud", "Galaxy Orb"],
  },
  {
    id: "filipino-parol",
    name: "Filipino Parol",
    tag: "Parol Bundle",
    tagClass: "tag-christmas",
    image: "images/showcases/filipino-parol.jpg",
    blurb: "Traditional star-shaped parols in paper-craft style, with a Maligayang Pasko greeting and a choice of Fiesta Banderitas or Poinsettia garland.",
    presets: ["Star Parol", "Classic Star Parol", "Ringed Star Parol", "Blue Christmas Parol", "Festival Parol", "Fiesta Wheel Parol", "Maligayang Pasko Greeting"],
  },
  {
    id: "premium-capiz-parols",
    name: "Premium Capiz Parols",
    tag: "Parol Bundle",
    tagClass: "tag-christmas",
    image: "images/showcases/premium-capiz-parols.jpg",
    blurb: "Nine intricately layered capiz-shell parol designs with a Maligayang Pasko greeting and a Small Gold or Small Silver Stars garland.",
    presets: ["Pearl Lace Parol", "Golden Bloom Parol", "Fiesta Bituin Parol", "Ringed Capiz", "Pasko Jewel Parol", "Flower Capiz", "Kaleidoscope Parol", "Compass Parol", "Maligayang Pasko Greeting"],
  },
  {
    id: "classic-christmas",
    name: "Classic Christmas",
    tag: "Standalone",
    tagClass: "tag-standalone",
    image: "images/showcases/classic-christmas.jpg",
    blurb: "The traditional string-light lineup — tree, star, candy cane, Santa — plus two full greeting presets and a Holly & Berry or Silver Foliage & Pearls garland.",
    presets: ["Christmas Tree", "Crystal Star", "Candy Cane", "Reindeer", "Santa", "Gift Box", "Jingle Bell", "Merry Christmas Greeting", "Season's Greetings"],
  },
  {
    id: "nordic-christmas",
    name: "Nordic Christmas",
    tag: "Standalone",
    tagClass: "tag-standalone",
    image: "images/showcases/nordic-christmas.jpg",
    blurb: "Scandinavian folk-craft bulbs — dala horses, woven hearts, and a tomte — with a Handmade Wooden Beads garland.",
    presets: ["Dala Horse", "Handmade Paper Star", "Woven Christmas Heart", "Nordic Tomte", "Straw Yule Goat", "Nordic Christmas Tree", "Nordic Gingerbread House", "God Jul Ornament"],
  },
  {
    id: "gambler-collection",
    name: "Poker Collection",
    tag: "Standalone",
    tagClass: "tag-standalone",
    image: "images/showcases/gambler-collection.jpg",
    blurb: "For the card table crowd — aces, chips, and a full cast of poker-face characters, with a Dollar Bill garland.",
    presets: ["Pocket Red Aces", "Fish Player", "ALL IN Button", "Donkey Player", "The Nuts Card Protector", "Poker Shark", "High Roller Whale", "Pink $10,000 Chip"],
  },
  {
    id: "japanese-origami",
    name: "Japanese Origami",
    tag: "Standalone",
    tagClass: "tag-standalone",
    image: "images/showcases/japanese-origami.jpg",
    blurb: "Nine folded-paper designs — koi, cranes, a fox, a lotus — with an Origami Crane garland.",
    presets: ["Koi", "Lotus", "Butterfly", "Fox", "Rabbit", "Cat", "Elephant", "Turtle", "Dog"],
  },
];

const BUNDLES = [
  {
    name: "Free",
    detail: "Included with every install — no purchase needed.",
    items: ["Everyday Joy"],
  },
  {
    name: "Complete Collection Bundle",
    detail: "Five collections together, priced below buying them one by one.",
    items: ["Fairy Garden", "Gemstone Collection", "Halloween Collection", "Autumn Harvest", "Celestial Dreams"],
  },
  {
    name: "Seasonal 3-Pack",
    detail: "The autumn-through-winter run, for anyone who wants just the seasonal three.",
    items: ["Halloween Collection", "Autumn Harvest", "Celestial Dreams"],
  },
  {
    name: "Parol Bundle",
    detail: "Bundle only — these two are not sold individually.",
    items: ["Filipino Parol", "Premium Capiz Parols"],
  },
  {
    name: "Standalone Collections",
    detail: "Each sold on its own, not currently part of any bundle.",
    items: ["Classic Christmas", "Nordic Christmas", "Poker Collection", "Japanese Origami"],
  },
];

function renderCollections() {
  const grid = document.getElementById("collections-grid");
  grid.innerHTML = COLLECTIONS.map((c) => `
    <article class="card collection-card">
      <div class="card-media">
        <img src="${c.image}" alt="${c.name} bulb designs strung as desktop lights" loading="lazy">
        <div class="card-overlay">
          <h3>${c.name}</h3>
        </div>
      </div>
      <div class="card-body">
        <div class="card-top">
          <span class="tag ${c.tagClass}">${c.tag}</span>
        </div>
        <p class="card-blurb">${c.blurb}</p>
        <p class="card-presets">${c.presets.length} presets · ${c.presets.slice(0, 4).join(", ")}${c.presets.length > 4 ? ", …" : ""}</p>
      </div>
    </article>
  `).join("");
}

function renderBundles() {
  const grid = document.getElementById("bundles-grid");
  grid.innerHTML = BUNDLES.map((b) => `
    <article class="card bundle-card">
      <h3>${b.name}</h3>
      <p class="card-blurb">${b.detail}</p>
      <ul class="bundle-items">
        ${b.items.map((i) => `<li>${i}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

renderCollections();
renderBundles();
