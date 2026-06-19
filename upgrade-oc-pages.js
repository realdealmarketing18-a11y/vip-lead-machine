/**
 * VIP OC Pages — Design System v3 Upgrade
 * Adds:
 *  1. Desktop responsive CSS (900px+) — 2-3 col grids, 1180px container
 *  2. Color Visualizer section — 3 OC projects, 8 SW/BM schemes, draggable B/A
 *  3. Enhanced components — 3D coin steps, navy-border stats/testimonials
 */
const fs = require('fs');
process.chdir('C:/Users/Owner/VIP-Lead-Machine');

// ─── DESKTOP CSS TO INJECT (before </style>) ────────────────────────────────
const DESKTOP_CSS = `

/* ============================================================
   DESKTOP RESPONSIVE LAYOUT — Design System v3 (≥900px)
   Based on ui_kits/sales-page/index-print.html
   ============================================================ */
@media (min-width: 900px) {
  /* Page shell — full width on desktop */
  .page { max-width: none; box-shadow: none; }
  body { background: #fff; }

  /* Sections — wider padding */
  .sec { padding: 72px 56px; }

  /* TOPBAR — 3-col grid */
  .topbar { padding: 16px 56px; display: grid; grid-template-columns: auto 1fr auto; gap: 40px; }
  .top-nav { display: flex !important; justify-content: center; gap: 36px; }
  .top-nav a { font-size: 11.5px; }

  /* HERO — centered inner container */
  .hero-inner { max-width: 980px; margin: 0 auto; }
  .vip-h1 { font-size: 48px !important; }
  .vip-video { max-width: 980px; margin-left: auto; margin-right: auto; aspect-ratio: 16/9; border-radius: 18px; }
  .vip-badge-pair .vip-badge { width: 160px; }

  /* WHY SECTION — 2-col grid */
  .why-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; max-width: 1180px; margin: 0 auto; }

  /* PROCESS — 3-col grid */
  .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1180px; margin: 0 auto; }
  .vip-step { text-align: center; padding: 36px 28px 32px; }
  .vip-step__num {
    width: 80px; height: 80px; margin: 0 auto 22px;
    background:
      radial-gradient(120% 120% at 80% 95%, rgba(94,64,0,0.55) 0%, rgba(94,64,0,0) 50%),
      radial-gradient(120% 120% at 25% 18%, #FFF6CF 0%, #F8D979 22%, #E6BB48 46%, #C9A961 68%, #8A6D2E 100%);
    box-shadow:
      0 0 0 1px #5E4310, 0 0 0 2.5px #F2D896, 0 0 0 3.5px #4A380F,
      0 18px 32px rgba(168,138,71,0.50), 0 6px 14px rgba(168,138,71,0.40),
      inset 0 3px 4px rgba(255,255,255,0.65), inset 0 -3px 6px rgba(94,64,0,0.55);
    color: #5E4310;
    font-style: italic;
    position: relative;
  }
  .vip-step__num::before {
    content: ''; position: absolute; top: 10%; left: 16%; right: 16%; height: 38%;
    border-radius: 50%;
    background: radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.85), rgba(255,255,255,0) 70%);
    filter: blur(2px); pointer-events: none;
  }
  .vip-step__num { text-shadow: 0 1px 0 rgba(255,243,200,0.65), 0 -1px 0 rgba(60,40,0,0.55); }
  .vip-step__title { font-size: 22px; }

  /* CASE STUDIES — 2-col side by side */
  .cases-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; max-width: 1280px; margin: 0 auto; }
  .cases-grid > .stack { display: contents; }
  .case-article { background: #fff; color: #1A1F4E; border-radius: 20px; padding: 28px; box-shadow: 0 24px 60px rgba(0,0,0,0.18); border: 1px solid rgba(168,138,71,0.20); }

  /* TESTIMONIALS — 3-col grid, navy border */
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; max-width: 1280px; margin: 0 auto; }
  .vip-review {
    position: relative;
    border: 1.5px solid transparent !important;
    background: linear-gradient(#fff,#fff) padding-box, linear-gradient(180deg,#3A4078 0%,#1A1F4E 55%,#0C1130 100%) border-box !important;
    box-shadow: 0 0 0 1px rgba(12,17,48,0.18), 0 18px 40px rgba(26,31,78,0.16), inset 0 1px 0 rgba(255,255,255,0.65) !important;
  }
  .vip-review::before {
    content: ''; position: absolute; top: -1px; left: 24px; width: 50px; height: 3px;
    background: linear-gradient(180deg,#FFD080,#C9A961,#A88A47); border-radius: 0 0 4px 4px;
  }
  .vip-review__body { font-style: italic; padding-left: 28px; position: relative; }
  .vip-review__body::before { content: '\\201C'; position: absolute; left: 0; top: -8px; font-size: 44px; color: #C9A961; font-family: 'Fraunces',Georgia,serif; line-height: 0.8; }

  /* STATS — 4-col grid, navy border */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; max-width: 1180px; margin: 0 auto; }
  .vip-stat {
    position: relative;
    border: 1.5px solid transparent !important;
    background: linear-gradient(#fff,#fff) padding-box, linear-gradient(180deg,#3A4078 0%,#1A1F4E 55%,#0C1130 100%) border-box !important;
    box-shadow: 0 0 0 1px rgba(12,17,48,0.18), 0 22px 44px rgba(26,31,78,0.18), inset 0 1px 0 rgba(255,255,255,0.65) !important;
    text-align: center; padding: 32px 18px 26px;
  }
  .vip-stat::before {
    content: ''; position: absolute; top: -1px; left: 22px; width: 48px; height: 3px;
    background: linear-gradient(180deg,#FFD080,#C9A961,#A88A47); border-radius: 0 0 4px 4px;
  }
  .vip-stat__num { font-size: 60px; }
  .vip-stat__label { font-size: 15px; padding-top: 12px; border-top: 1px solid rgba(26,31,78,0.10); margin-top: 14px; }

  /* SERVICES — 3-col grid */
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; max-width: 1180px; margin: 0 auto; }

  /* OFFER CARDS — 3D medal-coin design */
  .offer-grid { gap: 18px; max-width: 980px; margin: 0 auto 14px; }
  .offer-card {
    background:
      radial-gradient(130% 130% at 82% 96%, rgba(94,64,0,0.45) 0%, rgba(94,64,0,0) 50%),
      radial-gradient(140% 140% at 22% 16%, #FFF6CF 0%, #F8D979 18%, #E6BB48 40%, #C9A961 64%, #8A6D2E 100%) !important;
    border: none !important;
    box-shadow:
      0 0 0 1px #5E4310, 0 0 0 2.5px #F2D896, 0 0 0 3.5px #4A380F,
      0 22px 40px rgba(168,138,71,0.50), 0 8px 18px rgba(168,138,71,0.36),
      inset 0 3px 4px rgba(255,255,255,0.65), inset 0 -3px 6px rgba(94,64,0,0.55) !important;
    transition: transform 360ms cubic-bezier(.22,1,.36,1);
    padding: 28px 18px 22px; border-radius: 12px; position: relative;
    overflow: visible;
  }
  .offer-card::before {
    content: ''; position: absolute; top: 6%; left: 12%; right: 12%; height: 38%;
    border-radius: 50%;
    background: radial-gradient(ellipse at 50% 28%, rgba(255,255,255,0.65), rgba(255,255,255,0) 70%);
    filter: blur(2.5px); pointer-events: none; z-index: 2;
  }
  .offer-card:hover { transform: translateY(-4px) scale(1.03); }
  .offer-amt {
    position: relative; z-index: 3;
    font-family: 'Fraunces',Georgia,serif; font-weight: 700; font-style: italic;
    font-size: 40px; color: #5E4310 !important; line-height: 1;
    text-shadow: 0 1px 0 rgba(255,243,200,0.75), 0 -1px 0 rgba(60,40,0,0.55);
  }
  .offer-amt span { color: #5E4310 !important; font-size: 13px !important; vertical-align: 8px !important; }
  .offer-desc { position: relative; z-index: 3; color: #3A2A08 !important; text-shadow: 0 1px 0 rgba(255,243,200,0.55); }
  .offer-val { color: #5E4310 !important; opacity: 0.82; }

  /* SCOPE — 3-col grid on desktop */
  .scope-list { grid-template-columns: 1fr 1fr 1fr; }

  /* WARRANTY SECTION — 2-col */
  .warranty-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; max-width: 1080px; margin: 0 auto; }

  /* WHAT WE DO — 2-col */
  .wwd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; max-width: 1180px; margin: 0 auto; }
  .photo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .photo-grid > div { border-radius: 16px; transition: transform 320ms cubic-bezier(.22,1,.36,1); }
  .photo-grid > div:hover { transform: scale(1.02); }

  /* FOOTER — 3-col */
  .footer-inner { display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: center; gap: 36px; max-width: 1180px; margin: 0 auto; }

  /* SECTION HEADS — centered max-width */
  .sec-head { text-align: center; max-width: 760px; margin: 0 auto 48px; }

  /* FINAL CTA */
  .final-cta-inner { max-width: 760px; margin: 0 auto; text-align: center; }
  .final-cta-inner .vip-cta { max-width: 480px; margin: 0 auto; padding: 20px 32px; font-size: 15px; }
}
`;

// ─── COLOR VISUALIZER SECTION HTML ─────────────────────────────────────────
const VISUALIZER_SECTION = `
  <!-- ============ COLOR VISUALIZATION SECTION ============ -->
  <section class="sec cream" id="viz" style="padding-bottom:56px;">
    <div style="text-align:center;margin-bottom:28px;">
      <div class="vip-overline">VIP Custom Visualization Service</div>
      <h2 class="vip-h2" style="font-size:32px;margin-bottom:12px;">See Your Home <em class="vip-accent">Painted</em> — Before A Single Brushstroke</h2>
      <p class="vip-body" style="max-width:520px;margin:0 auto;">Drag the gold handle. Tap a palette. Our design team renders your exact home in 30 minutes — so you commit with certainty, not guesswork.</p>
    </div>

    <!-- Project pills -->
    <div id="viz-projects" style="display:flex;gap:8px;overflow-x:auto;padding:4px 2px 16px;margin-bottom:22px;scrollbar-width:none;"></div>

    <!-- Compare canvas -->
    <div id="viz-card" style="position:relative;border-radius:22px;overflow:hidden;box-shadow:0 14px 34px rgba(26,31,78,0.18),0 2px 8px rgba(26,31,78,0.10);border:1.5px solid rgba(26,31,78,0.10);background:#1A1840;aspect-ratio:4/5;user-select:none;-webkit-user-select:none;">
      <div id="viz-before" style="position:absolute;inset:0;background-size:cover;background-position:center;z-index:1;"></div>
      <div id="viz-after"  style="position:absolute;inset:0;background-size:cover;background-position:center;z-index:2;clip-path:inset(0 0 0 50%);transition:clip-path 60ms linear;"></div>

      <div id="viz-rail" style="position:absolute;inset:0;z-index:4;cursor:ew-resize;touch-action:none;">
        <div id="viz-handle" style="position:absolute;top:0;bottom:0;width:3px;left:50%;transform:translateX(-50%);background:linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.6));box-shadow:0 0 0 1px rgba(26,31,78,0.10),0 6px 24px rgba(0,0,0,0.35);pointer-events:none;">
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#E8CC85 0%,#C9A961 60%,#A88A47 100%);box-shadow:0 8px 24px rgba(201,169,97,0.45),0 2px 6px rgba(26,31,78,0.25),inset 0 1px 0 rgba(255,255,255,0.35);display:flex;align-items:center;justify-content:center;color:#fff;">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/><polyline points="9 6 15 12 9 18" transform="translate(6 0)"/></svg>
          </div>
        </div>
      </div>

      <div style="position:absolute;top:16px;left:16px;z-index:5;background:rgba(26,24,64,0.72);backdrop-filter:blur(10px);color:#fff;font-family:'Inter',sans-serif;font-weight:700;font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;padding:7px 14px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);">Before</div>
      <div style="position:absolute;top:16px;right:16px;z-index:5;background:rgba(201,169,97,0.92);color:#fff;font-family:'Inter',sans-serif;font-weight:700;font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;padding:7px 14px;border-radius:999px;border:1px solid rgba(255,255,255,0.30);">After</div>

      <div style="position:absolute;left:16px;right:16px;bottom:16px;z-index:5;display:flex;justify-content:space-between;align-items:flex-end;color:#fff;pointer-events:none;">
        <div>
          <div id="viz-cap-city" style="font-family:'Inter',sans-serif;font-weight:600;font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;"></div>
          <div id="viz-cap-name" style="font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:22px;line-height:1.05;text-shadow:0 4px 14px rgba(0,0,0,0.45);margin-top:4px;"></div>
        </div>
        <div id="viz-cap-dur" style="text-align:right;font-family:'Inter',sans-serif;font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;font-weight:600;padding-bottom:2px;"></div>
      </div>
    </div>

    <!-- Scheme picker card -->
    <div style="margin-top:22px;background:#fff;border-radius:20px;border:1px solid rgba(26,31,78,0.08);padding:20px;box-shadow:0 10px 26px rgba(26,31,78,0.12);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <div style="font-family:'Inter',sans-serif;font-weight:700;font-size:10.5px;letter-spacing:0.20em;text-transform:uppercase;color:#1A1F4E;">Choose A Color Scheme</div>
        <div id="viz-cur-name" style="font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:14px;color:#C9A961;font-style:italic;line-height:1.1;"></div>
      </div>
      <div id="viz-schemes" style="display:flex;gap:10px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px;"></div>

      <div style="display:flex;gap:10px;margin-top:16px;">
        <button id="viz-reset" style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:12px 14px;border-radius:999px;background:#F8F7F4;border:1px solid rgba(26,31,78,0.10);color:#1A1F4E;font-family:'Inter',sans-serif;font-weight:700;font-size:11.5px;letter-spacing:0.14em;text-transform:uppercase;cursor:pointer;transition:all 220ms;">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Reset
        </button>
        <button id="viz-auto" style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:12px 14px;border-radius:999px;background:#F8F7F4;border:1px solid rgba(26,31,78,0.10);color:#1A1F4E;font-family:'Inter',sans-serif;font-weight:700;font-size:11.5px;letter-spacing:0.14em;text-transform:uppercase;cursor:pointer;transition:all 220ms;">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Auto Sweep
        </button>
      </div>

      <a href="#quote" style="display:block;width:100%;padding:18px 22px;margin-top:18px;background:linear-gradient(135deg,#E8CC85 0%,#C9A961 60%,#A88A47 100%);color:#fff;font-family:'Inter',sans-serif;font-weight:700;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;text-align:center;border:none;border-radius:999px;cursor:pointer;box-shadow:0 8px 24px rgba(201,169,97,0.35);line-height:1.3;text-decoration:none;">
        Render My Home Free
        <span style="display:block;font-size:10.5px;font-weight:500;letter-spacing:0.10em;opacity:0.94;margin-top:5px;font-style:italic;text-transform:none;">FREE 30-Minute Color Consultation Included</span>
      </a>
      <div style="text-align:center;font-size:11.5px;color:#8a8aa3;margin-top:12px;letter-spacing:0.04em;">Trusted by <strong style="color:#C9A961;font-weight:700;">120+ SoCal homeowners</strong> · No obligation</div>
    </div>
  </section>

  <script>
  /* ── Color Visualizer ──────────────────────────────────── */
  (function() {
    var PROJECTS = [
      { id:'nb',      initials:'GF', name:'The Gallagher Family', city:'Pelican Hill · Newport Beach', duration:'5-Day Transform',
        before:'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=900&auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop&q=80' },
      { id:'irvine',  initials:'NK', name:'The Nakamura Family', city:'Shady Canyon · Irvine', duration:'5-Day Transform',
        before:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop&q=80' },
      { id:'cc',      initials:'AF', name:'The Ashworth Family', city:'Crystal Cove · Newport Coast', duration:'In Just 5 Days',
        before:'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=900&auto=format&fit=crop&q=80',
        after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80' }
    ];
    var SCHEMES = [
      { id:'greige',   name:'Greige Estate',   sw:'SW Accessible Beige', main:'#C7B89F', trim:'#F2EDE5', accent:'#3A4A6B' },
      { id:'sage',     name:'Sierra Sage',     sw:'BM Sea Salt',         main:'#A8B19E', trim:'#EFEDE6', accent:'#1F3D33' },
      { id:'sand',     name:'Coastal Sand',    sw:'SW Natural Linen',    main:'#D9C5A0', trim:'#FFFFFF', accent:'#2A4456' },
      { id:'fog',      name:'Newport Fog',     sw:'SW Repose Gray',      main:'#B6B7B0', trim:'#ECEAE2', accent:'#1A1840' },
      { id:'bronze',   name:'Bronze Manor',    sw:'BM Wenge',            main:'#7E6A55', trim:'#E8DFD0', accent:'#C9A961' },
      { id:'shadow',   name:'Shadow Slate',    sw:'SW Iron Ore',         main:'#3D4045', trim:'#D9D5CC', accent:'#C9A961' },
      { id:'cashmere', name:'Cashmere Cream',  sw:'BM White Dove',       main:'#EAE3D2', trim:'#FFFFFF', accent:'#3D3B5F' },
      { id:'navy',     name:'Estate Navy',     sw:'SW Naval',            main:'#2B3A55', trim:'#E8DFD0', accent:'#C9A961' }
    ];

    var proj = PROJECTS[0], scheme = SCHEMES[0], pos = 50, autoTimer = null;

    var $ps = document.getElementById('viz-projects');
    var $sc = document.getElementById('viz-schemes');
    var $card = document.getElementById('viz-card');
    var $rail = document.getElementById('viz-rail');
    var $handle = document.getElementById('viz-handle');
    var $before = document.getElementById('viz-before');
    var $after  = document.getElementById('viz-after');
    var $capCity = document.getElementById('viz-cap-city');
    var $capName = document.getElementById('viz-cap-name');
    var $capDur  = document.getElementById('viz-cap-dur');
    var $curName = document.getElementById('viz-cur-name');

    function setPos(p) {
      pos = Math.max(0, Math.min(100, p));
      $after.style.clipPath = 'inset(0 0 0 '+pos+'%)';
      $handle.style.left = pos+'%';
    }

    function applyProject() {
      $before.style.backgroundImage = 'url(\''+proj.before+'\')';
      $after.style.backgroundImage  = 'url(\''+proj.after+'\')';
      $capCity.textContent = proj.city;
      $capName.textContent = proj.name;
      $capDur.textContent  = proj.duration;
    }

    function applyScheme() {
      $after.style.setProperty('--tint-color', scheme.main);
      $after.classList.add('viz-tint');
      $curName.textContent = scheme.name + ' · ' + scheme.sw;
    }

    function renderProjects() {
      $ps.innerHTML = '';
      PROJECTS.forEach(function(p) {
        var el = document.createElement('button');
        el.style.cssText = 'flex-shrink:0;display:inline-flex;align-items:center;gap:8px;padding:8px 14px 8px 8px;border-radius:999px;background:'+(p.id===proj.id?'linear-gradient(180deg,#FFF7EE,#FFFFFF)':'#fff')+';border:1px solid '+(p.id===proj.id?'#C9A961':'rgba(26,31,78,0.10)')+';box-shadow:'+(p.id===proj.id?'0 10px 26px rgba(26,31,78,0.12)':'0 1px 3px rgba(26,31,78,0.06)')+';cursor:pointer;font-family:Inter,sans-serif;font-size:12px;font-weight:600;color:#1A1F4E;white-space:nowrap;transition:all 220ms;';
        el.innerHTML = '<span style="width:28px;height:28px;border-radius:50%;background:'+(p.id===proj.id?'linear-gradient(135deg,#E8CC85,#C9A961)':'linear-gradient(180deg,#1A1F4E,#1A1840)')+';color:#fff;font-family:Fraunces,Georgia,serif;font-weight:600;font-size:11px;display:flex;align-items:center;justify-content:center;">'+p.initials+'</span><span style="display:flex;flex-direction:column;gap:0;line-height:1.1;text-align:left;"><span>'+p.name+'</span><span style="font-size:10px;color:#8a8aa3;font-weight:500;letter-spacing:0.04em;">'+p.city+'</span></span>';
        el.addEventListener('click', function() { proj = p; renderProjects(); applyProject(); });
        $ps.appendChild(el);
      });
    }

    function renderSchemes() {
      $sc.innerHTML = '';
      SCHEMES.forEach(function(s) {
        var el = document.createElement('div');
        el.style.cssText = 'flex-shrink:0;cursor:pointer;width:92px;transition:transform 220ms;';
        el.innerHTML = '<div style="height:64px;border-radius:14px;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;border:1px solid rgba(26,31,78,0.10);box-shadow:'+(s.id===scheme.id?'0 0 0 2px #C9A961,0 10px 26px rgba(26,31,78,0.12)':'0 4px 10px rgba(26,31,78,0.08)')+'"><div style="background:'+s.main+';"></div><div style="background:'+s.trim+';"></div><div style="grid-column:1/span 2;height:22px;background:'+s.accent+';"></div></div><div style="font-family:Fraunces,Georgia,serif;font-weight:600;font-size:12px;color:#1A1F4E;margin-top:8px;line-height:1.2;text-align:center;">'+s.name+'</div><div style="font-family:Inter,sans-serif;font-size:9.5px;color:#8a8aa3;letter-spacing:0.06em;text-align:center;margin-top:2px;">'+s.sw+'</div>';
        el.addEventListener('mouseenter', function() { el.style.transform = 'translateY(-3px)'; });
        el.addEventListener('mouseleave', function() { el.style.transform = ''; });
        el.addEventListener('click', function() { scheme = s; renderSchemes(); applyScheme(); });
        $sc.appendChild(el);
      });
    }

    /* Drag */
    var dragging = false;
    function onDrag(cx) { var r = $card.getBoundingClientRect(); setPos(((cx-r.left)/r.width)*100); }
    $rail.addEventListener('mousedown', function(e){dragging=true;onDrag(e.clientX);});
    window.addEventListener('mousemove', function(e){if(dragging)onDrag(e.clientX);});
    window.addEventListener('mouseup', function(){dragging=false;});
    $rail.addEventListener('touchstart', function(e){dragging=true;onDrag(e.touches[0].clientX);},{passive:true});
    window.addEventListener('touchmove', function(e){if(dragging)onDrag(e.touches[0].clientX);},{passive:true});
    window.addEventListener('touchend', function(){dragging=false;});

    /* Auto sweep */
    document.getElementById('viz-auto').addEventListener('click', function(){
      if(autoTimer){clearInterval(autoTimer);autoTimer=null;return;}
      var dir = pos>50?-1:1;
      autoTimer = setInterval(function(){
        var next=pos+dir*1.5;
        if(next>=95)dir=-1; if(next<=5)dir=1;
        setPos(next);
      },24);
      setTimeout(function(){if(autoTimer){clearInterval(autoTimer);autoTimer=null;}},6000);
    });
    document.getElementById('viz-reset').addEventListener('click', function(){
      setPos(50);
      if(autoTimer){clearInterval(autoTimer);autoTimer=null;}
    });

    /* Tint via pseudo-elements needs inline styles on the element */
    var style = document.createElement('style');
    style.textContent = '#viz-after.viz-tint::before{content:"";position:absolute;inset:0;mix-blend-mode:multiply;background:var(--tint-color,#BAAEA1);opacity:0.78;}#viz-after.viz-tint::after{content:"";position:absolute;inset:0;mix-blend-mode:soft-light;background:var(--tint-color,#BAAEA1);opacity:0.6;}';
    document.head.appendChild(style);

    /* Init */
    renderProjects(); renderSchemes(); applyProject(); applyScheme(); setPos(50);
    setTimeout(function(){
      var seq=[50,38,50,62,50],i=0;
      (function tick(){if(i>=seq.length)return;setPos(seq[i++]);setTimeout(tick,320);})();
    },600);
  })();
  </script>
`;

// ─── RESTRUCTURE HELPERS ────────────────────────────────────────────────────

// Wrap the process steps .stack in a .steps-grid div
function wrapProcessSteps(html) {
  // Find the process section and wrap the steps in a grid container
  return html.replace(
    /(<section id="process" class="sec">[\s\S]*?<div class="stack" style="margin-top:32px;">)([\s\S]*?)(<\/div>\s*<\/section>)/,
    '$1<div class="steps-grid">$2</div></div></section>'
  );
}

// Wrap testimonials in a testi-grid div
function wrapTestimonials(html) {
  return html.replace(
    /(<div class="stack center" style="margin-bottom:26px;">[\s\S]*?<\/div>\s*)((?:<div class="vip-review">[\s\S]*?<\/div>\s*){3})(\s*<\/div>\s*<\/section>)/,
    '$1<div class="testi-grid">$2</div>$3'
  );
}

// Wrap stats in a stats-grid div
function wrapStats(html) {
  return html.replace(
    /(<section class="sec cream">[\s\S]*?<div class="stack">)([\s\S]*?)(<\/div>\s*<\/section>)/,
    function(match, p1, p2, p3) {
      if (!p2.includes('vip-stat')) return match;
      return p1 + '<div class="stats-grid">' + p2 + '</div>' + p3;
    }
  );
}

// Wrap services in services-grid div
function wrapServices(html) {
  return html.replace(
    /(<div class="stack">\s*<div class="vip-overline">Our \w[\w\s]+ Home Painting Service<\/div>[\s\S]*?<h2[\s\S]*?<\/h2>)([\s\S]*?)(<\/div>\s*<\/section>)/,
    function(match, p1, p2, p3) {
      if (!p2.includes('vip-service')) return match;
      return p1 + '<div class="services-grid">' + p2.trim().replace(/(<\/div>)\s*(<\/div>)$/, '$1') + '</div>' + p3;
    }
  );
}

// ─── APPLY UPGRADES ─────────────────────────────────────────────────────────
const OC_PAGES = [
  'VIP_Newport_Beach_SalesPage_20260527.html',
  'VIP_Newport_Coast_SalesPage_20260527.html',
  'VIP_Irvine_SalesPage_20260527.html',
  'VIP_Coto_de_Caza_SalesPage_20260527.html',
  'VIP_Ladera_Ranch_SalesPage_20260527.html',
  'VIP_Hidden_Hills_SalesPage_20260527.html',
];

OC_PAGES.forEach(function(filename) {
  var html = fs.readFileSync(filename, 'utf8');

  if (html.includes('DESKTOP RESPONSIVE LAYOUT')) {
    console.log('✅ Already upgraded (skipped):', filename);
    return;
  }

  // 1. Add desktop CSS before </style>
  html = html.replace('</style>', DESKTOP_CSS + '\n</style>');

  // 2. Insert color visualizer after the accent band
  // Insert visualizer AFTER the hero section, before the accent-band
  html = html.replace(
    /(<div class="accent-band">)/,
    VISUALIZER_SECTION + '\n\n  $1'
  );

  // 3. Add hero-inner wrapper for desktop centering
  html = html.replace(
    '<div class="stack center" style="margin-top:36px;">',
    '<div class="hero-inner"><div class="stack center" style="margin-top:36px;">'
  );
  // Close it before end of hero section
  html = html.replace(
    /(<\/div>\s*<\/section>\s*\n\s*<!--.*?ACCENT)/,
    '</div>$1'
  );

  // 4. Wrap stats in stats-grid
  // Find the stats section (cream) and wrap vip-stat cards
  html = html.replace(
    /(<section class="sec cream">\s*<div class="stack">)([\s\S]*?)(<\/div>\s*<\/section>)/g,
    function(match, p1, p2, p3) {
      if (!p2.includes('vip-stat__num')) return match;
      return p1 + '<div class="stats-grid">' + p2 + '</div>' + p3;
    }
  );

  // 5. Wrap testimonials in testi-grid
  html = html.replace(
    /(<section class="sec">\s*<div class="stack center" style="margin-bottom:26px;">[\s\S]*?<\/div>)([\s\S]*?)(<\/section>)/g,
    function(match, p1, p2, p3) {
      if (!p2.includes('vip-review')) return match;
      return p1 + '<div class="testi-grid">' + p2 + '</div>' + p3;
    }
  );

  // 6. Wrap process steps in steps-grid
  html = html.replace(
    /(<div class="stack" style="margin-top:32px;">)([\s\S]*?)(<\/div>\s*<\/section>)/,
    function(match, p1, p2, p3) {
      if (!p2.includes('vip-step__num')) return match;
      return '<div class="steps-grid">' + p2 + '</div>' + p3;
    }
  );

  // 7. Wrap services in services-grid
  html = html.replace(
    /(<div class="vip-service">[\s\S]*?<\/div>\s*<div class="vip-service">[\s\S]*?<\/div>\s*<div class="vip-service">[\s\S]*?<\/div>)/,
    '<div class="services-grid">$1</div>'
  );

  fs.writeFileSync(filename, html, 'utf8');
  console.log('✅ Upgraded:', filename);
});

console.log('\n✅ All 6 OC pages upgraded with:');
console.log('   • Desktop responsive CSS (900px+)');
console.log('   • Color Visualizer section (3 OC projects, 8 SW/BM schemes)');
console.log('   • 3D gold coin step numbers');
console.log('   • Navy gradient bordered testimonials & stats');
console.log('   • 2-3 column grid layouts on desktop');
