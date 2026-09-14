const collections=[
 ["Vintage Glass Bulbs","Individual","vintage-glass-bulbs","A premium bulb shape with softer, old-world silhouettes—layer it onto any collection.","₱199"],
 ["Fairy Garden","Individual","fairy-garden","Mushrooms, blossoms, butterflies, fairies, lanterns, and wisteria.","₱199"],
 ["Gemstone Collection","Individual","gemstones","Twelve luminous birthstones, from garnet to turquoise.","₱299"],
 ["Halloween Collection","Individual","haunted-glow","Skulls, ghosts, pumpkins, bats, and optional cobweb garlands.","₱199"],
 ["Autumn Glow","Individual","autumn-harvest","Warm leaves, acorns, apples, lanterns, and woodland characters.","₱149"],
 ["Celestial Dreams","Individual","celestial-dreams","Moons, suns, planets, comets, clouds, and galaxy light.","₱149"],
 ["Filipino Parol","Bundle","filipino-parol","Paper parols, Maligayang Pasko, banderitas, and poinsettias.","₱199"],
 ["Premium Capiz Parol","Bundle","premium-capiz-parols","Layered capiz-shell parols with gold and silver star garlands.","₱199"],
 ["Classic Christmas","Individual","classic-christmas","Trees, stars, candy canes, Santa, greetings, and holiday garlands.","₱199"],
 ["Nordic Christmas","Individual","nordic-christmas","Scandinavian folk ornaments and a wooden-bead garland.","₱199"],
 ["Poker Collection","Individual","gambler-collection","Cards, chips, poker characters, and a dollar-bill garland.","₱199"],
 ["Japanese Origami","Individual","japanese-origami","Nine luminous folded-paper designs and a crane garland.","₱199"]
];
const grid=document.querySelector("[data-collections]");
if(grid)grid.innerHTML=collections.map(([name,tag,id,copy,price])=>`<article class="collection-card"><img src="images/showcases/${id}.jpg" alt="${name} Desktop Lights collection" loading="lazy"><div class="card-copy"><div class="card-top"><h2>${name}</h2><span class="pill ${tag==="Free"?"free":tag==="Bundle"?"bundle":""}">${tag==="Bundle"?"In bundle":tag}</span></div><p>${copy}</p><div class="card-bottom"><span class="price">${price}</span>${tag==="Bundle"?'<a class="bundle-hint" href="pricing.html">Save in the Filipino Christmas Bundle →</a>':""}</div></div></article>`).join("");

// Hero video lightbox: click (or Enter/Space) the hero video to open it
// larger in an overlay, same source, with sound and scrubbing controls.
(function(){
  const trigger=document.querySelector("[data-hero-trigger]");
  const lightbox=document.querySelector("[data-lightbox]");
  if(!trigger||!lightbox)return;
  const bigVideo=lightbox.querySelector(".lightbox-video");
  const heroVideo=trigger.querySelector("video");
  function open(){
    lightbox.hidden=false;
    document.body.style.overflow="hidden";
    if(heroVideo)bigVideo.currentTime=heroVideo.currentTime||0;
    bigVideo.muted=false;
    bigVideo.play().catch(()=>{});
  }
  function close(){
    lightbox.hidden=true;
    document.body.style.overflow="";
    bigVideo.pause();
  }
  trigger.addEventListener("click",open);
  trigger.addEventListener("keydown",function(e){
    if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}
  });
  lightbox.querySelectorAll("[data-lightbox-close]").forEach(function(el){el.addEventListener("click",close);});
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"&&!lightbox.hidden)close();
  });
})();
