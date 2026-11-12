import * as DB from './db.js';

const D = window.SITE_DEFAULTS, CFG = window.SITE_CONFIG || {};
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = u => /^(https?:|mailto:|tel:|#)/i.test(u || '') ? u : '#';
const safeImg = u => /^(https?:|data:image\/|images\/|\.\/|\/)/i.test(u || '') ? u : '';
const byOrder = (a, b) => (Number(a.order) || 999) - (Number(b.order) || 999);

async function loadAll() {
  let seeded = [];
  if (DB.enabled) { try { seeded = await DB.seededCols(); } catch (e) { console.warn('DB unavailable, using built-in content', e); } }
  const out = {};
  await Promise.all(Object.keys(D).map(async col => {
    try { out[col] = seeded.includes(col) ? await DB.list(col) : D[col]; }
    catch (e) { out[col] = D[col]; }
  }));
  Object.values(out).forEach(a => a.sort(byOrder));
  return out;
}

/* ---------- lightbox ---------- */
const lb = $('#lb');
function openLightbox(src, cap) {
  $('#lbImg').src = src; $('#lbCap').textContent = cap || '';
  lb.classList.add('open');
}
lb.addEventListener('click', () => lb.classList.remove('open'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });

/* ---------- photo thumbnail ---------- */
function thumb(g, withCaption) {
  const f = document.createElement('figure');
  f.className = 'thumb';
  const src = safeImg(g.image);
  const img = new Image();
  img.loading = 'lazy'; img.alt = g.caption || '';
  img.onload = () => f.classList.add('ok');
  img.onerror = () => {
    if (CFG.showPlaceholders) { f.textContent = ''; f.classList.add('ph'); f.textContent = src.split('/').pop() || 'photo'; }
    else f.remove();
  };
  img.src = src;
  f.appendChild(img);
  if (withCaption && g.caption) { const c = document.createElement('figcaption'); c.textContent = g.caption; f.appendChild(c); }
  f.addEventListener('click', () => { if (f.classList.contains('ok')) openLightbox(src, g.caption); });
  return f;
}

function render(data) {
  /* stats */
  $('#pillars').innerHTML = data.stats.filter(s => s.group === 'pillars').map((s, i) =>
    `<a class="pillar p${i % 4}" href="${esc(safeUrl(s.link))}"><small>${esc(s.label)}</small><b>${esc(s.value)}</b><span>${esc(s.caption)}</span><em>→</em></a>`).join('');
  $('#maakImpact').innerHTML = data.stats.filter(s => s.group === 'maak').map(s =>
    `<div class="card stat">${s.label ? `<small>${esc(s.label)}</small>` : ''}<b>${esc(s.value)}</b><span>${esc(s.caption)}</span></div>`).join('');

  /* timelines */
  const tl = g => data.roles.filter(r => r.group === g).map(r =>
    `<div class="t-item"><div class="t-date">${esc(r.date)}</div><h4>${esc(r.title)}</h4><p>${esc(r.text)}</p></div>`).join('');
  $('#clinicalTimeline').innerHTML = tl('clinical');
  $('#maakTimeline').innerHTML = tl('maak');

  /* projects */
  $('#projGrid').innerHTML = data.projects.map(p => {
    const nums = (p.numbers || '').split('\n').filter(Boolean).map(l => { const [v, ...r] = l.split('|'); return `<span><b>${esc(v)}</b> ${esc(r.join('|'))}</span>`; }).join('');
    return `<article class="card proj" data-c="${esc(p.categories)}">
      <div class="strip small" data-project="${esc(p.id)}"></div>
      <div class="meta">${p.period ? `<span class="chip">${esc(p.period)}</span>` : ''}${p.funding ? `<span class="chip v">${esc(p.funding)}</span>` : ''}</div>
      <h4>${esc(p.title)}</h4><p>${esc(p.text)}</p>${nums ? `<div class="nums">${nums}</div>` : ''}</article>`;
  }).join('');

  /* research */
  $('#researchGrid').innerHTML = data.research.map(r =>
    `<div class="card"><span class="chip v">${esc(r.tag)}</span><h3 style="margin-top:12px">${esc(r.title)}</h3><p>${esc(r.text)}</p>${r.link ? `<p style="margin-top:10px"><a class="more" href="${esc(safeUrl(r.link))}" target="_blank" rel="noopener">Read more ↗</a></p>` : ''}</div>`).join('');

  /* training */
  $('#trList').innerHTML = data.trainings.map(t =>
    `<div class="tr" data-c="${esc(t.category)}"><div class="yr">${esc(t.year)}</div><div><b>${esc(t.title)}</b><span>${esc(t.org)}</span></div></div>`).join('');

  /* links */
  const linkHtml = g => data.links.filter(l => l.group === g).map(l =>
    `<a class="c-link" href="${esc(safeUrl(l.url))}" target="_blank" rel="noopener"><i>${esc(l.icon || '🔗')}</i><span><small>${esc(l.label)}</small>${esc(l.sub)}</span></a>`).join('');
  $('#contactLinks').innerHTML = linkHtml('contact');
  $('#maakLinks').innerHTML = linkHtml('maak');
  $('#researchLinks').innerHTML = linkHtml('research');

  /* photo strips */
  document.querySelectorAll('[data-strip]').forEach(el => {
    const sec = el.dataset.strip;
    data.gallery.filter(g => g.section === sec && !g.project).slice(0, 6).forEach(g => el.appendChild(thumb(g)));
  });
  document.querySelectorAll('[data-project]').forEach(el => {
    data.gallery.filter(g => g.project === el.dataset.project).slice(0, 3).forEach(g => el.appendChild(thumb(g)));
  });

  /* main gallery */
  const grid = $('#galleryGrid');
  const drawGallery = f => {
    grid.innerHTML = '';
    data.gallery.filter(g => !g.project && (f === 'all' || g.section === f)).forEach(g => grid.appendChild(thumb(g, true)));
  };
  drawGallery('all');
  $('#galleryFilters').addEventListener('click', e => {
    const b = e.target.closest('.filter'); if (!b) return;
    $('#galleryFilters').querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
    b.classList.add('active'); drawGallery(b.dataset.f);
  });

  window.__reveal && window.__reveal();
}

loadAll().then(render);
