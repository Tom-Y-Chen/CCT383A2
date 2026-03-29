/* ══════════════════════════════════════════
   TripTailor v4 — script.js
   ══════════════════════════════════════════ */
'use strict';

/* ═══════════ DATA ═══════════ */
const ACTIVITIES = [
  { id:'a1', type:'multi',
    title:'Neon Night Festival',      date:'OCT 25', dateLabel:'Oct 25–27, 2024',
    location:'Entertainment District', tags:['Festival','Nightlife','Free'],
    desc:'Immersive light art across 8 venues — three nights of neon installations, live music, and projection mapping.',
    hero:'linear-gradient(135deg,#f9a8d4,#ec4899 55%,#9d174d)',
    subLocations:[
      {name:'Distillery District',  time:'Oct 25, 7–11 PM',          activity:'Main neon installation + live music', bg:'linear-gradient(135deg,#c4b5fd,#7c3aed)'},
      {name:'The Bentway',          time:'Oct 25–27, 6 PM–midnight',  activity:'Neon tunnel walk + photo spots',     bg:'linear-gradient(135deg,#fdba74,#ea580c)'},
      {name:'Harbourfront Centre',  time:'Oct 26, 8–10 PM',           activity:'Projection mapping on the water',   bg:'linear-gradient(135deg,#a5f3fc,#0891b2)'},
      {name:'AGO Courtyard',        time:'Oct 27, 7–9 PM',            activity:'Artist talk + sculpture viewing',   bg:'linear-gradient(135deg,#6ee7b7,#059669)'},
    ]
  },
  { id:'a2', type:'single',
    title:'ROM: Ancient Worlds',      date:'NOW ON', dateLabel:'Until Feb 2025',
    location:'Royal Ontario Museum',  tags:['Museum','Culture','Indoor'],
    desc:'6,000 years of civilisation — Egypt, Greece, Rome. 400 original artefacts shown for the first time in Canada.',
    price:'$28 / adult', hours:'Daily 10 AM – 5:30 PM',
    hero:'linear-gradient(135deg,#fde68a,#fbbf24 55%,#d97706)',
  },
  { id:'a3', type:'single',
    title:'St. Lawrence Market Walk',  date:'SAT & SUN', dateLabel:'Every Weekend',
    location:'St. Lawrence Market',    tags:['Food','Local','Guided'],
    desc:'2-hour guided tour through Canada\'s best market. Peameal bacon, artisan cheese, global street food.',
    price:'$45 / person', hours:'Sat 8 AM–3 PM · Sun 9 AM–3 PM',
    hero:'linear-gradient(135deg,#fca5a5,#f87171 55%,#dc2626)',
  },
  { id:'a4', type:'multi',
    title:'Waterfront Arts Week',      date:'NOV 3', dateLabel:'Nov 3–10, 2024',
    location:'Toronto Waterfront',     tags:['Music','Art','Outdoor'],
    desc:'Eight days of free outdoor music, pop-up galleries, and artisan markets along the waterfront.',
    hero:'linear-gradient(135deg,#bae6fd,#38bdf8 55%,#0284c7)',
    subLocations:[
      {name:'Harbourfront Stage', time:'Nov 3–5, 6–9 PM',  activity:'Live jazz & indie performances', bg:'linear-gradient(135deg,#bae6fd,#0284c7)'},
      {name:'Sugar Beach',        time:'Nov 6–7, 2–6 PM',  activity:'Beach art installations',        bg:'linear-gradient(135deg,#fde68a,#f59e0b)'},
      {name:'Queens Quay Market', time:'Nov 8–10, All Day', activity:'Artisan & food market',          bg:'linear-gradient(135deg,#a7f3d0,#10b981)'},
    ]
  },
  { id:'a5', type:'single',
    title:'Kensington Night Market',   date:'EVERY FRI', dateLabel:'Fridays, 6 PM–midnight',
    location:'Kensington Market',      tags:['Food','Nightlife','Free'],
    desc:'Live DJs, global street food, local artisans and the city\'s best people-watching every Friday night.',
    price:'Free entry', hours:'Fridays 6 PM – midnight',
    hero:'linear-gradient(135deg,#fde68a,#fb923c 55%,#c2410c)',
  },
];

const PLACES = [
  {id:'p1',name:'CN Tower',           cat:'scenic',   icon:'🗼',x:36,y:52,rating:'4.8',desc:'Iconic 553m tower — glass-floor observation deck, EdgeWalk, and revolving restaurant.',bg:'linear-gradient(135deg,#bae6fd,#0284c7)',duration:'1.5h',budget:30},
  {id:'p2',name:'Kensington Market',  cat:'food',     icon:'🍜',x:20,y:40,rating:'4.6',desc:'Bohemian neighbourhood with global street food, vintage shops, and artisan coffee.',bg:'linear-gradient(135deg,#fdba74,#ea580c)',duration:'1h',  budget:20},
  {id:'p3',name:'Distillery District',cat:'culture',  icon:'🏛',x:72,y:56,rating:'4.7',desc:'Victorian industrial heritage turned arts hub — cobblestone, galleries, chocolate.',bg:'linear-gradient(135deg,#c4b5fd,#7c3aed)',duration:'2h',  budget:15},
  {id:'p4',name:'High Park',          cat:'scenic',   icon:'🌿',x:10,y:28,rating:'4.9',desc:'Toronto\'s largest park: trails, a small zoo, Grenadier Pond, cherry blossoms.',bg:'linear-gradient(135deg,#a7f3d0,#059669)',duration:'2h',  budget:0},
  {id:'p5',name:'ROM',                cat:'culture',  icon:'🎭',x:33,y:22,rating:'4.5',desc:'Royal Ontario Museum — world-class natural history inside a striking crystal building.',bg:'linear-gradient(135deg,#fde68a,#d97706)',duration:'2.5h',budget:28},
  {id:'p6',name:'St. Lawrence Mkt',   cat:'food',     icon:'🍖',x:63,y:44,rating:'4.8',desc:'World\'s best indoor market. Famous for peameal bacon and fresh local produce.',bg:'linear-gradient(135deg,#fca5a5,#ef4444)',duration:'1h',  budget:20},
  {id:'p7',name:'Harbourfront',       cat:'activity', icon:'⛵',x:48,y:74,rating:'4.6',desc:'Lakefront destination with kayaking, concerts, ferry to the Islands, galleries.',bg:'linear-gradient(135deg,#a5f3fc,#0891b2)',duration:'2h',  budget:25},
  {id:'p8',name:'Graffiti Alley',     cat:'activity', icon:'🎨',x:24,y:47,rating:'4.4',desc:'1km alleyway of world-class street art murals. The city\'s most photogenic spot.',bg:'linear-gradient(135deg,#f9a8d4,#ec4899)',duration:'45m', budget:0},
];

const FOOD_NEARBY = [
  {name:'Ichiran Ramen',    meta:'4.7★ · 5 min', bg:'linear-gradient(135deg,#fde68a,#f59e0b)'},
  {name:'Kinka Izakaya',    meta:'4.5★ · 8 min', bg:'linear-gradient(135deg,#fca5a5,#ef4444)'},
  {name:'Mercatto',         meta:'4.6★ · 4 min', bg:'linear-gradient(135deg,#a7f3d0,#059669)'},
  {name:'Pai Thai Kitchen', meta:'4.8★ · 6 min', bg:'linear-gradient(135deg,#bae6fd,#0284c7)'},
];

const SUGGESTED = [
  {id:'s1',title:'Toronto in a Day',   thumb:'linear-gradient(135deg,#a7f3d0,#059669)',time:'6h',budget:95, tags:['Culture','Food'],   stops:['p1','p5','p3']},
  {id:'s2',title:'Waterfront Walk',    thumb:'linear-gradient(135deg,#bae6fd,#0284c7)',time:'4h',budget:55, tags:['Scenic','Relaxed'], stops:['p7','p6']},
  {id:'s3',title:'Street Art & Bites', thumb:'linear-gradient(135deg,#f9a8d4,#ec4899)',time:'3h',budget:35, tags:['Art','Food'],       stops:['p8','p2']},
  {id:'s4',title:'Park & Museum Loop', thumb:'linear-gradient(135deg,#fde68a,#d97706)',time:'5h',budget:28, tags:['Culture','Nature'],  stops:['p4','p5']},
];

const SAVED_ROUTES = [
  {id:'r1',mine:true, title:'Toronto Highlights',      thumb:'linear-gradient(135deg,#a7f3d0,#059669)',time:'5h 30m',budget:95,tags:['Culture','Food'],   stops:['p1','p5','p3']},
  {id:'r2',mine:true, title:'Waterfront & Market Day', thumb:'linear-gradient(135deg,#bae6fd,#0284c7)',time:'4h',    budget:70,tags:['Food','Scenic'],    stops:['p7','p6']},
  {id:'r3',mine:false,title:'Hidden Gems',             thumb:'linear-gradient(135deg,#f9a8d4,#ec4899)',time:'3h 45m',budget:45,tags:['Art','Local'],      stops:['p8','p2'],creator:'@jess.travels'},
  {id:'r4',mine:false,title:'Culture & Coffee Loop',   thumb:'linear-gradient(135deg,#fde68a,#f59e0b)',time:'5h',    budget:80,tags:['Museum','Café'],    stops:['p5','p3'],creator:'@travelmike'},
];

const COMM_POSTS = [
  {id:'c1',user:'Sarah K.',av:'#059669',ini:'SK',title:'Perfect Sunday in Kensington 🌿',desc:'Tacos at Seven Lives, vintage hunting on Augusta Ave. City at its best.',img:'linear-gradient(135deg,#a7f3d0,#059669)',likes:142,time:'2h ago',isPartner:false},
  {id:'c2',isPartner:true,user:'Marcus T.',av:'#7c3aed',ini:'MT',title:'Join the Toronto Highlights route Sat 🗺',desc:'CN Tower → ROM → Distillery. ~$95/person. 1 spot left.'},
  {id:'c3',user:'Priya M.',av:'#0284c7',ini:'PM',title:'ROM Ancient Worlds is STUNNING ✨',desc:'3 hours in and still not done. Book in advance — sold out weekends.',img:'linear-gradient(135deg,#fde68a,#d97706)',likes:89,time:'5h ago',isPartner:false},
  {id:'c4',user:'Alex W.',av:'#dc2626',ini:'AW',title:'Distillery District at Night 🌃',desc:'Cobblestone, fairy lights, the best chocolate shop. Purely magical.',img:'linear-gradient(135deg,#c4b5fd,#7c3aed)',likes:204,time:'1d ago',isPartner:false},
];

const TRANSPORT = {walk:{icon:'🚶',mins:18},transit:{icon:'🚇',mins:12},bike:{icon:'🚲',mins:14},car:{icon:'🚗',mins:8}};

const GUIDE_TIPS = [
  'Best photos in the morning — golden hour light here is special.',
  'Book tickets online to skip the queue.',
  'Try the local specialty — the reviews don\'t lie.',
  'Free entry on Tuesday evenings.',
];

const POPUP_DATA = {
  food:{icon:'🍜',title:'Nearby: Ichiran Ramen',  sub:'4.7★ · 5 min walk · ~$15'},
  time:{icon:'⏰',title:'Time to move on',         sub:'45 min here. Next stop is 15 min away.'},
  tip: {icon:'📸',title:'Photo spot nearby',       sub:'Face north at the entrance for best light.'},
};

/* ═══════════ STATE ═══════════ */
const S = {
  tab:'home',
  sel:[],          // selected place ids on map
  transport:'walk',
  budget:120,
  plan:[],         // active plan stop objects
  saved:[...SAVED_ROUTES],
  addedIds:new Set(),
  guide:null,
  guideIdx:0,
  activeRoute:null,
};

/* ═══════════ UTILS ═══════════ */
const $  = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>[...c.querySelectorAll(s)];
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2200);}
function tick(){const n=new Date(),h=n.getHours()%12||12,m=String(n.getMinutes()).padStart(2,'0');$('#s-time').textContent=`${h}:${m}`;}
tick(); setInterval(tick,30000);

/* ═══════════ TAB NAV ═══════════ */
function goTab(tab){
  S.tab=tab;
  $$('.tb').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  $$('.view').forEach(v=>v.classList.toggle('active',v.id===`v-${tab}`));
}
$$('.tb').forEach(b=>b.addEventListener('click',()=>goTab(b.dataset.tab)));

/* ═══════════ HOME ═══════════ */
function buildHome(){
  buildSuggested();
  buildEvents();
  updateTBC();
}

function buildSuggested(){
  const row=$('#suggest-row'); row.innerHTML='';
  SUGGESTED.forEach(r=>{
    const stops=r.stops.map(id=>PLACES.find(p=>p.id===id)).filter(Boolean);
    const c=document.createElement('div'); c.className='sug-card';
    c.innerHTML=`
      <div class="sug-thumb" style="background:${r.thumb}">
        <div class="sug-dur">⏱ ${r.time}</div>
      </div>
      <div class="sug-body">
        <div class="sug-title">${r.title}</div>
        <div class="sug-meta">💰 ~$${r.budget} · ${stops.length} stops</div>
        <div class="sug-tags">${r.tags.map(t=>`<span class="sug-tag">${t}</span>`).join('')}</div>
      </div>`;
    c.addEventListener('click',()=>{ S.plan=stops; goTab('mapping'); enterPlanning(); });
    row.appendChild(c);
  });
}

function buildEvents(){
  const el=$('#ev-list'); el.innerHTML='';
  ACTIVITIES.slice(0,3).forEach(a=>{
    const c=document.createElement('div'); c.className='ev-card';
    c.innerHTML=`
      <div class="ev-thumb" style="background:${a.hero}"></div>
      <div class="ev-body">
        <div class="ev-date">${a.date}</div>
        <div class="ev-title">${a.title}</div>
        <div class="ev-loc">📍 ${a.location}</div>
      </div>
      <div class="ev-arr">›</div>`;
    c.addEventListener('click',()=>openSheet(a));
    el.appendChild(c);
  });
}

function updateTBC(){
  const sub=$('#tbc-sub');
  const stops=$('#tbc-stops');
  sub.textContent=`${S.plan.length} place${S.plan.length!==1?'s':''} · $${S.budget} budget`;
  stops.innerHTML='';
  S.plan.forEach((p,i)=>{
    const pill=document.createElement('div'); pill.className='tbc-stop-pill';
    pill.innerHTML=`<span>${p.icon} ${p.name.split(' ')[0]}</span><span class="rm" data-i="${i}">✕</span>`;
    pill.querySelector('.rm').addEventListener('click',e=>{e.stopPropagation();S.plan.splice(i,1);updateTBC();});
    stops.appendChild(pill);
  });
}

$('#tbc-btn').addEventListener('click',()=>{
  if(!S.plan.length) S.plan=[PLACES[0],PLACES[5],PLACES[2]];
  goTab('mapping'); enterPlanning();
});
$('#ac-resume').addEventListener('click',()=>{ if(S.activeRoute) openGuide(S.activeRoute); });

// Quick pills
$$('.qa[data-tab]').forEach(b=>b.addEventListener('click',()=>goTab(b.dataset.tab)));
$$('.sh-see[data-tab]').forEach(b=>b.addEventListener('click',()=>goTab(b.dataset.tab)));

/* ═══════════ DISCOVER ═══════════ */
function buildDiscover(filter='all'){
  const feed=$('#disc-feed'); feed.innerHTML='';
  const list=filter==='all'?ACTIVITIES:ACTIVITIES.filter(a=>a.tags.includes(filter));
  list.forEach(a=>{
    const isAdded=S.addedIds.has(a.id);
    const c=document.createElement('div'); c.className='disc-card';
    c.innerHTML=`
      <div class="dc-img" style="background:${a.hero}">
        <div class="dc-overlay">
          <div class="dc-badge">${a.date}</div>
          <div class="dc-title">${a.title}</div>
        </div>
      </div>
      <div class="dc-body">
        <div class="dc-loc">📍 ${a.location}</div>
        <div class="dc-tags">${a.tags.map(t=>`<span class="dc-tag">${t}</span>`).join('')}</div>
        <div class="dc-foot">
          <button class="dc-add ${isAdded?'added':''}" data-id="${a.id}">${isAdded?'✓ Added':'+ Add to Trip'}</button>
          <span class="dc-type">${a.type==='multi'?'📍 Multi-stop':'🎯 Single'}</span>
        </div>
      </div>`;
    c.addEventListener('click',e=>{ if(!e.target.closest('.dc-add')) openSheet(a); });
    c.querySelector('.dc-add').addEventListener('click',e=>{
      e.stopPropagation(); toggleAdd(a.id, c.querySelector('.dc-add'));
    });
    feed.appendChild(c);
  });
}

function toggleAdd(id,btn){
  if(S.addedIds.has(id)){
    S.addedIds.delete(id); btn.textContent='+ Add to Trip'; btn.classList.remove('added'); toast('Removed');
  } else {
    S.addedIds.add(id); btn.textContent='✓ Added'; btn.classList.add('added'); toast('✓ Added to trip!');
  }
}

$$('#disc-chips .chip').forEach(c=>c.addEventListener('click',()=>{
  $$('#disc-chips .chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active'); buildDiscover(c.dataset.f);
}));

/* ═══════════ DETAIL SHEET (inside #app) ═══════════ */
function openSheet(act){
  const inner=$('#sheet-inner');
  inner.innerHTML=act.type==='multi'?buildSheetMulti(act):buildSheetSingle(act);

  inner.querySelectorAll('.sh-add, .sh-sub-add').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const bid=btn.dataset.id||act.id;
      if(S.addedIds.has(bid)){
        S.addedIds.delete(bid); btn.textContent='+ Add to Trip'; btn.classList.remove('added'); toast('Removed');
      } else {
        S.addedIds.add(bid); btn.textContent='✓ Added!'; btn.classList.add('added'); toast('✓ Added to trip!');
      }
    });
  });

  // "Add to Route" button leads to planner
  const planBtn=inner.querySelector('.sh-plan-btn');
  if(planBtn){
    planBtn.addEventListener('click',()=>{
      closeSheet();
      const place=PLACES.find(p=>p.name.toLowerCase().includes(act.title.split(' ')[0].toLowerCase()));
      if(place&&!S.plan.find(x=>x.id===place.id)) S.plan.push(place);
      goTab('mapping'); enterPlanning();
    });
  }

  $('#sheet-scrim').classList.add('on');
  $('#detail-sheet').classList.add('open');
}

function closeSheet(){
  $('#detail-sheet').classList.remove('open');
  $('#sheet-scrim').classList.remove('on');
}

$('#sheet-scrim').addEventListener('click',closeSheet);

function buildSheetMulti(act){
  const isAdded=S.addedIds.has(act.id);
  const subs=act.subLocations.map((loc,i)=>`
    <div class="sh-sub">
      <div class="sh-sub-img" style="background:${loc.bg}"></div>
      <div>
        <div class="sh-sub-name">${loc.name}</div>
        <div class="sh-sub-meta">⏰ ${loc.time}</div>
        <div class="sh-sub-meta">🎭 ${loc.activity}</div>
        <button class="sh-sub-add ${S.addedIds.has(act.id+'-s'+i)?'added':''}" data-id="${act.id}-s${i}">
          ${S.addedIds.has(act.id+'-s'+i)?'✓ Added':'+ Add Stop'}
        </button>
      </div>
    </div>`).join('');

  return `
    <div class="sh-hero" style="background:${act.hero}"></div>
    <div class="sh-body">
      <div class="sh-chip">${act.dateLabel}</div>
      <div class="sh-title">${act.title}</div>
      <div class="sh-loc">📍 ${act.location}</div>
      <div class="sh-desc">${act.desc}</div>
      <button class="sh-add ${isAdded?'added':''}" data-id="${act.id}">${isAdded?'✓ Added to Trip':'+ Add All to Trip'}</button>
      <button class="sh-plan-btn act primary" style="width:100%;margin-bottom:16px">🗺 Build Route Around This</button>
      <div class="sh-sec-t">Venues & Locations</div>
      ${subs}
    </div>`;
}

function buildSheetSingle(act){
  const isAdded=S.addedIds.has(act.id);
  const chips=[
    act.price?`<div class="sh-ic">🎟 ${act.price}</div>`:'',
    act.hours?`<div class="sh-ic">🕐 ${act.hours}</div>`:'',
  ].join('');

  const recs=ACTIVITIES.filter(a=>a.id!==act.id).slice(0,2).map(a=>`
    <div class="ev-card" style="cursor:pointer" onclick="">
      <div class="ev-thumb" style="background:${a.hero}"></div>
      <div class="ev-body">
        <div class="ev-date">${a.date}</div>
        <div class="ev-title">${a.title}</div>
        <div class="ev-loc">📍 ${a.location}</div>
      </div>
    </div>`).join('');

  return `
    <div class="sh-hero" style="background:${act.hero}"></div>
    <div class="sh-body">
      <div class="sh-chip">${act.dateLabel}</div>
      <div class="sh-title">${act.title}</div>
      <div class="sh-loc">📍 ${act.location}</div>
      <div class="sh-info">${chips}</div>
      <div class="sh-desc">${act.desc}</div>
      <button class="sh-add ${isAdded?'added':''}" data-id="${act.id}">${isAdded?'✓ Added to Trip':'+ Add to Trip'}</button>
      <button class="sh-plan-btn act primary" style="width:100%;margin-bottom:16px">🗺 Build Route Around This</button>
      <div class="sh-rec-div">— You might also like —</div>
      <div style="display:flex;flex-direction:column;gap:8px;">${recs}</div>
    </div>`;
}

/* ═══════════ MAP EXPLORE ═══════════ */
function buildMap(){
  const canvas=$('#map-canvas');
  $$('.pin',canvas).forEach(p=>p.remove());
  PLACES.forEach(place=>{
    const pin=document.createElement('div');
    pin.className='pin'+(S.sel.includes(place.id)?' sel':'');
    pin.style.left=place.x+'%'; pin.style.top=place.y+'%';
    pin.dataset.id=place.id;
    pin.innerHTML=`<div class="pin-lbl"><span class="pin-em">${place.icon}</span>${place.name.split(' ')[0]}</div><div class="pin-stem"></div><div class="pin-dot"></div>`;
    pin.addEventListener('click',()=>openDrawer(place));
    canvas.appendChild(pin);
  });
}

function openDrawer(place){
  const body=$('#pd-body');
  const isAdded=S.sel.includes(place.id);
  body.innerHTML=`
    <div class="pd-img" style="background:${place.bg}"></div>
    <div class="pd-name">${place.name}</div>
    <div class="pd-meta"><span class="pd-rat">★ ${place.rating}</span><span>⏱ ${place.duration}</span><span>💰 ~$${place.budget}</span></div>
    <div class="pd-desc">${place.desc}</div>
    <button class="pd-add ${isAdded?'added':''}" data-id="${place.id}">${isAdded?'✓ In Route':'+ Add to Route'}</button>`;
  body.querySelector('.pd-add').addEventListener('click',()=>{
    toggleSel(place);
    const btn=body.querySelector('.pd-add');
    const now=S.sel.includes(place.id);
    btn.textContent=now?'✓ In Route':'+ Add to Route';
    btn.classList.toggle('added',now);
  });
  $('#pd-scrim').classList.add('on');
  $('#pd-drawer').classList.add('open');
}

function closeDrawer(){
  $('#pd-drawer').classList.remove('open');
  $('#pd-scrim').classList.remove('on');
}
$('#pd-scrim').addEventListener('click',closeDrawer);

function toggleSel(place){
  const idx=S.sel.indexOf(place.id);
  if(idx>-1){S.sel.splice(idx,1);toast('Removed');}
  else{S.sel.push(place.id);toast('📍 Added!');}
  updateMapFoot();buildMap();
}

function updateMapFoot(){
  const n=S.sel.length;
  $('#sel-num').textContent=n;
  const btn=$('#plan-btn');
  btn.classList.toggle('hidden',n<2);
}

$$('#map-chips .chip').forEach(c=>c.addEventListener('click',()=>{
  $$('#map-chips .chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active');
  const cat=c.dataset.cat;
  $$('.pin').forEach(pin=>{
    const p=PLACES.find(x=>x.id===pin.dataset.id);
    pin.style.display=(cat==='all'||p.cat===cat)?'flex':'none';
  });
}));

$('#plan-btn').addEventListener('click',()=>{
  closeDrawer();
  S.plan=S.sel.map(id=>PLACES.find(p=>p.id===id)).filter(Boolean);
  enterPlanning();
});

/* ═══════════ PLANNING MODE ═══════════ */
$('#plan-back').addEventListener('click',exitPlanning);
$('#plan-save-top').addEventListener('click',savePlan);
$('#pa-save').addEventListener('click',savePlan);
$('#pa-guide').addEventListener('click',()=>openGuide({title:'My Route',stops:S.plan}));
$('#add-more-stops').addEventListener('click',()=>{ exitPlanning(); toast('Tap pins to add more stops'); });

function enterPlanning(){
  if(!S.plan.length) S.plan=[PLACES[0],PLACES[5],PLACES[2]];
  $('#explore-mode').classList.remove('active');
  $('#planning-mode').classList.add('active');
  renderPlanning();
}
function exitPlanning(){
  $('#planning-mode').classList.remove('active');
  $('#explore-mode').classList.add('active');
}
function renderPlanning(){ buildStops(); buildFoodRow(); updateSummary(); }

function buildStops(){
  const list=$('#stops-list'); list.innerHTML='';
  const t=TRANSPORT[S.transport];

  S.plan.forEach((place,i)=>{
    // Commute badge (not before first)
    if(i>0){
      const badge=document.createElement('div'); badge.className='commute-badge';
      badge.innerHTML=`<div class="cb-line"></div><div class="cb-pill">${t.icon} ${t.mins} min · ~1.2 km</div><div class="cb-line"></div>`;
      list.appendChild(badge);
    }
    const row=document.createElement('div'); row.className='stop-row';
    row.dataset.idx=i;
    row.setAttribute('draggable','true');
    row.innerHTML=`
      <div class="stop-num">${i+1}</div>
      <div class="stop-thumb" style="background:${place.bg}"></div>
      <div class="stop-info">
        <div class="stop-name">${place.icon} ${place.name}</div>
        <div class="stop-dur">${place.duration} · ~$${place.budget}</div>
      </div>
      <div class="stop-acts">
        <button class="stop-act del" data-i="${i}" title="Remove">✕</button>
        <button class="stop-act rep" data-i="${i}" title="Replace">↺</button>
      </div>`;
    row.querySelector('.del').addEventListener('click',e=>{e.stopPropagation();delStop(i);});
    row.querySelector('.rep').addEventListener('click',e=>{e.stopPropagation();repStop(i);});
    row.addEventListener('dragstart',e=>{e.dataTransfer.setData('text/plain',i);row.classList.add('dragging');});
    row.addEventListener('dragend',()=>row.classList.remove('dragging'));
    row.addEventListener('dragover',e=>e.preventDefault());
    row.addEventListener('drop',e=>{e.preventDefault();const f=+e.dataTransfer.getData('text/plain');if(f!==i)swapStops(f,i);});
    list.appendChild(row);
  });
}

function buildFoodRow(){
  const row=$('#food-row'); row.innerHTML='';
  FOOD_NEARBY.forEach(f=>{
    const c=document.createElement('div'); c.className='food-card';
    c.innerHTML=`<div class="food-thumb" style="background:${f.bg}"></div><div class="food-body"><div class="food-name">${f.name}</div><div class="food-meta">${f.meta}</div></div>`;
    row.appendChild(c);
  });
}

function delStop(i){
  if(S.plan.length<=1){toast('Need at least 1 stop');return;}
  S.plan.splice(i,1); buildStops(); updateSummary(); toast('Stop removed');
}
function repStop(i){
  const used=S.plan.map(p=>p.id);
  const avail=PLACES.filter(p=>!used.includes(p.id));
  if(!avail.length){toast('No more places');return;}
  const r=avail[Math.floor(Math.random()*avail.length)];
  S.plan[i]=r; buildStops(); updateSummary(); toast(`Replaced with ${r.name}`);
}
function swapStops(a,b){
  [S.plan[a],S.plan[b]]=[S.plan[b],S.plan[a]]; buildStops(); toast('Reordered ✓');
}

function updateSummary(){
  const n=S.plan.length;
  const t=TRANSPORT[S.transport];
  const vis=S.plan.reduce((acc,p)=>{
    const raw=p.duration;
    return acc+(raw.endsWith('m')&&!raw.includes('h')?parseInt(raw):parseFloat(raw)*60);
  },0);
  const total=vis+t.mins*Math.max(0,n-1);
  const h=Math.floor(total/60),m=Math.round(total%60);
  const bud=S.plan.reduce((a,p)=>a+p.budget,0);
  $('#sum-time').textContent=h>0?`${h}h ${m}m`:`${m}m`;
  $('#sum-cost').textContent=`~$${Math.max(S.budget,bud)}`;
  $('#sum-stops').textContent=n;
  $('#ctrl-budget').textContent=`$${S.budget}`;
  buildRouteVis();
}

function buildRouteVis(){
  const vis=$('#route-line-vis'); vis.innerHTML='';
  S.plan.forEach((p,i)=>{
    const s=document.createElement('div'); s.className='rlv-stop';
    s.innerHTML=`<div class="rlv-dot"></div><div class="rlv-lbl">${p.name.split(' ')[0]}</div>`;
    vis.appendChild(s);
    if(i<S.plan.length-1){
      const l=document.createElement('div'); l.className='rlv-line';
      vis.appendChild(l);
    }
  });
}

$('#budget-slider').addEventListener('input',function(){
  S.budget=+this.value; updateSummary();
});
$$('.tmode').forEach(b=>b.addEventListener('click',()=>{
  $$('.tmode').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); S.transport=b.dataset.t; buildStops(); updateSummary();
}));

function savePlan(){
  if(!S.plan.length){toast('Add at least 1 stop');return;}
  const newR={
    id:'r'+Date.now(), mine:true,
    title:S.plan.map(p=>p.name.split(' ')[0]).join(' → '),
    thumb:'linear-gradient(135deg,#a7f3d0,#059669)',
    time:$('#sum-time').textContent, budget:S.budget,
    tags:['Custom'],
    stops:S.plan.map(p=>p.id),
  };
  S.saved.unshift(newR); buildRoutes();
  exitPlanning(); toast('💾 Route saved!'); goTab('routes');
}

/* ═══════════ ROUTES ═══════════ */
function buildRoutes(){
  const myEl=$('#routes-my'), commEl=$('#routes-comm');
  myEl.innerHTML=commEl.innerHTML='';
  S.saved.forEach(r=>(r.mine?myEl:commEl).appendChild(mkRouteCard(r)));
}

function mkRouteCard(r){
  const stops=r.stops.map(id=>PLACES.find(p=>p.id===id)).filter(Boolean);
  const el=document.createElement('div'); el.className='route-card';
  const path=stops.map((s,i)=>`
    <div class="rcp-stop"><div class="rcp-dot"></div><div class="rcp-lbl">${s.name.split(' ')[0]}</div></div>
    ${i<stops.length-1?'<div class="rcp-line"></div>':''}`).join('');

  el.innerHTML=`
    <div class="rc-thumb" style="background:${r.thumb}">
      <div class="rc-ov"><div class="rc-title">${r.title}</div></div>
    </div>
    <div class="rc-body">
      <div class="rc-path">${path}</div>
      <div class="rc-tags">${r.tags.map(t=>`<span class="rc-tag">${t}</span>`).join('')}</div>
      <div class="rc-meta">⏱ ${r.time} · 💰 ~$${r.budget}${r.creator?' · '+r.creator:''}</div>
      <div class="rc-acts">
        <button class="rca ghost" data-a="edit">✏ Edit</button>
        <button class="rca ghost" data-a="share">↗ Share</button>
        <button class="rca solid" data-a="start">▶ Start</button>
      </div>
    </div>`;

  el.querySelector('[data-a="start"]').addEventListener('click',()=>{
    const places=stops.length?stops:PLACES.slice(0,3);
    openGuide({title:r.title,stops:places});
  });
  el.querySelector('[data-a="edit"]').addEventListener('click',()=>{
    S.plan=stops.length?stops:PLACES.slice(0,3);
    goTab('mapping'); enterPlanning(); toast('Editing route');
  });
  el.querySelector('[data-a="share"]').addEventListener('click',()=>toast('📤 Link copied!'));
  return el;
}

$$('#routes-seg .seg').forEach(b=>b.addEventListener('click',()=>{
  $$('#routes-seg .seg').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  $('#routes-my').classList.toggle('hidden',b.dataset.seg!=='my');
  $('#routes-comm').classList.toggle('hidden',b.dataset.seg!=='community');
}));

/* ═══════════ COMMUNITY ═══════════ */
function buildComm(){
  const feed=$('#comm-feed'); feed.innerHTML='';
  COMM_POSTS.forEach(post=>{
    const el=document.createElement('div');
    if(post.isPartner){
      el.innerHTML=`
        <div class="partner-card">
          <div class="pc-ico">🤝</div>
          <div class="pc-body"><div class="pc-t">${post.user} is looking for a travel buddy</div><div class="pc-s">${post.desc.slice(0,70)}…</div></div>
          <button class="pc-join">Join</button>
        </div>`;
      el.querySelector('.pc-join').addEventListener('click',()=>toast('🎉 Request sent!'));
    } else {
      el.className='comm-card';
      const img=post.img?`<div class="cc-img" style="background:${post.img}"></div>`:'';
      el.innerHTML=`
        <div class="cc-hd"><div class="cc-av" style="background:${post.av}">${post.ini}</div><div><div class="cc-name">${post.user}</div><div class="cc-time">${post.time}</div></div></div>
        ${img}
        <div class="cc-body">
          <div class="cc-title">${post.title}</div>
          <div class="cc-desc">${post.desc}</div>
          <div class="cc-foot"><span class="cc-likes">❤️ ${post.likes}</span><button class="cc-save">Save Route</button></div>
        </div>`;
      el.querySelector('.cc-save').addEventListener('click',()=>toast('Saved!'));
    }
    feed.appendChild(el);
  });
}

/* ═══════════ GUIDE MODE ═══════════ */
function openGuide(routeData){
  if(!routeData||!routeData.stops.length) return;
  S.guide=routeData; S.guideIdx=0; S.activeRoute=routeData;
  $('#g-name').textContent=routeData.title||'My Trip';
  buildGuideCards(routeData.stops);
  updateGuide();
  $('#guide-screen').classList.remove('hidden');
  updateActiveTripBar();
  setTimeout(()=>triggerPopup('food'),1600);
}

function buildGuideCards(stops){
  const cards=$('#g-cards'); cards.innerHTML='';
  const t=TRANSPORT[S.transport];
  stops.forEach((place,i)=>{
    const node=document.createElement('div');
    node.className='g-stop'+(i===S.guideIdx?' cur':'');
    node.dataset.idx=i;
    node.innerHTML=`
      <div class="g-simg" style="background:${place.bg}"></div>
      <div class="g-sbody">
        <div class="g-sname">${place.icon} ${place.name}</div>
        <div class="g-smeta">${place.duration} suggested · ~$${place.budget}</div>
        <div class="g-stip">💡 ${GUIDE_TIPS[i%GUIDE_TIPS.length]}</div>
      </div>`;
    cards.appendChild(node);
    if(i<stops.length-1){
      const seg=document.createElement('div'); seg.className='g-comm';
      seg.innerHTML=`<div class="g-comm-icon">${t.icon}</div><div class="g-comm-arrow">→</div><div class="g-comm-t">${t.mins} min</div><div class="g-comm-d">~1.2 km</div>`;
      cards.appendChild(seg);
    }
  });
}

function updateGuide(){
  const stops=S.guide?.stops||[];
  const i=S.guideIdx;
  $('#g-prog').textContent=`Stop ${i+1} of ${stops.length}`;
  $$('.g-stop').forEach((n,idx)=>n.classList.toggle('cur',idx===i));
  const cur=$('.g-stop.cur');
  if(cur) cur.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
  const btn=$('#g-next');
  btn.textContent=i>=stops.length-1?'🎉 Trip Complete!':`Next: ${stops[i+1].name.split(' ')[0]} →`;
  // update active card fill
  const fill=$('#ac-fill');
  if(fill) fill.style.width=((i+1)/stops.length*100)+'%';
  const meta=$('#ac-meta');
  if(meta) meta.textContent=`Stop ${i+1} of ${stops.length}`;
}

$('#g-next').addEventListener('click',()=>{
  const stops=S.guide?.stops||[];
  if(S.guideIdx>=stops.length-1){closeGuide();toast('🎉 Trip complete!');return;}
  S.guideIdx++; updateGuide(); hidePopup();
  const types=['food','time','tip'];
  setTimeout(()=>triggerPopup(types[S.guideIdx%3]),1200);
});

function triggerPopup(type){
  const d=POPUP_DATA[type]||POPUP_DATA.food;
  $('#g-sug-icon').textContent=d.icon;
  $('#g-sug-title').textContent=d.title;
  $('#g-sug-sub').textContent=d.sub;
  $('#g-suggest').classList.remove('hidden');
}
function hidePopup(){$('#g-suggest').classList.add('hidden');}

$('#g-sug-skip').addEventListener('click',hidePopup);
$('#g-sug-go').addEventListener('click',()=>{hidePopup();toast('Added to your list!');});
$('#g-nav').addEventListener('click',()=>toast('Opening Maps…'));
$('#g-exit').addEventListener('click',closeGuide);

function closeGuide(){
  $('#guide-screen').classList.add('hidden');
  hidePopup();
}

function updateActiveTripBar(){
  const card=$('#active-card');
  if(S.activeRoute){
    card.classList.remove('hidden');
    $('#ac-name').textContent=S.activeRoute.title;
    const fill=$('#ac-fill');
    if(fill) fill.style.width=((S.guideIdx+1)/S.activeRoute.stops.length*100)+'%';
  } else {
    card.classList.add('hidden');
  }
}

/* ═══════════ INIT ═══════════ */
(function init(){
  buildHome(); buildDiscover(); buildMap(); updateMapFoot(); buildRoutes(); buildComm();
  S.plan=[PLACES[0],PLACES[5],PLACES[2]];
  goTab('home');
})();
