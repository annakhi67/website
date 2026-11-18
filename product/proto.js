/* Shared helpers for the product design prototypes.
   ?embed=1 hides the device frame (used inside the case study pages).
   ?screen=<id> opens a screen directly (used for static covers). */
const params = new URLSearchParams(location.search);
if (params.has('embed')) document.body.classList.add('embed');
if (params.get('wire')) document.documentElement.classList.add('wire');
const $ = id => document.getElementById(id);
const Q = s => [...document.querySelectorAll(s)];
const hist = [];
function go(id, push = true) {
  const cur = document.querySelector('.screen.on');
  if (cur && push && cur.id !== id) hist.push(cur.id);
  Q('.screen').forEach(s => s.classList.toggle('on', s.id === id));
  Q('.tabbar button').forEach(b => b.setAttribute('aria-current', b.dataset.go === id ? 'page' : 'false'));
  const tb = document.querySelector('.tabbar');
  if (tb) tb.style.display = $(id).classList.contains('tabbed') ? 'flex' : 'none';
  $(id).scrollTop = 0;
  if (window.onScreen) window.onScreen(id);
}
function back() { const p = hist.pop(); if (p) go(p, false); }
let tt;
function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2200); }
function sheet(id, on = true) { $(id).classList.toggle('on', on); }
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g) { go(g.dataset.go); return; }
  if (e.target.closest('[data-back]')) back();
  const sb = e.target.closest('.sheetbg'); if (sb && e.target === sb) sb.classList.remove('on');
});
function clock() { const s = document.querySelector('.status span'); if (s) s.textContent = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' }); }
clock(); setInterval(clock, 30000);
const eur = n => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
