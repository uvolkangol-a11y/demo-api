// Kliniğe özel demo siteleri üretir: node build.mjs
// Girdi : data/clinics.json + template/site.html
// Çıktı : dist/<slug>-<key>/index.html   (kliniğe gönderilecek demo; tahmin edilemez adres)
//         dist/<PANEL_PATH>/index.html   (sadece senin için satış paneli)
//         dist/index.html                (nötr kapak; klinik listesi göstermez)
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PANEL_PATH = 'panel-9w4zq7';
const root = dirname(fileURLToPath(import.meta.url));
const outreach = JSON.parse(readFileSync(join(root, 'data/outreach.json'), 'utf8'));
const clinics = JSON.parse(readFileSync(join(root, 'data/clinics.json'), 'utf8')).map(c => {
  const o = outreach[c.slug] || {};
  return { ...c, focus: o.focus || 'genel', theme: o.theme || 'modern', outreach: o };
});
const template = readFileSync(join(root, 'template/site.html'), 'utf8');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pathOf = c => `${c.slug}-${c.key}`;
const demoPathOf = c => pathOf(c) + (c.theme && c.theme !== 'modern' ? '/' + c.theme : '');
const THEME_LABEL = { modern: 'Modern', klasik: 'Klasik', premium: 'Premium' };

const THEMES = [
  { id: 'modern', label: 'Modern', fonts: 'family=Plus+Jakarta+Sans:wght@400;500;600;700;800' },
  { id: 'klasik', label: 'Klasik', fonts: 'family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Lato:wght@400;700' },
  { id: 'premium', label: 'Premium', fonts: 'family=Manrope:wght@400;500;600;700;800' },
];

for (const c of clinics) {
  const { outreach: _o, ...pub } = c;
  const json = JSON.stringify(pub).replace(/</g, '\\u003c');
  THEMES.forEach((th, i) => {
    const up = i === 0 ? '' : '../';
    const sw = `<div class="theme-switch"><span>Tasarım seçin:</span>${THEMES.map((o, j) =>
      `<a href="${(up + (j === 0 ? '' : o.id + '/')) || './'}" class="${j === i ? 'on' : ''}">${j + 1} · ${o.label}${o.id === c.theme ? ' ⭐' : ''}</a>`).join('')}</div>`;
    const html = template
      .replace('{{THEME}}', th.id)
      .replace('{{FONTS}}', th.fonts)
      .replace('{{SWITCH}}', sw)
      .replace('{{TITLE}}', esc(`${c.name} Ağız ve Diş Sağlığı | Online Randevu`))
      .replace('{{DESCRIPTION}}', esc(`${c.fullName} – ${c.area || 'Bağcılar'}. Online randevu ve yurt dışından gelen hastalar için ücretsiz online ön değerlendirme.`))
      .replace('{{COLOR}}', c.color)
      .replace('{{ACCENT}}', c.accent)
      .replace('/*CLINIC*/{}/*END*/', json);
    const dir = i === 0 ? join(dist, pathOf(c)) : join(dist, pathOf(c), th.id);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  });
  console.log(`✓ dist/${pathOf(c)}/  (+ klasik/, premium/)`);
}

// ---- Kapak sayfası (markanstudio.com kökü; klinik listesi göstermez) ----
const BOSPORA_URL = 'https://bospora.markanstudio.com/#tr';
writeFileSync(join(dist, 'index.html'), `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Markan Studio</title>
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#f3f5f8;color:#14202b;padding:16px}
main{max-width:520px;width:100%;text-align:center}
h1{margin:0 0 8px;font-size:2rem}
.lead{margin:0 0 28px;color:#5b6b7a;line-height:1.5}
.card{display:block;text-align:left;background:#fff;border:1px solid #dde3ea;border-radius:14px;padding:18px 20px;color:inherit;text-decoration:none;transition:border-color .15s,box-shadow .15s}
.card:hover,.card:focus-visible{border-color:#0B5D8F;box-shadow:0 4px 16px rgba(11,93,143,.12)}
.card b{display:block;font-size:1.05rem;margin-bottom:4px}
.card span{color:#5b6b7a;line-height:1.45}
.card em{display:inline-block;margin-top:10px;font-style:normal;color:#0B5D8F;font-weight:600}
.note{margin-top:28px;font-size:.85rem;color:#8796a5}
</style></head>
<body><main>
<h1>Markan Studio</h1>
<p class="lead">Klinikler için online randevulu, çok dilli web siteleri.</p>
<a class="card" href="${BOSPORA_URL}">
<b>Bospora Health</b>
<span>Yurt dışından gelen hastalar için klinik bulma ve randevu platformumuz.</span>
<em>Platformu incele →</em>
</a>
<p class="note">Bu adresteki tasarım önizlemeleri yalnızca kendilerine özel bağlantı gönderilen kişiler içindir.</p>
</main></body></html>`);

// ---- Mesaj şablonları ----
// {LINK} -> demo adresi, {AD} -> senin adın, {TEL} -> senin telefonun
const msgs = c => {
  const o = c.outreach || {};
  return {
  acilis: o.opener || `Merhaba, iyi çalışmalar 🙏
Ben {AD}. ${c.fullName} için online randevulu ve 4 dilli, 3 farklı tasarımda bir site önizlemesi hazırladım. Bağlantıyı göndermemi ister misiniz? Bakmak ücretsiz.`,
  telefon: `📞 TELEFON SCRİPTİ – ${c.fullName}

"Merhaba, iyi günler. Ben {AD}. Klinik sahibi ya da yönetimden biriyle 1 dakika görüşebilir miyim?"

"${o.phoneIntro || `Bağcılar'daki diş kliniklerine online randevu ve yabancı hasta odaklı web siteleri hazırlıyorum. ${c.name} için size özel, 3 farklı tasarımda ücretsiz bir site önizlemesi hazırladım. Hastalar telefonsuz randevu alıyor, site 4 dilde ve yurt dışından gelen hastalar için ön değerlendirme formu var.`}"

"Size WhatsApp'tan bağlantısını göndermem için hangi numarayı kullanabilirim?"

— İTİRAZLAR —
• "Sitemiz var" → "Harika. Sizin sitede hastanın gün-saat seçip randevu aldığı bir takvim ve Arapça/Almanca yabancı hasta bölümü var mı? Olmayan kısmı göstermek için hazırladım, 1 dakikalık bakış."
• "Fiyatı ne?" → "Önce bir bakın, beğenirseniz kurulum + aylık bakım şeklinde paketlerimiz var, size uygun olanı birlikte seçeriz."
• "Doktortakvimi kullanıyoruz" → "Orada hasta platformun; burada site, randevu ve hasta tamamen sizin markanızda, komisyon yok. İkisi birlikte de kullanılabilir."
• "Şimdi müsait değiliz" → "Anlıyorum, linki WhatsApp'tan bırakayım, müsait olduğunuzda bakarsınız."`,
  link: `Teşekkürler 🙏 ${c.name} için hazırladığım önizleme:
{LINK}

${o.linkNote ? o.linkNote + '\n' : ''}⭐ Size önerdiğim tasarım: ${THEME_LABEL[c.theme] || 'Modern'}. En üstten diğer 2 tasarıma da geçebilirsiniz.

Denemek için:
1️⃣ "Online Randevu" ile deneme randevusu oluşturun${c.whatsapp ? ' — talep WhatsApp\'ınıza düşer' : ''}
2️⃣ Sağ üstten EN / AR / DE seçip yabancı hasta bölümüne bakın
3️⃣ En alttaki "Klinik Paneli" ile gelen randevuları görün

Değişmesini istediğiniz bir yer olursa (renk, tedaviler, saatler, doktorlar) ücretsiz güncellerim.
{AD} – {TEL}`,
  takip: `Merhaba, ${c.name} için gönderdiğim önizlemeye bakma fırsatınız oldu mu? 🙏
Randevu veya yabancı hasta bölümünde eklemek istediğiniz bir şey olursa ücretsiz düzenleyebilirim.
İlgilenmiyorsanız bir "hayır" yazmanız yeterli; önizlemeyi kaldırırım, tekrar rahatsız etmem.`
  };
};

const cards = clinics.map(c => {
  const m = msgs(c);
  return `
  <article class="card" style="--c:${c.color}" data-slug="${c.slug}" data-path="${demoPathOf(c)}" data-wa="${c.whatsapp || ''}" data-email="${esc(c.email || '')}" data-name="${esc(c.name)}">
    <div class="top"><span class="dot"></span><div><h2>${esc(c.fullName)}</h2><p>${esc(c.address)}</p></div></div>
    <dl>
      <dt>Telefon</dt><dd>${[c.phone, c.phone2].filter(Boolean).map(p => `<a href="tel:+90${p.replace(/\D/g, '').replace(/^0/, '')}">${esc(p)}</a>`).join(' · ')}</dd>
      <dt>WhatsApp</dt><dd>${c.whatsapp ? '+' + c.whatsapp : '<span class="warn">Yok (sabit hat) → önce ara</span>'}</dd>
      <dt>Instagram</dt><dd><input class="ig" placeholder="@kullaniciadi"></dd>
      <dt>Mevcut site</dt><dd>${esc(c.currentSite)}</dd>
    </dl>
    ${c.outreach && c.outreach.hook ? `<div class="hook"><b>${esc(c.outreach.priority || '')}</b><p>🎣 ${esc(c.outreach.hook)}</p>
      <details><summary>✅ Göndermeden önce kontrol et</summary><ul>${(c.outreach.checks || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      ${c.outreach.fallback ? `<p class="fb">↪ Kontrol tutmazsa: ${esc(c.outreach.fallback)}</p>` : ''}</details></div>` : ''}
    <div class="tabs">
      <button data-m="acilis" class="on">1 · Açılış</button><button data-m="telefon">Telefon</button><button data-m="link">2 · Link</button><button data-m="takip">3 · Takip</button>
    </div>
    ${Object.entries(m).map(([k, v]) => `<template data-t="${k}">${esc(v)}</template>`).join('')}
    <textarea rows="11"></textarea>
    <div class="actions">
      <button class="btn ghost js-copy">Kopyala</button>
      ${c.whatsapp ? `<a class="btn wa js-wa" target="_blank" rel="noopener">WhatsApp'ta aç</a>` : ''}
      <a class="btn ig-btn js-ig" target="_blank" rel="noopener">Instagram</a>
      ${c.email ? `<a class="btn ghost js-mail">E-posta</a>` : ''}
      <a class="btn" href="../${demoPathOf(c)}/" target="_blank">Demo (${THEME_LABEL[c.theme]} ⭐)</a>
    </div>
    <div class="row">
      <select class="st"><option>Ulaşılmadı</option><option>Açılış atıldı</option><option>Arandı</option><option>Link istedi</option><option>Link gönderildi</option><option>Takip atıldı</option><option>Toplantı</option><option>Satıldı ✅</option><option>İlgilenmiyor ❌</option></select>
      <input class="note" placeholder="Not (kiminle görüşüldü, ne dedi…)">
    </div>
  </article>`;
}).join('');

mkdirSync(join(dist, PANEL_PATH), { recursive: true });
writeFileSync(join(dist, PANEL_PATH, 'index.html'), `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Satış Paneli</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#f3f5f8;color:#14202b;padding:20px 14px 60px}
.wrap{max-width:1100px;margin:0 auto}h1{font-size:24px}header p{color:#5b6b7a;margin:4px 0 14px;font-size:14px}
.me{display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#fff;border:1px solid #e4e9ee;border-radius:14px;padding:12px;margin-bottom:18px}
.me input,.row input,dd input{width:100%;border:1px solid #e4e9ee;border-radius:10px;padding:9px 10px;font:inherit;font-size:14px}
.me label{font-size:12px;font-weight:700;color:#5b6b7a;display:block;margin-bottom:4px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}
.card{background:#fff;border:1px solid #e4e9ee;border-radius:18px;padding:18px;display:flex;flex-direction:column;gap:12px;border-top:5px solid var(--c)}
.top{display:flex;gap:10px}.dot{flex:none;width:12px;height:12px;border-radius:50%;background:var(--c);margin-top:6px}
h2{font-size:16px}.top p{font-size:12.5px;color:#5b6b7a}
dl{display:grid;grid-template-columns:84px 1fr;gap:6px 10px;font-size:13.5px;align-items:center}dt{color:#5b6b7a;font-weight:600}dd a{color:inherit}.warn{color:#c2410c;font-weight:600}
.hook{background:color-mix(in srgb,var(--c) 8%,#fff);border:1px solid color-mix(in srgb,var(--c) 25%,#fff);border-radius:12px;padding:10px 12px;font-size:13.5px;line-height:1.5}
.hook b{display:block;margin-bottom:4px}.hook p{margin:0}.hook details{margin-top:8px}.hook summary{cursor:pointer;font-weight:700}
.hook ul{margin:6px 0 0 18px}.hook .fb{margin-top:6px;color:#5b6b7a}
.tabs{display:flex;gap:6px;flex-wrap:wrap}.tabs button{border:1px solid #e4e9ee;background:#fff;border-radius:999px;padding:6px 11px;font:inherit;font-size:13px;font-weight:600;cursor:pointer}
.tabs button.on{background:var(--c);border-color:var(--c);color:#fff}
textarea{width:100%;border:1px solid #e4e9ee;border-radius:12px;padding:10px;font:inherit;font-size:13px;resize:vertical;background:#fbfcfd}
.actions{display:flex;flex-wrap:wrap;gap:8px}.btn{border:0;cursor:pointer;font:inherit;font-weight:700;font-size:13px;padding:9px 13px;border-radius:999px;background:var(--c);color:#fff;text-decoration:none}
.btn.ghost{background:#fff;color:#14202b;border:1px solid #e4e9ee}.btn.wa{background:#25D366}.btn.ig-btn{background:linear-gradient(45deg,#f58529,#dd2a7b,#8134af)}
.row{display:grid;grid-template-columns:auto 1fr;gap:8px}select{font:inherit;font-size:13px;border:1px solid #e4e9ee;border-radius:10px;padding:8px;background:#fff}
.tips{margin-top:22px;background:#fff;border:1px solid #e4e9ee;border-radius:18px;padding:18px;font-size:14px;line-height:1.7}.tips h3{margin-bottom:6px}
.toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:#14202b;color:#fff;padding:10px 16px;border-radius:999px;font-size:14px;display:none}
@media(max-width:600px){.me{grid-template-columns:1fr}}
</style></head><body><div class="wrap">
<header><h1>Bağcılar Pilot – Satış Paneli</h1><p>${clinics.length} klinik · Sadece senin için (bu adresi kimseyle paylaşma). Durum ve notlar bu tarayıcıda saklanır.</p></header>
<div class="me"><div><label>Adın</label><input id="myName" placeholder="Ad Soyad"></div><div><label>Telefonun</label><input id="myTel" placeholder="05xx xxx xx xx"></div></div>
<div class="grid">${cards}</div>
<div class="tips"><h3>Akış</h3>
<b>1 · Açılış</b> mesajını at (WhatsApp ya da Instagram DM) — linksiz, sadece izin iste.<br>
Sabit hatlı kliniklerde önce <b>Telefon</b> scriptiyle ara, WhatsApp numarası iste.<br>
"Evet, gönderin" derlerse <b>2 · Link</b> mesajını at, durumu "Link gönderildi" yap.<br>
2–3 gün ses yoksa <b>3 · Takip</b> mesajını at. "Hayır" diyeni "İlgilenmiyor" yap ve bir daha yazma.<br>
Günde en fazla 20–30 kişiye, tek tek yaz; toplu gönderim yapma.</div>
</div><div class="toast" id="toast"></div>
<script>
const base=location.href.replace(/[^/]*$/,'').replace(/${PANEL_PATH}\\/$/,'');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const myName=$('#myName'),myTel=$('#myTel');myName.value=ls.get('me-name')||'';myTel.value=ls.get('me-tel')||'';
function toast(t){const e=$('#toast');e.textContent=t;e.style.display='block';clearTimeout(e._t);e._t=setTimeout(()=>e.style.display='none',1600);}
function fill(card){
  const m=card._m||'acilis';const tpl=$('template[data-t="'+m+'"]',card).innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&amp;/g,'&');
  const txt=tpl.replace(/\\{LINK\\}/g,base+card.dataset.path+'/').replace(/\\{AD\\}/g,myName.value||'[Adınız]').replace(/\\{TEL\\}/g,myTel.value||'[Telefonunuz]');
  $('textarea',card).value=txt;update(card);
}
function update(card){
  const txt=$('textarea',card).value;const wa=$('.js-wa',card);if(wa)wa.href='https://wa.me/'+card.dataset.wa+'?text='+encodeURIComponent(txt);
  const ig=$('.ig',card).value.trim().replace(/^@/,'');const igb=$('.js-ig',card);igb.style.display=ig?'':'none';igb.href='https://ig.me/m/'+ig;
  const ml=$('.js-mail',card);if(ml)ml.href='mailto:'+card.dataset.email+'?subject='+encodeURIComponent(card.dataset.name+' için online randevulu site önizlemesi')+'&body='+encodeURIComponent(txt);
}
$$('.card').forEach(card=>{
  const k=card.dataset.slug;
  $('.ig',card).value=ls.get('ig-'+k)||'';$('.st',card).value=ls.get('st-'+k)||'Ulaşılmadı';$('.note',card).value=ls.get('nt-'+k)||'';
  $$('.tabs button',card).forEach(b=>b.onclick=()=>{$$('.tabs button',card).forEach(x=>x.classList.remove('on'));b.classList.add('on');card._m=b.dataset.m;fill(card);});
  $('textarea',card).oninput=()=>update(card);
  $('.ig',card).oninput=e=>{ls.set('ig-'+k,e.target.value);update(card);};
  $('.st',card).onchange=e=>ls.set('st-'+k,e.target.value);
  $('.note',card).oninput=e=>ls.set('nt-'+k,e.target.value);
  $('.js-copy',card).onclick=()=>{navigator.clipboard.writeText($('textarea',card).value).then(()=>toast('Kopyalandı ✓'));};
  $('.js-ig',card).addEventListener('click',()=>{navigator.clipboard&&navigator.clipboard.writeText($('textarea',card).value);toast('Mesaj kopyalandı, DM\\'e yapıştır');});
  fill(card);
});
[myName,myTel].forEach(i=>i.oninput=()=>{ls.set('me-name',myName.value);ls.set('me-tel',myTel.value);$$('.card').forEach(fill);});
</script></body></html>`);
console.log(`✓ dist/${PANEL_PATH}/ (satış paneli)`);
console.log('✓ dist/index.html (nötr kapak)');
