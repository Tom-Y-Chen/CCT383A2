/* ═══════════════════════════════════════════════
   TripTailor Campaign — script.js
   Public Engagement Page · Vanilla JS
═══════════════════════════════════════════════ */
'use strict';

/* ── NAV scroll effect ── */
const nav      = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Hamburger / mobile menu ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal-up');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* ── Hero AI bar typewriter ── */
const prompts = [
  'Plan a day in Toronto…',
  'Weekend in Kyoto on $80…',
  'Best ramen spots nearby…',
  'Family day out for $60…',
  'Hidden gems in Kensington…',
  'A morning at the waterfront…',
];
let promptIdx = 0;
const aiTextEl = document.getElementById('hp-ai-text');

function typePrompt(text, callback) {
  if (!aiTextEl) return;
  aiTextEl.textContent = '';
  let i = 0;
  const iv = setInterval(() => {
    aiTextEl.textContent += text[i++];
    if (i >= text.length) { clearInterval(iv); setTimeout(callback, 2000); }
  }, 55);
}

function erasePrompt(callback) {
  if (!aiTextEl) return;
  const iv = setInterval(() => {
    const t = aiTextEl.textContent;
    if (!t.length) { clearInterval(iv); setTimeout(callback, 300); return; }
    aiTextEl.textContent = t.slice(0, -1);
  }, 28);
}

function cyclePrompts() {
  promptIdx = (promptIdx + 1) % prompts.length;
  typePrompt(prompts[promptIdx], () => erasePrompt(cyclePrompts));
}
if (aiTextEl) {
  typePrompt(prompts[0], () => erasePrompt(cyclePrompts));
}

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // Close all
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    // Toggle current
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

/* ── Hashtag / saved-posts quick-vote (Social section) ── */
const hcOpts   = document.querySelectorAll('.hc-opt');
const hcResult = document.getElementById('hc-result');

hcOpts.forEach(btn => {
  btn.addEventListener('click', () => {
    if (document.querySelector('.hc-opt.selected')) return; // already voted
    btn.classList.add('selected');
    hcOpts.forEach(b => { if (b !== btn) b.style.opacity = '0.4'; });
    if (hcResult) hcResult.classList.remove('hidden');
  });
});

/* ── Engagement poll (Engage section) ── */
// Simulated percentages per option
const pollData = { a: 38, b: 31, c: 18, d: 13 };
const pollOpts   = document.querySelectorAll('.poll-opt');
const pollFooter = document.getElementById('poll-footer');
let pollVoted = false;

pollOpts.forEach(btn => {
  btn.addEventListener('click', () => {
    if (pollVoted) return;
    pollVoted = true;
    const choice = btn.dataset.poll;

    pollOpts.forEach(b => {
      b.classList.add('voted');
      const key = b.dataset.poll;
      let pct = pollData[key];
      // bump up the chosen one a little
      if (key === choice) pct = Math.min(pct + 3, 99);

      const barEl = b.querySelector('.po-bar');
      const wrapEl = b.querySelector('.po-bar-wrap');
      if (barEl && wrapEl) {
        wrapEl.style.opacity = '1';
        // Animate bar after a tiny delay
        setTimeout(() => { barEl.style.width = pct + '%'; }, 80);
      }

      // Show percentage label
      const textEl = b.querySelector('.po-text');
      if (textEl) {
        textEl.textContent += `  — ${pct}%`;
      }
    });

    if (pollFooter) pollFooter.classList.remove('hidden');
  });
});

/* ── Feedback card (Engage section) ── */
const fcOpts   = document.querySelectorAll('.fc-opt');
const fcResult = document.getElementById('fc-result');
let fcVoted = false;

fcOpts.forEach(btn => {
  btn.addEventListener('click', () => {
    if (fcVoted) return;
    fcVoted = true;
    btn.classList.add('selected');
    fcOpts.forEach(b => { if (b !== btn) b.style.opacity = '0.35'; });
    setTimeout(() => {
      document.getElementById('fc-options').classList.add('hidden');
      if (fcResult) fcResult.classList.remove('hidden');
    }, 500);
  });
});

/* ── Try Concept button — smooth scroll to app screens ── */
const tryBtn = document.getElementById('try-concept-btn');
if (tryBtn) {
  tryBtn.addEventListener('click', () => {
    const target = document.getElementById('features');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ── Final CTA form submission ── */
const fcForm    = document.getElementById('fc-form');
const fcSuccess = document.getElementById('fc-form-success');

if (fcForm) {
  fcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailEl = document.getElementById('fc-email');
    if (!emailEl || !emailEl.value) return;

    fcForm.classList.add('hidden');
    if (fcSuccess) fcSuccess.classList.remove('hidden');
  });
}

/* ── Animate solution phone bars on scroll-into-view ── */
const spFills = document.querySelectorAll('.sp-fill, .fvb-fill');
const barObs  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
      e.target.style.width = e.target.classList.contains('fvb-fill') ? '68%' : '44%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
spFills.forEach(el => {
  el.style.width = '0';
  barObs.observe(el);
});

/* ── Poll bar initial widths reset on load ── */
document.querySelectorAll('.po-bar').forEach(bar => {
  bar.style.width = '0';
});
