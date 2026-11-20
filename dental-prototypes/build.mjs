// Kliniğe özel demo siteleri üretir: node build.mjs
// Girdi: data/clinics.json + template/site.html  ->  Çıktı: dist/<slug>/index.html + dist/index.html (satış paneli)
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const clinics = JSON.parse(readFileSync(join(root, 'data/clinics.json'), 'utf8'));
const template = readFileSync(join(root, 'template/site.html'), 'utf8');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

for (const c of clinics) {
  const json = JSON.stringify(c).replace(/</g, '\\u003c');
  const html = template
    .replace('{{TITLE}}', esc(`${c.name} Ağız ve Diş Sağlığı | Online Randevu`))
    .replace('{{DESCRIPTION}}', esc(`${c.fullName} – Bağcılar Mahmutbey. Online randevu, implant, zirkonyum, ortodonti ve yabancı hastalar için destek.`))
    .replace('{{COLOR}}', c.color)
    .replace('{{ACCENT}}', c.accent)
    .replace('/*CLINIC*/{}/*END*/', json);
  mkdirSync(join(dist, c.slug), { recursive: true });
  writeFileSync(join(dist, c.slug, 'index.html'), html);
  console.log(`✓ dist/${c.slug}/index.html`);
}

// ---- Satış paneli: demolar + hazır mesaj ----
const pitch = c => `Merhaba, ${c.fullName} için online randevu sistemi ve yabancı hasta (sağlık turizmi) bölümü olan yeni bir web sitesi tasarımı hazırladım. Ücretsiz önizleme:
{LINK}

• Hastalarınız 7/24 telefonsuz randevu alabiliyor, talepler doğrudan WhatsApp'ınıza ve klinik panelinize düşüyor
• Site Türkçe, İngilizce, Arapça ve Almanca
• KVKK aydınlatma/rıza ve sağlık tanıtım yönetmeliğine uygun içerik

Beğenirseniz 1 hafta içinde kendi alan adınızda yayına alırız. İlgilenmezseniz yazmanız yeterli, önizlemeyi kaldırırım ve tekrar rahatsız etmem.
İyi çalışmalar,
[Adınız] – [Telefon]`;

const rows = clinics.map(c => `
  <article class="card" style="--c:${c.color}">
    <div class="top"><span class="dot"></span><div><h2>${esc(c.fullName)}</h2><p>${esc(c.address)}</p></div></div>
    <dl>
      <dt>Telefon</dt><dd>${esc([c.phone, c.phone2].filter(Boolean).join(' · '))}</dd>
      <dt>WhatsApp</dt><dd>${c.whatsapp ? '+' + c.whatsapp : '<span class="warn">Yok (sabit hat) → önce telefonla ara</span>'}</dd>
      <dt>E-posta</dt><dd>${esc(c.email || '—')}</dd>
      <dt>Mevcut site</dt><dd>${esc(c.currentSite)}</dd>
      <dt>Kaynak</dt><dd class="muted">${esc(c.source)}</dd>
    </dl>
    <textarea data-slug="${c.slug}" data-tpl="${esc(pitch(c))}" rows="9"></textarea>
    <div class="actions">
      <a class="btn" href="./${c.slug}/" target="_blank">Demoyu aç</a>
      <button class="btn ghost" data-copy="${c.slug}">Mesajı kopyala</button>
      ${c.whatsapp ? `<a class="btn wa" data-wa="${c.whatsapp}" data-for="${c.slug}" target="_blank">WhatsApp'ta aç</a>` : ''}
      ${c.email ? `<a class="btn ghost" data-mail="${esc(c.email)}" data-for="${c.slug}">E-posta</a>` : ''}
      <select data-status="${c.slug}"><option>Ulaşılmadı</option><option>Mesaj atıldı</option><option>Arandı</option><option>İlgileniyor</option><option>Toplantı</option><option>Satıldı ✅</option><option>İlgilenmiyor</option></select>
    </div>
  </article>`).join('');

writeFileSync(join(dist, 'index.html'), `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Satış Paneli – Mahmutbey Pilot</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Plus Jakarta Sans",system-ui,sans-serif;background:#f3f5f8;color:#14202b;padding:28px 16px}
.wrap{max-width:1100px;margin:0 auto}h1{font-size:28px;letter-spacing:-.02em}header p{color:#5b6b7a;margin:6px 0 18px}
.base{display:flex;gap:10px;align-items:center;background:#fff;border:1px solid #e4e9ee;border-radius:14px;padding:12px 14px;margin-bottom:22px;flex-wrap:wrap}
.base input{flex:1;min-width:220px;border:1px solid #e4e9ee;border-radius:10px;padding:10px;font:inherit}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:18px}
.card{background:#fff;border:1px solid #e4e9ee;border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:14px;border-top:5px solid var(--c)}
.top{display:flex;gap:12px}.dot{flex:none;width:14px;height:14px;border-radius:50%;background:var(--c);margin-top:6px}
h2{font-size:17px}.top p{font-size:13px;color:#5b6b7a}
dl{display:grid;grid-template-columns:96px 1fr;gap:6px 10px;font-size:13.5px}dt{color:#5b6b7a;font-weight:600}.muted{color:#8a99a6}.warn{color:#c2410c;font-weight:600}
textarea{width:100%;border:1px solid #e4e9ee;border-radius:12px;padding:10px;font:inherit;font-size:13px;resize:vertical;background:#fbfcfd}
.actions{display:flex;flex-wrap:wrap;gap:8px}.btn{border:0;cursor:pointer;font:inherit;font-weight:700;font-size:13.5px;padding:9px 14px;border-radius:999px;background:var(--c);color:#fff;text-decoration:none}
.btn.ghost{background:#fff;color:#14202b;border:1px solid #e4e9ee}.btn.wa{background:#25D366}
select{font:inherit;font-size:13px;border:1px solid #e4e9ee;border-radius:999px;padding:8px 10px;background:#fff}
.tips{margin-top:26px;background:#fff;border:1px solid #e4e9ee;border-radius:18px;padding:20px;font-size:14px;line-height:1.7}.tips h3{margin-bottom:6px}
</style></head><body><div class="wrap">
<header><h1>Mahmutbey Pilot – Satış Paneli</h1><p>${clinics.length} klinik · Bu sayfa sadece senin için. Durumlar bu tarayıcıda saklanır.</p></header>
<div class="base"><b>Yayın adresi:</b><input id="base" placeholder="https://ornek-demolar.pages.dev"><span class="muted" style="font-size:13px">Demoları yayınladığın adresi gir, mesajlardaki linkler otomatik dolar.</span></div>
<div class="grid">${rows}</div>
<div class="tips"><h3>Gönderim kuralları</h3>
• Günde en fazla 20–30 kişiye, tek tek ve kişisel mesaj at; toplu gönderim yapma (numara banlanır).<br>
• Sabit hatlı kliniklerde önce telefonla ara: “Size özel bir site önizlemesi hazırladım, WhatsApp'tan link atabilir miyim?”<br>
• “İlgilenmiyorum” diyenin demosunu sil ve listeden çıkar.<br>
• Bilgiler arama sonuçlarından derlendi; göndermeden önce Google Haritalar'dan telefon/adresi kontrol et.</div>
</div><script>
const $$=s=>[...document.querySelectorAll(s)];
const base=document.getElementById('base');
try{base.value=localStorage.getItem('base')||location.href.replace(/index\\.html$/,'').replace(/\\/$/,'')}catch(e){}
function fill(){const b=base.value.replace(/\\/$/,'');try{localStorage.setItem('base',b)}catch(e){}
  $$('textarea[data-slug]').forEach(t=>{t.value=t.dataset.tpl.replace('{LINK}',b+'/'+t.dataset.slug+'/');});
  $$('[data-wa]').forEach(a=>{const t=document.querySelector('textarea[data-slug="'+a.dataset.for+'"]');a.href='https://wa.me/'+a.dataset.wa+'?text='+encodeURIComponent(t.value);});
  $$('[data-mail]').forEach(a=>{const t=document.querySelector('textarea[data-slug="'+a.dataset.for+'"]');a.href='mailto:'+a.dataset.mail+'?subject='+encodeURIComponent('Kliniğiniz için online randevulu web sitesi önizlemesi')+'&body='+encodeURIComponent(t.value);});}
base.oninput=fill;fill();
$$('textarea[data-slug]').forEach(t=>t.oninput=()=>{t.dataset.tpl=t.value;fill();});
$$('[data-copy]').forEach(b=>b.onclick=()=>{const t=document.querySelector('textarea[data-slug="'+b.dataset.copy+'"]');navigator.clipboard.writeText(t.value);b.textContent='Kopyalandı ✓';setTimeout(()=>b.textContent='Mesajı kopyala',1500);});
$$('[data-status]').forEach(s=>{try{const v=localStorage.getItem('st-'+s.dataset.status);if(v)s.value=v}catch(e){};s.onchange=()=>{try{localStorage.setItem('st-'+s.dataset.status,s.value)}catch(e){}}});
</script></body></html>`);
console.log('✓ dist/index.html (satış paneli)');
