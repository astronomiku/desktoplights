const collections=[
 ["Vintage Glass Bulbs","Individual","vintage-glass-bulbs","A premium bulb shape with softer, old-world silhouettes—layer it onto any collection.","₱199","nonseasonal"],
 ["Fairy Garden","Individual","fairy-garden","Mushrooms, blossoms, butterflies, fairies, lanterns, and wisteria.","₱199","nonseasonal"],
 ["Gemstone Collection","Individual","gemstones","Twelve luminous birthstones, from garnet to turquoise.","₱299","nonseasonal"],
 ["Autumn Glow","Individual","autumn-harvest","Warm leaves, acorns, apples, lanterns, and woodland characters.","₱149","nonseasonal"],
 ["Celestial Dreams","Individual","celestial-dreams","Moons, suns, planets, comets, clouds, and galaxy light.","₱149","nonseasonal"],
 ["Poker Collection","Individual","gambler-collection","Cards, chips, poker characters, and a dollar-bill garland.","₱199","nonseasonal"],
 ["Japanese Origami","Individual","japanese-origami","Nine luminous folded-paper designs and a crane garland.","₱199","nonseasonal"],
 ["Halloween Collection","Individual","haunted-glow","Skulls, ghosts, pumpkins, bats, and optional cobweb garlands.","₱199","holiday"],
 ["Classic Christmas","Individual","classic-christmas","Trees, stars, candy canes, Santa, greetings, and holiday garlands.","₱199","holiday"],
 ["Nordic Christmas","Individual","nordic-christmas","Scandinavian folk ornaments and a wooden-bead garland.","₱199","holiday"],
 ["Filipino Parol","Bundle","filipino-parol","Paper parols, Maligayang Pasko, banderitas, and poinsettias.","₱199","holiday"],
 ["Premium Capiz Parol","Bundle","premium-capiz-parols","Layered capiz-shell parols with gold and silver star garlands.","₱199","holiday"]
];
function renderCollections(list,selector){
 const grid=document.querySelector(selector);
 if(!grid)return;
 grid.innerHTML=list.map(([name,tag,id,copy,price])=>`<article class="collection-card"><img src="images/showcases/${id}.jpg" alt="${name} Desktop Lights collection" loading="lazy"><div class="card-copy"><div class="card-top"><h2>${name}</h2><span class="pill ${tag==="Free"?"free":tag==="Bundle"?"bundle":""}">${tag==="Bundle"?"In bundle":tag}</span></div><p>${copy}</p><div class="card-bottom"><span class="price">${price}</span>${tag==="Bundle"?'<a class="bundle-hint" href="pricing.html">Save in the Filipino Christmas Bundle →</a>':""}</div></div></article>`).join("");
}
if(document.querySelector("[data-collections='holiday']")||document.querySelector("[data-collections='nonseasonal']")){
 renderCollections(collections.filter(c=>c[5]==="holiday"),"[data-collections='holiday']");
 renderCollections(collections.filter(c=>c[5]==="nonseasonal"),"[data-collections='nonseasonal']");
}else{
 renderCollections(collections,"[data-collections]");
}

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
