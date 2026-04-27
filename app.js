// ═══════════════════════════════════════════════════════════
//   daBeast — APP.JS  v2.0  (completo y funcional)
// ═══════════════════════════════════════════════════════════

'use strict';

// ──────────── STATE GLOBAL ────────────
const STATE = {
  soundEnabled: false,
  activeSection: 'home',
  exerciseTimer: { id: null, seconds: 0, total: 0, running: false },
  globalTimer:   { id: null, seconds: 0, running: false },
  diet: { category: 'all', tags: [] },
  audioCtx: null,
};

// ──────────── DOM READY ────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSound();
  initNavigation();
  initQuote();
  loadAndUpdateStats();
  renderExercises();
  renderRecipes();
  renderProgress();
  renderBadges();
  updateStreakBar();
  initDietFilters();
  initGlobalTimer();
  initProgressCharts();
  showWelcomeMsg();
  injectConfettiCSS();

  // Cerrar modal con click fuera
  document.getElementById('recipeModal')?.addEventListener('click', e => {
    if (e.target.id === 'recipeModal') closeModal();
  });

  // Enter para chat
  document.getElementById('chatInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
    playSound('click');
    // Re-dibujar sparklines con nuevo color
    setTimeout(initProgressCharts, 100);
  });
});

// ════════════════════════════════════════════
//  TEMA (Light / Dark)
// ════════════════════════════════════════════
function initTheme() {
  const saved = localStorage.getItem('dabeast-theme') || 'light';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('dabeast-theme', theme);
}

// ════════════════════════════════════════════
//  SONIDOS
// ════════════════════════════════════════════
function initSound() {
  document.getElementById('soundToggle')?.addEventListener('click', () => {
    STATE.soundEnabled = !STATE.soundEnabled;
    document.getElementById('soundToggle').textContent = STATE.soundEnabled ? '🔊' : '🔇';
    if (!STATE.audioCtx) STATE.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (STATE.soundEnabled) playSound('enable');
  });
}

function playSound(type) {
  if (!STATE.soundEnabled) return;
  try {
    if (!STATE.audioCtx) STATE.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = STATE.audioCtx;
    const SOUNDS = {
      click:     { freqs:[600],               dur:0.06,  wave:'square'   },
      save:      { freqs:[523, 659, 784],      dur:0.09,  wave:'sine'     },
      complete:  { freqs:[330, 415, 494, 659], dur:0.13,  wave:'triangle' },
      timer_end: { freqs:[880, 660, 440, 330], dur:0.18,  wave:'square'   },
      badge:     { freqs:[523, 784, 1047],     dur:0.15,  wave:'sine'     },
      enable:    { freqs:[440, 550],           dur:0.10,  wave:'sine'     },
      nav:       { freqs:[350],               dur:0.05,  wave:'sine'     },
    };
    const s = SOUNDS[type] || SOUNDS.click;
    s.freqs.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = s.wave;
      const t = ctx.currentTime + i * s.dur;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + s.dur);
      osc.start(t);
      osc.stop(t + s.dur + 0.01);
    });
  } catch(e) { /* silence on error */ }
}

// ════════════════════════════════════════════
//  NAVEGACIÓN SPA
// ════════════════════════════════════════════
function initNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const sec = link.dataset.section;
      if (sec) { navigateTo(sec); closeMobileMenu(); }
    });
  });

  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('navLinks')?.classList.toggle('open');
  });

  // Cerrar menú al click afuera
  document.addEventListener('click', e => {
    const nav = document.getElementById('navLinks');
    const ham = document.getElementById('hamburger');
    if (nav && ham && !nav.contains(e.target) && !ham.contains(e.target)) {
      nav.classList.remove('open');
    }
  });

  // Mostrar sección inicial
  navigateTo('home', false);
}

function navigateTo(sectionId, animate = true) {
  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  const target = document.getElementById(sectionId);
  if (!target) return;

  target.style.display = 'block';
  requestAnimationFrame(() => {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: animate ? 'smooth' : 'auto' });
  });

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === sectionId);
  });

  STATE.activeSection = sectionId;
  playSound('nav');

  if (sectionId === 'progress') setTimeout(initProgressCharts, 150);
}

function closeMobileMenu() {
  document.getElementById('navLinks')?.classList.remove('open');
}

// ════════════════════════════════════════════
//  FRASES MOTIVACIONALES
// ════════════════════════════════════════════
function initQuote() {
  const el = document.getElementById('heroQuote');
  if (!el) return;
  function setQuote() {
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = `"${randomItem(QUOTES)}"`;
      el.style.transition = 'opacity 0.8s ease';
      el.style.opacity = '1';
    }, 400);
  }
  setQuote();
  setInterval(setQuote, 9000);
}

// ════════════════════════════════════════════
//  EJERCICIOS — RENDER
// ════════════════════════════════════════════
function renderExercises() {
  ['day1','day2','day3'].forEach(day => {
    const container = document.getElementById(`exercises-${day}`);
    if (!container) return;
    container.innerHTML = '';
    (EXERCISES[day] || []).forEach(ex => container.appendChild(buildExerciseCard(ex, day)));
  });

  // Tabs
  document.querySelectorAll('.day-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.day-content').forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
      });
      tab.classList.add('active');
      const dayEl = document.getElementById(tab.dataset.day);
      if (dayEl) { dayEl.style.display = 'block'; dayEl.classList.add('active'); }
      playSound('click');
    });
  });

  // Mostrar día 1 por defecto
  const d1 = document.getElementById('day1');
  if (d1) { d1.style.display = 'block'; d1.classList.add('active'); }
}

function buildExerciseCard(ex, day) {
  const savedWeight = getWeight(ex.id) ?? ex.defaultWeight;
  const savedWeeks  = getWeeklyProgress(ex.id);

  const card = document.createElement('div');
  card.className = 'exercise-card';
  card.dataset.exerciseId = ex.id;

  card.innerHTML = `
    <div class="ex-header">
      <div class="ex-info">
        <h4 class="ex-name">${ex.name}</h4>
        <span class="ex-muscle">${ex.muscle}</span>
      </div>
      <div class="ex-meta">
        <span class="ex-badge">🔁 ${ex.sets} series</span>
        <span class="ex-badge">💥 ${ex.reps} reps</span>
        <span class="ex-badge">😮‍💨 ${ex.rest}s desc.</span>
      </div>
    </div>

    <div class="ex-weight-row">
      <label>⚖️ Peso usado:</label>
      <div class="weight-controls">
        <button class="weight-btn" onclick="adjustWeight('${ex.id}',-2.5)" title="−2.5kg">−</button>
        <input type="number" class="weight-input" id="weight-${ex.id}"
               value="${savedWeight}" step="2.5" min="0"
               onchange="saveWeight('${ex.id}',this.value)" />
        <button class="weight-btn" onclick="adjustWeight('${ex.id}',2.5)" title="+2.5kg">+</button>
        <span class="weight-unit">kg</span>
      </div>
    </div>

    <div class="ex-weekly">
      <label>📊 Carga por semana:</label>
      <div class="weekly-grid">
        ${[1,2,3,4].map(w => `
          <div class="week-cell">
            <span>Sem ${w}</span>
            <input type="number" class="week-input" id="week-${ex.id}-${w}"
                   value="${savedWeeks[w-1] || ''}" placeholder="kg"
                   onchange="saveWeeklyProgress('${ex.id}',${w},this.value)" />
          </div>`).join('')}
      </div>
    </div>

    <div class="ex-actions">
      <button class="btn-timer" onclick="startExerciseTimer(${ex.rest},'${ex.name}')">
        ⏱️ Descanso ${ex.rest}s
      </button>
      <button class="btn-detail" id="techbtn-${ex.id}" onclick="toggleTechnique('${ex.id}',this)">
        📖 Cómo se hace ▾
      </button>
    </div>

    <div class="ex-technique hidden" id="technique-${ex.id}">
      <div class="technique-grid">
        ${buildTechniqueItems(ex.technique)}
      </div>
    </div>
  `;
  return card;
}

function buildTechniqueItems(tech) {
  const items = [
    { icon:'🧍', title:'Postura',          text: tech.postura      },
    { icon:'✋', title:'Agarre',            text: tech.agarre       },
    { icon:'💨', title:'Respiración',       text: tech.respiracion  },
    { icon:'⚠️', title:'Errores comunes',  text: tech.errores      },
    { icon:'🛡️', title:'Seguridad',        text: tech.seguridad    },
    { icon:'✅', title:'Técnica correcta',  text: tech.tecnica      },
  ];
  return items.map(i => `
    <div class="technique-item">
      <div class="technique-icon">${i.icon}</div>
      <h5>${i.title}</h5>
      <p>${i.text}</p>
    </div>`).join('');
}

function toggleTechnique(id, btn) {
  const el = document.getElementById(`technique-${id}`);
  if (!el) return;
  const isHidden = el.classList.contains('hidden');
  el.classList.toggle('hidden', !isHidden);
  if (btn) btn.textContent = isHidden ? '📖 Cómo se hace ▴' : '📖 Cómo se hace ▾';
  playSound('click');
}

// ── Peso ──
function adjustWeight(id, delta) {
  const input = document.getElementById(`weight-${id}`);
  if (!input) return;
  const val = Math.max(0, Math.round(((parseFloat(input.value) || 0) + delta) * 4) / 4);
  input.value = val;
  saveWeight(id, val);
}

function saveWeight(id, raw) {
  const value = parseFloat(raw) || 0;
  const weights = getStore('dabeast-weights');
  weights[id] = value;
  setStore('dabeast-weights', weights);
  appendHistory(id, value);
  showToast('💾 Peso guardado!');
  playSound('save');
  if (STATE.activeSection === 'progress') refreshExerciseHistoryUI();
}

function getWeight(id) {
  const w = getStore('dabeast-weights')[id];
  return w !== undefined ? w : null;
}

function saveWeeklyProgress(id, week, raw) {
  const value = parseFloat(raw) || 0;
  const key   = `dabeast-weekly-${id}`;
  const data  = JSON.parse(localStorage.getItem(key) || '[null,null,null,null]');
  data[week - 1] = value;
  localStorage.setItem(key, JSON.stringify(data));
  showToast('📊 Progreso semanal guardado!');
  playSound('save');
}

function getWeeklyProgress(id) {
  return JSON.parse(localStorage.getItem(`dabeast-weekly-${id}`) || '[null,null,null,null]');
}

function appendHistory(id, value) {
  const key = 'dabeast-history';
  const h   = getStore(key);
  if (!h[id]) h[id] = [];
  h[id].push({ date: todayStr(), ts: Date.now(), weight: value });
  if (h[id].length > 30) h[id] = h[id].slice(-30);
  setStore(key, h);
}

// ════════════════════════════════════════════
//  COMPLETAR DÍA
// ════════════════════════════════════════════
function completeDay(dayNum) {
  const today     = todayStr();
  const store     = getStore('dabeast-completed-days');
  const list      = Array.isArray(store.list) ? store.list : [];

  if (list.includes(today)) {
    showToast('✅ Ya marcaste hoy — ¡Sigue así!');
    return;
  }

  list.push(today);
  setStore('dabeast-completed-days', { list });

  const stats = getStats();
  stats.total = (stats.total || 0) + 1;
  setStats(stats);

  recalcStreak();
  updateStreakBar();
  renderProgress();
  renderBadges();

  playSound('complete');
  showToast(randomItem(COMPLETION_MSGS));
  spawnPixelConfetti();
}

const COMPLETION_MSGS = [
  '🔥 ¡Bestia! Otro día en el libro.',
  '💪 ¡Sí señor! Un paso más cerca.',
  '⚡ Día completado. La racha sigue.',
  '🏆 Consistencia pura. Eso es todo.',
  '🌟 ¡Sesión registrada! Seguí así.',
  '🚀 ¡Modo bestia! Mañana más.',
  '🎮 +1 EXP — Estás subiendo de nivel.',
  '🦁 Nadie te para. Absolutamente nadie.',
  '✨ Lo hiciste cuando no querías. Eso vale doble.',
];

// ════════════════════════════════════════════
//  TIMERS
// ════════════════════════════════════════════

/* ── Timer de ejercicio (overlay) ── */
function startExerciseTimer(seconds, exerciseName) {
  const overlay = document.getElementById('timerOverlay');
  if (!overlay) return;

  if (STATE.exerciseTimer.id) clearInterval(STATE.exerciseTimer.id);
  STATE.exerciseTimer.seconds = seconds;
  STATE.exerciseTimer.total   = seconds;
  STATE.exerciseTimer.running = true;

  const labelEl = document.getElementById('timerExLabel');
  if (labelEl) labelEl.textContent = exerciseName ? `Descansando — ${exerciseName}` : 'Descanso';

  overlay.classList.remove('hidden');
  _updateExTimerUI();

  STATE.exerciseTimer.id = setInterval(() => {
    if (!STATE.exerciseTimer.running) return;
    STATE.exerciseTimer.seconds--;
    _updateExTimerUI();
    if (STATE.exerciseTimer.seconds <= 0) {
      clearInterval(STATE.exerciseTimer.id);
      STATE.exerciseTimer.running = false;
      playSound('timer_end');
      const timerEl = document.getElementById('timerBig');
      if (timerEl) { timerEl.textContent = '¡GO!'; timerEl.style.color = '#34D399'; }
      showToast('⏰ ¡A por la siguiente serie!');
      setTimeout(closeExerciseTimer, 1600);
    }
  }, 1000);
  playSound('click');
}

function _updateExTimerUI() {
  const s = STATE.exerciseTimer.seconds;
  const t = STATE.exerciseTimer.total;
  const timerEl = document.getElementById('timerBig');
  const ringEl  = document.getElementById('timerRing');

  if (timerEl) {
    const m   = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    timerEl.textContent = t >= 60 ? `${m}:${sec}` : String(s);
    const pct = s / t;
    timerEl.style.color = pct > 0.5 ? 'var(--accent2)' : pct > 0.25 ? 'var(--peach-deep)' : '#F87171';
  }
  if (ringEl) {
    const circ = 2 * Math.PI * 45;
    ringEl.style.strokeDasharray  = circ;
    ringEl.style.strokeDashoffset = circ * (s / t);
  }
}

function closeExerciseTimer() {
  if (STATE.exerciseTimer.id) clearInterval(STATE.exerciseTimer.id);
  STATE.exerciseTimer.running = false;
  document.getElementById('timerOverlay')?.classList.add('hidden');
}

function pauseExerciseTimer() {
  STATE.exerciseTimer.running = !STATE.exerciseTimer.running;
  const btn = document.getElementById('timerPauseBtn');
  if (btn) btn.textContent = STATE.exerciseTimer.running ? '⏸ Pausar' : '▶ Continuar';
}

/* ── Timer global (Herramientas) ── */
function initGlobalTimer() {
  updateGlobalTimerDisplay();
}

function startGlobalTimer(seconds) {
  if (STATE.globalTimer.id) clearInterval(STATE.globalTimer.id);
  STATE.globalTimer.seconds = seconds;
  STATE.globalTimer.running = true;
  updateGlobalTimerDisplay();

  STATE.globalTimer.id = setInterval(() => {
    if (!STATE.globalTimer.running) return;
    STATE.globalTimer.seconds--;
    updateGlobalTimerDisplay();
    if (STATE.globalTimer.seconds <= 0) {
      clearInterval(STATE.globalTimer.id);
      STATE.globalTimer.running = false;
      playSound('timer_end');
      showToast('⏰ ¡Tiempo cumplido!');
      spawnPixelConfetti();
    }
  }, 1000);
  playSound('click');
}

function startCustomTimer() {
  const val = parseInt(document.getElementById('customTimerInput')?.value || '0');
  if (val > 0 && val <= 7200) startGlobalTimer(val);
  else showToast('⚠️ Ingresá entre 1 y 7200 segundos');
}

function pauseGlobalTimer() {
  STATE.globalTimer.running = !STATE.globalTimer.running;
  updateGlobalTimerDisplay();
}

function resetGlobalTimer() {
  if (STATE.globalTimer.id) clearInterval(STATE.globalTimer.id);
  STATE.globalTimer.seconds = 0;
  STATE.globalTimer.running = false;
  updateGlobalTimerDisplay();
}

function updateGlobalTimerDisplay() {
  const el = document.getElementById('globalTimerDisplay');
  if (!el) return;
  const s   = STATE.globalTimer.seconds;
  const m   = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  el.textContent = `${m}:${sec}`;
  el.style.color = (!STATE.globalTimer.running || s > 10) ? 'var(--accent)' : '#F87171';
}

// ════════════════════════════════════════════
//  DIETA / RECETAS
// ════════════════════════════════════════════
function initDietFilters() {
  // Botones de categoría
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.diet.category = btn.dataset.filter;
      renderRecipes();
      playSound('click');
    });
  });

  // Tags
  document.querySelectorAll('.tag-filter').forEach(tag => {
    tag.addEventListener('click', () => {
      const t = tag.dataset.tag;
      tag.classList.toggle('active');
      STATE.diet.tags = tag.classList.contains('active')
        ? [...STATE.diet.tags, t]
        : STATE.diet.tags.filter(x => x !== t);
      renderRecipes();
    });
  });
}

function renderRecipes() {
  const grid = document.getElementById('recipesGrid');
  if (!grid) return;

  const filtered = RECIPES.filter(r => {
    const catOk = STATE.diet.category === 'all' || r.category === STATE.diet.category;
    const tagOk = STATE.diet.tags.length === 0 || STATE.diet.tags.every(t => r.tags.includes(t));
    return catOk && tagOk;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results">😅 Sin recetas con esos filtros. Probá otra combinación.</div>`;
    return;
  }

  grid.innerHTML = filtered.map((r, i) => `
    <div class="recipe-card" onclick="openRecipeModal('${r.id}')" style="animation-delay:${i*55}ms">
      <div class="recipe-emoji">${r.emoji}</div>
      <div class="recipe-cat">${{desayuno:'🌅 Desayuno',almuerzo:'☀️ Almuerzo',merienda:'🫖 Merienda',cena:'🌙 Cena',snack:'🍎 Snack'}[r.category]}</div>
      <h4 class="recipe-name">${r.name}</h4>
      <div class="recipe-macros">
        <span class="macro cal">🔥 ${r.cals}</span>
        <span class="macro prot">💪 ${r.protein}g P</span>
        <span class="macro carb">🌾 ${r.carbs}g C</span>
        <span class="macro fat">🧈 ${r.fat}g G</span>
      </div>
      <div class="recipe-tags">${r.tags.map(t=>`<span class="rtag">${t}</span>`).join('')}</div>
      <div class="recipe-cta">👆 Ver receta completa</div>
    </div>`).join('');
}

function openRecipeModal(id) {
  const r = RECIPES.find(x => x.id === id);
  if (!r) return;
  const cats = {desayuno:'🌅 Desayuno',almuerzo:'☀️ Almuerzo',merienda:'🫖 Merienda',cena:'🌙 Cena',snack:'🍎 Snack'};

  document.getElementById('modalBody').innerHTML = `
    <div class="modal-recipe">
      <div class="modal-recipe-header">
        <span class="modal-emoji">${r.emoji}</span>
        <div>
          <div class="recipe-cat">${cats[r.category]}</div>
          <h2>${r.name}</h2>
          <div class="recipe-tags">${r.tags.map(t=>`<span class="rtag">${t}</span>`).join('')}</div>
        </div>
      </div>
      <div class="modal-macros">
        <div class="macro-big"><span class="mb-icon">🔥</span><strong>${r.cals}</strong><span>kcal</span></div>
        <div class="macro-big"><span class="mb-icon">💪</span><strong>${r.protein}g</strong><span>Proteína</span></div>
        <div class="macro-big"><span class="mb-icon">🌾</span><strong>${r.carbs}g</strong><span>Carbos</span></div>
        <div class="macro-big"><span class="mb-icon">🧈</span><strong>${r.fat}g</strong><span>Grasas</span></div>
      </div>
      <h4>🛒 Ingredientes</h4>
      <ul class="modal-ingredients">${r.ingredients.map(i=>`<li>• ${i}</li>`).join('')}</ul>
      <h4>👨‍🍳 Preparación</h4>
      <p class="modal-prep">${r.prep}</p>
    </div>`;

  document.getElementById('recipeModal').classList.remove('hidden');
  playSound('click');
}

function closeModal() {
  document.getElementById('recipeModal')?.classList.add('hidden');
}

// ════════════════════════════════════════════
//  PROGRESO
// ════════════════════════════════════════════
function renderProgress() {
  const stats = getStats();
  safeText('statStreak',  stats.streak     || 0);
  safeText('statTotal',   stats.total      || 0);
  safeText('statWeek',    stats.thisWeek   || 0);
  safeText('statBest',    stats.bestStreak || 0);
  refreshExerciseHistoryUI();
  renderCalendar();
}

function refreshExerciseHistoryUI() {
  const container = document.getElementById('exerciseHistory');
  if (!container) return;
  const history = getStore('dabeast-history');
  const allEx   = [...EXERCISES.day1, ...EXERCISES.day2, ...EXERCISES.day3];

  container.innerHTML = allEx.map(ex => {
    const hist    = history[ex.id] || [];
    const current = getWeight(ex.id) ?? ex.defaultWeight;
    const first   = hist.length > 0 ? hist[0].weight : current;
    const diff    = parseFloat((current - first).toFixed(1));
    const cls     = diff > 0 ? 'positive' : diff < 0 ? 'negative' : 'neutral';
    const arrow   = diff > 0 ? `+${diff}kg ↑` : diff < 0 ? `${diff}kg ↓` : '= igual';

    return `
      <div class="history-item">
        <div class="history-left">
          <div class="history-name">${ex.name}</div>
          <div class="history-muscle">${ex.muscle}</div>
        </div>
        <div class="history-right">
          <span class="history-weight">${current}kg</span>
          <span class="history-diff ${cls}">${arrow}</span>
          <span class="history-entries">${hist.length} reg.</span>
        </div>
      </div>`;
  }).join('');
}

function renderCalendar() {
  const container = document.getElementById('calendarHeatmap');
  if (!container) return;
  const store    = getStore('dabeast-completed-days');
  const list     = Array.isArray(store.list) ? store.list : [];
  const today    = todayStr();
  const dayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

  const days = [];
  for (let i = 34; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString('es-AR'));
  }

  container.innerHTML = `
    <div class="cal-day-labels">
      ${dayNames.map(n=>`<div class="cal-label">${n}</div>`).join('')}
    </div>
    <div class="heatmap-grid">
      ${days.map(d => `
        <div class="heat-cell ${list.includes(d)?'trained':''} ${d===today?'today':''}" title="${d}">
          ${list.includes(d) ? '✓' : d===today ? '·' : ''}
        </div>`).join('')}
    </div>
    <div class="heatmap-legend">
      <div class="legend-item"><span class="heat-cell"></span><span>Sin entreno</span></div>
      <div class="legend-item"><span class="heat-cell today"></span><span>Hoy</span></div>
      <div class="legend-item"><span class="heat-cell trained"></span><span>Entrenado ✓</span></div>
    </div>`;
}

/* ── Sparkline charts ── */
function initProgressCharts() {
  const container = document.getElementById('progressCharts');
  if (!container) return;

  const history  = getStore('dabeast-history');
  const allEx    = [...EXERCISES.day1, ...EXERCISES.day2, ...EXERCISES.day3];
  const withData = allEx.filter(ex => (history[ex.id] || []).length > 1);

  if (withData.length === 0) {
    container.innerHTML = `<p class="no-results">📊 Registrá pesos en los ejercicios para ver tus gráficos de progreso aquí.</p>`;
    return;
  }

  container.innerHTML = withData.map(ex => `
    <div class="sparkline-card">
      <div class="sparkline-title">${ex.name}</div>
      <canvas id="chart-${ex.id}" class="sparkline-canvas"></canvas>
      <div class="sparkline-footer">
        <span>Inicio: ${history[ex.id][0].weight}kg</span>
        <span>Actual: ${history[ex.id].slice(-1)[0].weight}kg</span>
      </div>
    </div>`).join('');

  // Dibujar después de que el DOM se actualice
  requestAnimationFrame(() => {
    withData.forEach(ex => {
      const pts = (history[ex.id] || []).map(e => e.weight);
      drawSparkline(`chart-${ex.id}`, pts);
    });
  });
}

function drawSparkline(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || data.length < 2) return;

  const ctx   = canvas.getContext('2d');
  const W     = canvas.getBoundingClientRect().width || 200;
  const H     = 60;
  canvas.width  = W;
  canvas.height = H;

  const min   = Math.min(...data);
  const max   = Math.max(...data);
  const range = max - min || 1;
  const pad   = 8;

  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (W - pad * 2),
    y: H - pad - ((v - min) / range) * (H - pad * 2),
  }));

  const isDark   = document.documentElement.getAttribute('data-theme') === 'dark';
  const lineClr  = isDark ? '#C4B5FD' : '#9B7FD4';
  const fillClr  = isDark ? 'rgba(196,181,253,0.15)' : 'rgba(155,127,212,0.12)';

  // Área
  ctx.beginPath();
  ctx.moveTo(pts[0].x, H);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length-1].x, H);
  ctx.closePath();
  ctx.fillStyle = fillClr;
  ctx.fill();

  // Línea
  ctx.beginPath();
  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = lineClr;
  ctx.lineWidth   = 2.5;
  ctx.lineJoin    = 'round';
  ctx.lineCap     = 'round';
  ctx.stroke();

  // Puntos
  pts.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = lineClr;
    ctx.fill();
  });
}

// ════════════════════════════════════════════
//  BADGES
// ════════════════════════════════════════════
function renderBadges() {
  const container = document.getElementById('badgesGrid');
  if (!container) return;
  const stats   = getStats();
  const earned  = getStore('dabeast-earned-badges');
  let newUnlock = false;

  container.innerHTML = BADGES.map(badge => {
    const isEarned = badge.condition(stats);
    if (isEarned && !earned[badge.id]) {
      earned[badge.id] = true;
      newUnlock = true;
    }
    return `
      <div class="badge-item ${isEarned ? 'earned' : 'locked'}">
        <div class="badge-icon">${isEarned ? badge.icon : '🔒'}</div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${badge.desc}</div>
        ${isEarned ? '<div class="badge-earned-label">✓ Desbloqueado</div>' : ''}
      </div>`;
  }).join('');

  if (newUnlock) {
    setStore('dabeast-earned-badges', earned);
    showToast('🏆 ¡Nuevo badge desbloqueado!');
    playSound('badge');
    spawnPixelConfetti();
  }
}

// ════════════════════════════════════════════
//  STATS & STREAK
// ════════════════════════════════════════════
function getStats() {
  try {
    return JSON.parse(localStorage.getItem('dabeast-stats') ||
      '{"total":0,"streak":0,"bestStreak":0,"thisWeek":0}');
  } catch { return { total:0, streak:0, bestStreak:0, thisWeek:0 }; }
}

function setStats(s) {
  localStorage.setItem('dabeast-stats', JSON.stringify(s));
}

function loadAndUpdateStats() {
  recalcStreak();
}

function recalcStreak() {
  const store = getStore('dabeast-completed-days');
  const list  = Array.isArray(store.list) ? store.list : [];
  const stats = getStats();

  // Racha: días consecutivos contando hacia atrás desde hoy
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    if (list.includes(d.toLocaleDateString('es-AR'))) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  // Esta semana (Lun→Dom)
  const now    = new Date();
  const mon    = new Date(now);
  mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  mon.setHours(0, 0, 0, 0);
  const thisWeek = list.filter(ds => {
    const [d, m, y] = ds.split('/').map(Number);
    return new Date(y, m - 1, d) >= mon;
  }).length;

  stats.streak    = streak;
  stats.thisWeek  = thisWeek;
  stats.total     = Math.max(stats.total || 0, list.length);
  if (streak > (stats.bestStreak || 0)) stats.bestStreak = streak;
  setStats(stats);
}

function updateStreakBar() {
  const stats  = getStats();
  safeText('streakCount',   stats.streak || 0);
  safeText('totalWorkouts', stats.total  || 0);

  const LEVELS = [
    [0,'Iniciado 🌱'],[5,'Guerrero ⚔️'],[10,'Luchador 🥊'],
    [20,'Atleta 🏃'],[30,'Elite 💎'],[50,'Bestia 🦁'],[100,'Leyenda 🏆'],
  ];
  let level = 'Iniciado 🌱';
  for (const [n, name] of LEVELS) { if ((stats.total||0) >= n) level = name; }
  safeText('userLevel', level);
}

// ════════════════════════════════════════════
//  CARDIO
// ════════════════════════════════════════════
function showCardioMode(mode) {
  const data = CARDIO_MODES[mode];
  if (!data) return;

  document.querySelectorAll('.cardio-card').forEach(c => {
    c.classList.toggle('active', c.dataset.mode === mode);
  });

  const container = document.getElementById('cardioDetail');
  if (!container) return;
  container.classList.remove('hidden');
  container.innerHTML = `
    <div class="cardio-plan">
      <h3>${data.title}</h3>
      <p class="cardio-desc">${data.desc}</p>
      <div class="cardio-meta">
        <span>⏱️ ${data.duration}</span>
        <span>📅 ${data.frequency}</span>
      </div>
      <div class="cardio-exercises">
        ${data.exercises.map((ex, i) => {
          const cls = ex.intensity.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-');
          return `
          <div class="cardio-ex-item">
            <div class="cardio-ex-num">${i + 1}</div>
            <div class="cardio-ex-info">
              <div class="cardio-ex-name">${ex.name}</div>
              <div class="cardio-ex-details">
                <span>⏱️ ${ex.duration}</span>
                <span class="intensity-badge intensity-${cls}">${ex.intensity}</span>
              </div>
              <div class="cardio-ex-tip">💡 ${ex.tip}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;

  container.scrollIntoView({ behavior:'smooth', block:'start' });
  playSound('click');
}

// ════════════════════════════════════════════
//  HERRAMIENTAS
// ════════════════════════════════════════════
function calcCalories() {
  const weight   = parseFloat(document.getElementById('calWeight')?.value);
  const height   = parseFloat(document.getElementById('calHeight')?.value);
  const age      = parseFloat(document.getElementById('calAge')?.value);
  const gender   = document.getElementById('calGender')?.value;
  const activity = parseFloat(document.getElementById('calActivity')?.value);

  if (!weight || !height || !age) { showToast('⚠️ Completá todos los campos'); return; }

  const bmr  = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const maint   = Math.round(bmr * activity);
  const defLeve = Math.round(maint * 0.90);
  const defMod  = Math.round(maint * 0.80);
  const protMin = Math.round(weight * 1.6);
  const protOpt = Math.round(weight * 2.0);

  const result = document.getElementById('caloriesResult');
  if (!result) return;
  result.classList.remove('hidden');
  result.innerHTML = `
    <div class="result-grid">
      <div class="result-item neutral">
        <span class="result-label">⚖️ Mantenimiento</span>
        <span class="result-value">${maint} kcal</span>
      </div>
      <div class="result-item good">
        <span class="result-label">📉 Déficit leve (−10%)</span>
        <span class="result-value">${defLeve} kcal</span>
      </div>
      <div class="result-item better">
        <span class="result-label">🔥 Déficit moderado (−20%)</span>
        <span class="result-value">${defMod} kcal</span>
      </div>
      <div class="result-item protein">
        <span class="result-label">💪 Proteína recomendada</span>
        <span class="result-value">${protMin}–${protOpt}g/día</span>
      </div>
    </div>
    <p class="result-note">💡 Fórmula Mifflin-St Jeor. Déficit moderado ideal para bajar grasa preservando músculo.</p>`;
  playSound('save');
}

function calcIMC() {
  const weight = parseFloat(document.getElementById('imcWeight')?.value);
  const hCm    = parseFloat(document.getElementById('imcHeight')?.value);
  if (!weight || !hCm) { showToast('⚠️ Completá los campos'); return; }

  const h   = hCm / 100;
  const imc = (weight / (h * h)).toFixed(1);

  const [category, color, emoji, advice] =
    imc < 18.5 ? ['Bajo peso',  '#60A5FA','⚠️','Considerá aumentar calorías progresivamente.']
    : imc < 25  ? ['Peso normal','#34D399','✅','¡En rango saludable! Mantené la consistencia.']
    : imc < 30  ? ['Sobrepeso',  '#FBBF24','⚠️','Déficit moderado + ejercicio te llevarán al rango ideal.']
                : ['Obesidad',   '#F87171','🔴','Consultá un médico para un plan personalizado.'];

  const pct = Math.min(Math.max(((parseFloat(imc) - 15) / 25) * 100, 2), 97);
  const result = document.getElementById('imcResult');
  if (!result) return;
  result.classList.remove('hidden');
  result.innerHTML = `
    <div class="imc-result">
      <div class="imc-value" style="color:${color}">${imc}</div>
      <div class="imc-category" style="color:${color}">${emoji} ${category}</div>
      <div class="imc-scale">
        <div class="scale-bar">
          <div class="scale-zones">
            <div class="sz" style="width:14%;background:#60A5FA"></div>
            <div class="sz" style="width:26%;background:#34D399"></div>
            <div class="sz" style="width:20%;background:#FBBF24"></div>
            <div class="sz" style="flex:1;background:#F87171"></div>
          </div>
          <div class="scale-indicator" style="left:${pct}%"></div>
        </div>
        <div class="scale-labels"><span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span></div>
      </div>
      <p class="imc-advice">${advice}</p>
      <p class="result-note">El IMC no distingue músculo de grasa. Úsalo como orientación general.</p>
    </div>`;
  playSound('save');
}

// ════════════════════════════════════════════
//  IA COACH
// ════════════════════════════════════════════
function sendMessage() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  appendChatMsg(msg, 'user');
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendChatMsg(generateAIResponse(msg), 'bot');
    playSound('click');
  }, 700 + Math.random() * 900);
}

function sendQuickMsg(msg) {
  const input = document.getElementById('chatInput');
  if (input) { input.value = msg; sendMessage(); }
}

function appendChatMsg(text, type) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = `msg ${type}-msg`;
  div.innerHTML = `
    <div class="msg-avatar">${type === 'bot' ? '🤖' : '👤'}</div>
    <div class="msg-bubble">${text}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  const c = document.getElementById('chatMessages');
  if (!c) return;
  const div = document.createElement('div');
  div.className = 'msg bot-msg';
  div.id = 'typingIndicator';
  div.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-bubble typing-bubble"><span></span><span></span><span></span></div>`;
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

function removeTypingIndicator() {
  document.getElementById('typingIndicator')?.remove();
}

function generateAIResponse(msg) {
  const lower = msg.toLowerCase();
  const has = (...kws) => kws.some(k => lower.includes(k));

  if (has('rutina','entrena','hoy','qué hago','qué toca','qué toca hoy')) {
    const days = ['Día 1: Upper Fuerza + Hombros','Día 2: Lower + Aire','Día 3: Full Body Atlético'];
    return randomItem(AI_RESPONSES.rutina).replace('{dia}', days[new Date().getDay() % 3]);
  }
  if (has('cansa','agota','pesado','duro','dormido','sueño','no tengo energía')) return randomItem(AI_RESPONSES.cansancio);
  if (has('fútbol','futbol','partido','jugué','juego')) return randomItem(AI_RESPONSES.futbol);
  if (has('como','comida','dieta','nutrición','comer','déficit','calorías','qué como')) return randomItem(AI_RESPONSES.dieta);
  if (has('motiv','flojo','perezoso','no quiero','ganas','ánimo')) return randomItem(AI_RESPONSES.motivacion);
  if (has('técnica','cómo','sentadilla','press','peso muerto','forma','postura','agarre','hacer','ejecutar')) return randomItem(AI_RESPONSES.tecnica);
  return randomItem(AI_RESPONSES.default);
}

// ════════════════════════════════════════════
//  TOAST
// ════════════════════════════════════════════
let _toastTimeout = null;
function showToast(msg, dur = 3200) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('hidden');
  requestAnimationFrame(() => toast.classList.add('visible'));
  if (_toastTimeout) clearTimeout(_toastTimeout);
  _toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.classList.add('hidden'), 350);
  }, dur);
}

// ════════════════════════════════════════════
//  CONFETTI PIXEL
// ════════════════════════════════════════════
function spawnPixelConfetti() {
  const colors = ['#FFB3C6','#C8B8E8','#B3D9FF','#B8EDD4','#FFD5C2','#FFD700','#FF6B8A'];
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    const size = 6 + Math.floor(Math.random() * 6);
    dot.style.cssText = `
      position:fixed;width:${size}px;height:${size}px;
      background:${randomItem(colors)};border-radius:${Math.random()>.5?'50%':'2px'};
      left:${10 + Math.random() * 80}vw;top:${20 + Math.random() * 30}vh;
      z-index:9999;pointer-events:none;
      animation:confetti-fall ${0.9 + Math.random() * 1.3}s ease forwards;
      animation-delay:${Math.random() * 0.5}s;`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 2800);
  }
}

function injectConfettiCSS() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confetti-fall {
      0%   { transform: translateY(0px) rotate(0deg) scale(1); opacity:1; }
      100% { transform: translateY(200px) rotate(540deg) scale(0.2); opacity:0; }
    }
    .typing-bubble { display:flex; gap:5px; align-items:center; padding:12px 16px !important; }
    .typing-bubble span {
      width:8px; height:8px; border-radius:50%;
      background:var(--accent2); display:inline-block;
      animation: typing-dot 1.2s ease-in-out infinite;
    }
    .typing-bubble span:nth-child(2) { animation-delay:.2s; }
    .typing-bubble span:nth-child(3) { animation-delay:.4s; }
    @keyframes typing-dot {
      0%,60%,100% { transform:translateY(0); opacity:.4; }
      30%          { transform:translateY(-6px); opacity:1; }
    }
  `;
  document.head.appendChild(style);
}

// ════════════════════════════════════════════
//  WELCOME
// ════════════════════════════════════════════
function showWelcomeMsg() {
  const today     = todayStr();
  const lastVisit = localStorage.getItem('dabeast-last-visit');
  if (lastVisit === today) return;
  localStorage.setItem('dabeast-last-visit', today);

  const stats  = getStats();
  const streak = stats.streak || 0;
  const msgs = [
    streak === 0   ? '👋 ¡Bienvenido! Empezá tu racha hoy mismo.' : null,
    streak === 1   ? '🔥 ¡Arrancaste! Un día en la racha.' : null,
    streak < 3     ? `⚡ Racha de ${streak} días. ¡No pares!` : null,
    streak < 7     ? `🔥 ${streak} días seguidos. ¡Modo bestia activado!` : null,
    streak >= 7    ? `🏆 ¡${streak} días consecutivos! Sos una máquina.` : null,
  ].filter(Boolean);

  setTimeout(() => showToast(msgs[0] || '¡Bienvenido de vuelta! 💪', 4500), 1500);
}

// ════════════════════════════════════════════
//  EXPORT PROGRESO (bonus)
// ════════════════════════════════════════════
function exportProgress() {
  const data = {
    exportDate: new Date().toLocaleString('es-AR'),
    stats:      getStats(),
    weights:    getStore('dabeast-weights'),
    history:    getStore('dabeast-history'),
    completed:  getStore('dabeast-completed-days'),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `daBeast-progreso-${todayStr().replace(/\//g,'-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Progreso exportado con éxito!');
}

// ════════════════════════════════════════════
//  UTILIDADES
// ════════════════════════════════════════════
function getStore(key) {
  try { return JSON.parse(localStorage.getItem(key) || '{}'); }
  catch { return {}; }
}

function setStore(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { console.warn('Storage full'); }
}

function todayStr() {
  return new Date().toLocaleDateString('es-AR');
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function safeText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
