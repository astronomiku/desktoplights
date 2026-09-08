const COLLECTIONS = [
  { id: "basic-lights", name: "Basic Lights", tag: "Free", tagClass: "tag-free", blurb: "A complete starter set of familiar glass silhouettes, from globes and Edison shapes to capsules and tubes.", presets: ["Mini Globe", "Classic A19", "Round Globe", "Mini Edison", "Spiral Edison", "Oversized Globe", "Shallow Dome", "Short Tube", "Slender Teardrop", "Fluted Oval", "Smooth Capsule", "Long Tube", "Tube", "Diamond", "Edison Teardrop", "Tapered C7"] },
  { id: "everyday-joy", name: "Everyday Joy", tag: "Free", tagClass: "tag-free", blurb: "Playful glass lights for ordinary days: hearts, music, coffee, candy, rainbows, and smiles.", presets: ["Heart", "Smiley Face", "Coffee Mug", "Music Note", "Wrapped Candy", "Rainbow"] },
  { id: "vintage-glass-bulbs", name: "Vintage Glass Bulbs", tag: "Premium · Individual", tagClass: "tag-standalone", blurb: "Deep jewel-toned glass, visible filaments, and elegant antique silhouettes for a richer, moodier strand.", presets: ["Mini Globe", "Shallow Dome", "Fluted Oval", "Smooth Capsule", "Tube", "Diamond", "Edison Teardrop", "Tapered C7"] },
  { id: "fairy-garden", name: "Fairy Garden", tag: "Premium · Individual", tagClass: "tag-standalone", blurb: "An enchanted collection of mushrooms, blossoms, butterflies, fairies, and lanterns, with a wisteria garland.", presets: ["Mushroom", "Fairy", "Blossom", "Butterfly", "Fairy Lantern", "Moonflower"] },
  { id: "gemstones", name: "Gemstone Collection", tag: "Premium · Individual", tagClass: "tag-standalone", blurb: "Twelve dimensional jewel bulbs inspired by every birthstone month, from garnet to turquoise.", presets: ["Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl", "Ruby", "Peridot", "Sapphire", "Opal", "Citrine", "Turquoise"] },
  { id: "haunted-glow", name: "Halloween Collection", tag: "Premium · Individual", tagClass: "tag-standalone", blurb: "Smoky luminous skulls, ghosts, pumpkins, bats, and curiosities, with optional cobweb decoration.", presets: ["Skull", "Witch Hat", "Ghost", "Jack-o’-Lantern", "Bat", "Eyeball Orb", "Black Widow Spider"] },
  { id: "autumn-harvest", name: "Autumn Harvest", tag: "Premium · Individual", tagClass: "tag-standalone", blurb: "Warm woodland forms and harvest icons in amber glass for cozy, sweater-weather screens.", presets: ["Maple Leaf", "Acorn", "Harvest Lantern", "Apple", "Hedgehog", "Woodland Deer"] },
  { id: "celestial-dreams", name: "Celestial Dreams", tag: "Premium · Individual", tagClass: "tag-standalone", blurb: "Moon, sun, planet, comet, cloud, and galaxy bulbs with a soft night-sky glow.", presets: ["Crescent Moon", "Radiant Sun", "Saturn", "Comet", "Cloud", "Galaxy Orb"] },
  { id: "filipino-parol", name: "Filipino Parol", tag: "Filipino Christmas Bundle", tagClass: "tag-christmas", blurb: "Six festive paper parols, a Maligayang Pasko greeting, Fiesta Banderitas, and a poinsettia garland.", presets: ["Star Parol", "Classic Star Parol", "Ringed Star Parol", "Blue Christmas Parol", "Festival Parol", "Fiesta Wheel Parol"] },
  { id: "premium-capiz-parols", name: "Premium Capiz Parols", tag: "Filipino Christmas Bundle", tagClass: "tag-christmas", blurb: "Eight intricate capiz-shell parols, a Maligayang Pasko greeting, and delicate gold or silver star garlands.", presets: ["Pearl Lace Parol", "Golden Bloom Parol", "Fiesta Bituin Parol", "Ringed Capiz", "Pasko Jewel Parol", "Flower Capiz", "Kaleidoscope Parol", "Compass Parol"] },
  { id: "classic-christmas", name: "Classic Christmas", tag: "Premium · Individual", tagClass: "tag-standalone", blurb: "Beloved Christmas icons with luminous glass depth, two greeting styles, and traditional holiday garlands.", presets: ["Christmas Tree", "Crystal Star", "Candy Cane", "Reindeer", "Santa", "Gift Box", "Jingle Bell"] },
  { id: "nordic-christmas", name: "Nordic Christmas", tag: "Premium · Individual", tagClass: "tag-standalone", blurb: "Scandinavian folk craft rendered as warm ornaments, with a handmade wooden-bead garland.", presets: ["Dala Horse", "Handmade Paper Star", "Woven Christmas Heart", "Nordic Tomte", "Straw Yule Goat", "Nordic Christmas Tree", "Gingerbread House", "God Jul Ornament"] },
  { id: "gambler-collection", name: "Poker Collection", tag: "Premium · Individual", tagClass: "tag-standalone", blurb: "Cards, chips, table characters, and lucky icons for poker night, plus a dollar-bill garland.", presets: ["Pocket Red Aces", "Fish Player", "ALL IN Button", "Donkey Player", "The Nuts Card Protector", "Poker Shark", "High Roller Whale", "Pink $10,000 Chip"] },
  { id: "japanese-origami", name: "Japanese Origami", tag: "Premium · Individual", tagClass: "tag-standalone", blurb: "Nine luminous folded-paper animals and forms, accompanied by a separate origami crane garland.", presets: ["Koi", "Lotus", "Butterfly", "Fox", "Rabbit", "Cat", "Elephant", "Turtle", "Dog"] },
];

const BUNDLES = [
  { name: "Included Free", detail: "A generous starter set, available immediately with every install.", items: ["Basic Lights", "Everyday Joy"] },
  { name: "Filipino Christmas Bundle", detail: "A paired celebration of paper and capiz parol traditions. Classic Christmas is not included.", items: ["Filipino Parol", "Premium Capiz Parols"] },
  { name: "Seasonal Three-Pack", detail: "Three collections for the autumn-to-Halloween season, discounted together.", items: ["Halloween Collection", "Autumn Harvest", "Celestial Dreams"] },
  { name: "Unlock Everything", detail: "The best launch price for every current premium collection. Future collections are sold separately.", items: ["12 current premium collections"] },
];

document.getElementById("collections-grid").innerHTML = COLLECTIONS.map((c) => `
  <article class="card collection-card">
    <button class="card-media showcase-button" type="button" data-collection="${c.id}" aria-label="View all ${c.name} designs">
      <img src="images/showcases/${c.id}.jpg" alt="All ${c.name} bulb designs" loading="lazy">
      <span class="media-action">View all designs</span>
    </button>
    <div class="card-body">
      <div class="card-top"><h3>${c.name}</h3><span class="tag ${c.tagClass}">${c.tag}</span></div>
      <p class="card-blurb">${c.blurb}</p>
      <p class="card-presets">${c.presets.length} bulb designs · ${c.presets.join(" · ")}</p>
    </div>
  </article>
`).join("");

document.getElementById("bundles-grid").innerHTML = BUNDLES.map((b) => `
  <article class="card bundle-card"><h3>${b.name}</h3><p class="card-blurb">${b.detail}</p>
    <ul class="bundle-items">${b.items.map((item) => `<li>${item}</li>`).join("")}</ul>
  </article>
`).join("");

const dialog = document.getElementById("showcase-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogTitle = document.getElementById("dialog-title");
const dialogDesigns = document.getElementById("dialog-designs");

document.querySelectorAll(".showcase-button").forEach((button) => {
  button.addEventListener("click", () => {
    const collection = COLLECTIONS.find((item) => item.id === button.dataset.collection);
    dialogTitle.textContent = collection.name;
    dialogImage.src = `images/showcases/${collection.id}.jpg`;
    dialogImage.alt = `All ${collection.name} bulb designs`;
    dialogDesigns.textContent = collection.presets.join(" · ");
    dialog.showModal();
  });
});

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
