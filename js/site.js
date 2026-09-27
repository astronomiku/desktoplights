const collections=[
 ["Vintage Glass Bulbs","Individual","vintage-glass-bulbs","A premium bulb shape with softer, old-world silhouettes—layer it onto any collection.","nonseasonal"],
 ["Fairy Garden","Individual","fairy-garden","Mushrooms, blossoms, butterflies, fairies, lanterns, and wisteria.","nonseasonal"],
 ["Gemstone Collection","Individual","gemstones","Twelve luminous birthstones, from garnet to turquoise.","nonseasonal"],
 ["Autumn Glow","Individual","autumn-harvest","Warm leaves, acorns, apples, lanterns, and woodland characters.","nonseasonal"],
 ["Celestial Dreams","Individual","celestial-dreams","Moons, suns, planets, comets, clouds, and galaxy light.","nonseasonal"],
 ["Poker Collection","Individual","gambler-collection","Cards, chips, poker characters, and a dollar-bill garland.","nonseasonal"],
 ["Japanese Origami","Individual","japanese-origami","Nine luminous folded-paper designs and a crane garland.","nonseasonal"],
 ["Halloween Collection","Individual","haunted-glow","Skulls, ghosts, pumpkins, bats, and optional cobweb garlands.","holiday"],
 ["Classic Christmas","Individual","classic-christmas","Trees, stars, candy canes, Santa, greetings, and holiday garlands.","holiday"],
 ["Nordic Christmas","Individual","nordic-christmas","Scandinavian folk ornaments and a wooden-bead garland.","holiday"],
 ["Filipino Parol","Bundle","filipino-parol","Paper parols, Maligayang Pasko, banderitas, and poinsettias.","holiday"],
 ["Premium Capiz Parol","Bundle","premium-capiz-parols","Layered capiz-shell parols with gold and silver star garlands.","holiday"]
];
function renderCollections(list,selector){
 const grid=document.querySelector(selector);
 if(!grid)return;
 grid.innerHTML=list.map(([name,tag,id,copy])=>`<article class="collection-card"><img src="images/showcases/${id}.jpg" alt="${name} Desktop Lights collection" loading="lazy"><div class="card-copy"><div class="card-top"><h2>${name}</h2><span class="pill ${tag==="Free"?"free":tag==="Bundle"?"bundle":""}">${tag==="Bundle"?"In bundle":tag}</span></div><p>${copy}</p><div class="card-bottom"><a class="bundle-hint" href="https://apps.apple.com/app/6809770698" target="_blank" rel="noopener">Get the app to purchase →</a></div></div></article>`).join("");
}
if(document.querySelector("[data-collections='holiday']")||document.querySelector("[data-collections='nonseasonal']")){
 renderCollections(collections.filter(c=>c[4]==="holiday"),"[data-collections='holiday']");
 renderCollections(collections.filter(c=>c[4]==="nonseasonal"),"[data-collections='nonseasonal']");
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
