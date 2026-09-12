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
    items: ["Basic Lights (bulb shapes)", "Everyday Joy"],
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
    items: ["Classic Christmas", "Nordic Christmas", "Poker Collection", "Japanese Origami", "Vintage Glass Bulbs (bulb shapes)"],
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

// Faithful browser port of drawFairyLightsWithScale: from the current macOS
// renderer. The hero shows Basic Lights / Fairy Lights / Small / Warm White.
function renderHeroFairyLights() {
  const canvas = document.getElementById("hero-fairy-lights");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let frame = 0;

  function drawStrand(edgeLength, scale, time) {
    const wireDepth = 40 * scale;
    const lightDepth = 34 * scale;
    const darkWire = "rgba(110, 61, 20, .86)";
    const goldWire = "rgba(230, 163, 64, .94)";

    // Three stable, irregular copper strands—the same formulas and colors as
    // the native app renderer.
    for (let strand = 0; strand < 3; strand += 1) {
      context.beginPath();
      context.moveTo(-20, 9 + strand * 8);
      for (let x = -20; x < edgeLength + 90; x += 72) {
        const nextX = x + 72;
        const nextY = 7 + ((nextX * .31 + strand * 19) % wireDepth);
        const bend1 = 4 + ((x * .17 + strand * 31 + 11 + wireDepth * 20) % wireDepth);
        const bend2 = 4 + ((x * .29 + strand * 13 + 23 + wireDepth * 20) % wireDepth);
        context.bezierCurveTo(x + 22, bend1, x + 50, bend2, nextX, nextY);
      }
      context.strokeStyle = darkWire;
      context.lineWidth = Math.max(.58, .58 * Math.sqrt(scale));
      context.stroke();
      context.strokeStyle = goldWire;
      context.lineWidth = Math.max(.22, .22 * Math.sqrt(scale));
      context.stroke();
    }

    let lightIndex = 0;
    for (let strand = 0; strand < 3; strand += 1) {
      const spacing = (25 + strand * 4) * scale;
      for (let bulbOrdinal = 0; ; bulbOrdinal += 1, lightIndex += 1) {
        const x = 12 + strand * 11 + bulbOrdinal * spacing;
        if (x >= edgeLength) break;
        const y = 8 + ((x * .37 + strand * 23) % lightDepth);
        const nodeIndex = Math.max(1, Math.round((x + 20) / 72));
        const anchorX = -20 + nodeIndex * 72;
        const anchorY = 7 + ((anchorX * .31 + strand * 19 + wireDepth * 20) % wireDepth);
        const dotW = 4.8 * scale;
        const dotH = 6.8 * scale;

        context.beginPath();
        context.moveTo(anchorX, anchorY);
        context.bezierCurveTo(
          anchorX + (x - anchorX) * .38,
          anchorY + 5 * scale,
          x - (x - anchorX) * .18,
          y - dotH * .42 - 4 * scale,
          x,
          y - dotH * .42
        );
        context.strokeStyle = darkWire;
        context.lineWidth = Math.max(.48, .48 * Math.sqrt(scale));
        context.stroke();
        context.strokeStyle = goldWire;
        context.lineWidth = Math.max(.18, .18 * Math.sqrt(scale));
        context.stroke();

        const pulse = reducedMotion ? 1 : .82 + .18 * Math.sin(time * .0022 + lightIndex * 1.73);
        context.save();
        context.shadowColor = `rgba(255, 209, 138, ${.82 * pulse})`;
        context.shadowBlur = 8 * scale * pulse;
        context.fillStyle = `rgba(255, 238, 211, ${pulse})`;
        context.beginPath();
        context.ellipse(x, y, dotW / 2, dotH / 2, 0, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
        context.fillStyle = "rgba(255,255,255,.92)";
        context.beginPath();
        context.ellipse(x - dotW * .04, y + dotH * .16, dotW * .14, dotH * .14, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }
  }

  function draw(time = 0) {
    context.clearRect(0, 0, width, height);
    // Small in the native app is 55 points. Scale that footprint to the
    // website's simulated display while retaining the renderer proportions.
    const scale = Math.max(.56, Math.min(.82, width * .000716));

    context.save();
    drawStrand(width, scale, time);
    context.restore();

    context.save();
    context.translate(0, height);
    context.scale(1, -1);
    drawStrand(width, scale, time + 350);
    context.restore();

    context.save();
    context.transform(0, 1, 1, 0, 0, 0);
    drawStrand(height, scale, time + 700);
    context.restore();

    context.save();
    context.transform(0, 1, -1, 0, width, 0);
    drawStrand(height, scale, time + 1050);
    context.restore();
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    draw(performance.now());
  }

  function animate(time) {
    draw(time);
    frame = requestAnimationFrame(animate);
  }

  new ResizeObserver(resize).observe(canvas);
  resize();
  if (!reducedMotion) frame = requestAnimationFrame(animate);
  window.addEventListener("pagehide", () => cancelAnimationFrame(frame), { once: true });
}

renderHeroFairyLights();
