const collections=[
 ["Everyday Joy","Free","everyday-joy","Hearts, coffee, music, candy, rainbows, and smiles for everyday color."],
 ["Fairy Garden","Bundle","fairy-garden","Mushrooms, blossoms, butterflies, fairies, lanterns, and wisteria."],
 ["Gemstone Collection","Bundle","gemstones","Twelve luminous birthstones, from garnet to turquoise."],
 ["Halloween Collection","Bundle","haunted-glow","Skulls, ghosts, pumpkins, bats, and optional cobweb garlands."],
 ["Autumn Harvest","Bundle","autumn-harvest","Warm leaves, acorns, apples, lanterns, and woodland characters."],
 ["Celestial Dreams","Bundle","celestial-dreams","Moons, suns, planets, comets, clouds, and galaxy light."],
 ["Filipino Parol","Parol Bundle","filipino-parol","Paper parols, Maligayang Pasko, banderitas, and poinsettias."],
 ["Premium Capiz Parols","Parol Bundle","premium-capiz-parols","Layered capiz-shell parols with gold and silver star garlands."],
 ["Classic Christmas","Individual","classic-christmas","Trees, stars, candy canes, Santa, greetings, and holiday garlands."],
 ["Nordic Christmas","Individual","nordic-christmas","Scandinavian folk ornaments and a wooden-bead garland."],
 ["Poker Collection","Individual","gambler-collection","Cards, chips, poker characters, and a dollar-bill garland."],
 ["Japanese Origami","Individual","japanese-origami","Nine luminous folded-paper designs and a crane garland."]
];
const grid=document.querySelector("[data-collections]");
if(grid)grid.innerHTML=collections.map(([name,tag,id,copy])=>`<article class="collection-card"><img src="images/showcases/${id}.jpg" alt="${name} Desktop Lights collection" loading="lazy"><div class="card-copy"><div class="card-top"><h2>${name}</h2><span class="pill ${tag==="Free"?"free":tag.includes("Bundle")?"bundle":""}">${tag}</span></div><p>${copy}</p></div></article>`).join("");

const demo=document.querySelector("[data-light-demo]");
if(demo){
  const slides=[
    {placement:"all",kicker:"All sides · Multicolor · Small",title:"Desktop Lights",tagline:"Decorate your screens like you decorate your home.",copy:"Animated string lights frame every edge of your Mac—beautiful enough to set the mood, quiet enough to leave your work alone."},
    {placement:"top",kicker:"Top only · Multicolor · Small",title:"A little glow up top.",tagline:"Atmosphere without the clutter.",copy:"Keep the light above your work while the rest of your screen stays completely open."},
    {placement:"sides",kicker:"Both sides · Multicolor · Small",title:"Frame your workspace.",tagline:"Color at the edges. Focus in the middle.",copy:"Light the left and right sides for a balanced look that leaves your menu bar and Dock clear."},
    {placement:"bottom",kicker:"Bottom only · Multicolor · Small",title:"A soft line of light.",tagline:"Warmth right along the bottom edge.",copy:"Keep the glow low and subtle—perfect when you want the smallest visual footprint."}
  ];
  const assets=["round-globe","classic-a19","mini-edison","spiral-edison","short-tube","oversized-globe"];
  const hues=[-28,82,0,178,305,42,132,225];
  const layer=document.createElement("div"); layer.className="demo-lights"; layer.setAttribute("aria-hidden","true");
  const add=(edge,positions)=>positions.forEach((position,index)=>{const bulb=document.createElement("span");bulb.className=`demo-bulb ${edge}`;bulb.style.setProperty("--position",`${position}%`);bulb.style.setProperty("--delay",`${-(index*.31+(edge.length*.17))}s`);bulb.style.setProperty("--hue",`${hues[(index+edge.length)%hues.length]}deg`);bulb.innerHTML=`<img src="images/basic-lights/${assets[(index+edge.length)%assets.length]}.png" alt="">`;layer.appendChild(bulb)});
  add("top",[7,20,34,48,62,76,90]); add("right",[18,38,60,82]); add("bottom",[7,20,34,48,62,76,90]); add("left",[18,38,60,82]); demo.prepend(layer);
  const copy=demo.querySelector(".hero-copy"),kicker=copy.querySelector(".kicker"),title=copy.querySelector("h1"),tagline=copy.querySelector(".tagline"),lede=copy.querySelector(".lede");
  const controls=document.createElement("div");controls.className="demo-controls";controls.setAttribute("aria-label","Light placement previews");controls.innerHTML=slides.map((slide,index)=>`<button type="button" aria-label="Show ${slide.placement} placement" ${index===0?'aria-current="true"':''}></button>`).join("");demo.appendChild(controls);
  let active=0,timer;
  const show=index=>{active=index;const slide=slides[index];demo.dataset.placement=slide.placement;kicker.textContent=slide.kicker;title.textContent=slide.title;tagline.textContent=slide.tagline;lede.textContent=slide.copy;controls.querySelectorAll("button").forEach((button,i)=>button.setAttribute("aria-current",i===index?"true":"false"));};
  const play=()=>{clearInterval(timer);timer=setInterval(()=>show((active+1)%slides.length),5500)};
  controls.querySelectorAll("button").forEach((button,index)=>button.addEventListener("click",()=>{show(index);play()}));
  show(0);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)play();
}
