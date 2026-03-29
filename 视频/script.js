/* ═══════════════════════════════════════════════
   TripTailor — Promo Sequencer
   Autoplay timed animation sequence
   ═══════════════════════════════════════════════ */
'use strict';

/* ── Helpers ── */
const $  = id => document.getElementById(id);
const qs = (sel, ctx) => (ctx || document).querySelector(sel);
const qsa = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function addClass(el, cls, d = 0) {
  return new Promise(r => {
    if (!el) { r(); return; }
    setTimeout(() => { el.classList.add(cls); r(); }, d);
  });
}

function stagger(els, cls, stepMs = 120, startDelay = 0) {
  return new Promise(r => {
    let done = 0;
    els.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add(cls);
        if (++done === els.length) r();
      }, startDelay + i * stepMs);
    });
    if (!els.length) r();
  });
}

/* ── Scene management ── */
let currentScene = null;

function showScene(id) {
  if (currentScene) currentScene.classList.remove('active');
  const scene = $(id);
  scene.classList.add('active');
  currentScene = scene;
}

function hideScene(id) {
  const scene = $(id);
  scene.classList.remove('active');
}

/* ── Progress bar ── */
const progressFill = $('progress-fill');
let progressInterval = null;

function startProgress(totalMs) {
  clearInterval(progressInterval);
  const start = Date.now();
  progressInterval = setInterval(() => {
    const pct = Math.min((Date.now() - start) / totalMs * 100, 100);
    progressFill.style.width = pct + '%';
    if (pct >= 100) clearInterval(progressInterval);
  }, 50);
}

/* ── Feature screen cycling (Scene 4) ── */
let featTimer = null;

function startFeatCycle() {
  let idx = 0;
  const screens = qsa('.feat-screen');
  const items   = qsa('.feat-item');
  const CYCLE   = 2200;

  function goTo(n) {
    screens.forEach((s, i) => s.classList.toggle('fs-active', i === n));
    items.forEach((it, i) => it.classList.toggle('fi-active', i === n));
  }

  goTo(0);
  featTimer = setInterval(() => {
    idx = (idx + 1) % screens.length;
    goTo(idx);
  }, CYCLE);
}

function stopFeatCycle() {
  clearInterval(featTimer);
}

/* ══════════════════════════════════════════════════
   MAIN SEQUENCE
══════════════════════════════════════════════════ */

async function runSequence() {
  /* Reset all state */
  qsa('.scene').forEach(s => s.classList.remove('active'));
  qsa('[class]').forEach(el => {
    ['in', 'lit', 'visible', 'crossed', 'fi-active', 'fs-active'].forEach(c => {
      /* Only strip animation classes, not structural ones */
    });
  });

  /* ── Reset Scene-specific elements ── */
  const resetEls = [
    's1-eyebrow','s1-headline','s1-sub',
    's3-label','s3-brand','s3-tagline','s3-phone-wrap',
    's4-label',
    's6-tl1','s6-tl2','s6-brand','s6-sub','s6-badges',
  ];
  resetEls.forEach(id => { const el = $(id); if (el) el.classList.remove('in'); });
  qsa('.fc').forEach(el => el.classList.remove('in'));
  qsa('.prob-item').forEach(el => el.classList.remove('in','crossed'));
  qsa('.feat-item').forEach((el, i) => {
    el.classList.remove('in');
    el.classList.toggle('fi-active', i === 0);
  });
  qsa('.feat-screen').forEach((el, i) => {
    el.classList.toggle('fs-active', i === 0);
  });
  qsa('.msg-line').forEach(el => el.classList.remove('in','lit'));
  stopFeatCycle();
  progressFill.style.width = '0%';
  $('replay-btn').classList.remove('visible');

  const TOTAL_MS = 57000; // ~57s total
  startProgress(TOTAL_MS);

  /* ════════════════════════════
     SCENE 1 — Opening (0–9s)
  ════════════════════════════ */
  showScene('scene-1');
  await delay(200);
  await addClass($('s1-eyebrow'), 'in');
  await delay(300);
  await addClass($('s1-headline'), 'in');
  await delay(400);
  await addClass($('s1-sub'), 'in');
  await delay(300);
  await stagger(qsa('.fc'), 'in', 160, 0);
  await delay(4200);

  /* ════════════════════════════
     SCENE 2 — Problems (9–22s)
  ════════════════════════════ */
  showScene('scene-2');
  await delay(300);

  // Problem 1 slides in
  await addClass($('prob-1'), 'in');
  await delay(1400);
  $('prob-1').classList.add('crossed');

  // Problem 2
  await delay(400);
  await addClass($('prob-2'), 'in');
  await delay(1400);
  $('prob-2').classList.add('crossed');

  // Problem 3
  await delay(400);
  await addClass($('prob-3'), 'in');
  await delay(1400);
  $('prob-3').classList.add('crossed');

  await delay(2000);

  /* ════════════════════════════
     SCENE 3 — Solution (22–33s)
  ════════════════════════════ */
  showScene('scene-3');
  await delay(300);

  await addClass($('s3-label'), 'in');
  await delay(350);
  await addClass($('s3-brand'), 'in');
  await delay(450);
  await addClass($('s3-tagline'), 'in');
  await delay(600);
  await addClass($('s3-phone-wrap'), 'in');

  /* Typewriter in the phone */
  const prompts = [
    'Plan a day in Tokyo…',
    'Weekend in Kyoto on $80…',
    'Best food in Toronto…',
  ];
  const aiEl = $('ps-aitext');
  let pIdx = 0;

  async function typeText(text) {
    aiEl.textContent = '';
    for (let c of text) {
      aiEl.textContent += c;
      await delay(55);
    }
    await delay(1400);
    // erase
    while (aiEl.textContent.length > 0) {
      aiEl.textContent = aiEl.textContent.slice(0,-1);
      await delay(28);
    }
    await delay(300);
  }

  const typeLoop = (async () => {
    for (let i = 0; i < 2; i++) {
      await typeText(prompts[i % prompts.length]);
    }
  })();

  await delay(7500);
  // cancel typeLoop naturally (it will end on its own)

  /* ════════════════════════════
     SCENE 4 — Features (33–48s)
  ════════════════════════════ */
  showScene('scene-4');
  await delay(200);

  await addClass($('s4-label'), 'in');
  await stagger(qsa('.feat-item'), 'in', 130, 80);
  await delay(200);
  await addClass(qs('.s4-right'), 'in');
  await delay(600);
  startFeatCycle();

  await delay(12000); // let features cycle through all 5 screens
  stopFeatCycle();

  /* ════════════════════════════
     SCENE 5 — Key Messages (48–54s)
  ════════════════════════════ */
  showScene('scene-5');
  await delay(300);

  const msgs = qsa('.msg-line');

  await addClass(msgs[0], 'in');
  await delay(300);
  msgs[0].classList.add('lit');
  await delay(1000);

  await addClass(msgs[1], 'in');
  await delay(300);
  msgs[1].classList.add('lit');
  await delay(1000);

  await addClass(msgs[2], 'in');
  await delay(300);
  msgs[2].classList.add('lit');
  await delay(500);

  await addClass(msgs[3], 'in');
  await delay(300);
  msgs[3].classList.add('lit');
  await delay(1800);

  /* ════════════════════════════
     SCENE 6 — Closing (54–57s)
  ════════════════════════════ */
  showScene('scene-6');
  await delay(200);

  await addClass($('s6-tl1'), 'in');
  await delay(250);
  await addClass($('s6-tl2'), 'in');
  await delay(500);
  await addClass($('s6-brand'), 'in');
  await delay(400);
  await addClass($('s6-sub'), 'in');
  await delay(300);
  await addClass($('s6-badges'), 'in');

  await delay(3500);

  /* Show replay */
  $('replay-btn').classList.add('visible');
}

/* ── Replay ── */
$('replay-btn').addEventListener('click', () => {
  $('replay-btn').classList.remove('visible');
  runSequence();
});

/* ── Start on load ── */
window.addEventListener('load', () => {
  /* Small start delay so fonts/layout settle */
  setTimeout(runSequence, 500);
});
