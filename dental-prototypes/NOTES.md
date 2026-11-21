# Proje Devir Notu – Klinik Demo Siteleri (Bağcılar Pilotu)

Bu dal Mac'te ayrı bir worktree'de: `~/Documents/demo-api-dental` (Rota Health dalı `~/Documents/demo-api` içinde). Bu dosya, projeye yeni bir Claude oturumunda (ör. Mac'te Claude Desktop) devam etmek için yazıldı.
Yeni oturuma: "dental-prototypes/NOTES.md dosyasını oku, kaldığımız yerden devam edelim" demen yeterli.

## İş fikri
- İstanbul'dan başlayıp önce bir semt, sonra ilçe, sonra il şeklinde özel diş poliklinik ve muayenehanelerini bulmak.
- Her kliniğe kendi adına özel, online randevulu ve 4 dilli (TR/EN/AR/DE) sağlık turizmi bölümü olan demo siteler hazırlamak.
- "Kanca" stratejisi: her kliniğin eksiğine göre (randevu yok, WhatsApp yok, yabancı hasta bölümü yok vb.) kişiye özel mesajla WhatsApp/telefon/Instagram'dan ulaşmak.
- İleride diğer randevulu sektörlere de genişlemek (kuaför/güzellik, veteriner, fizyoterapi, pilates, oto servis). Avukatlar reklam yasağı nedeniyle uygun değil; sağlık meslekleri tanıtım yönetmeliğine tabi.

## Fiyatlandırma (taslak)
| Paket | Kurulum | Aylık |
|---|---|---|
| Başlangıç | 7.500 ₺ | 1.000 ₺ |
| Profesyonel | 15.000 ₺ | 2.000 ₺ |
| Poliklinik / Sağlık turizmi | 30.000 ₺ | 4.000 ₺ |
| **Kurucu müşteri (ilk 5)** | 9.900 ₺ | 1.500 ₺ (+ referans karşılığı 1 ay ücretsiz) |

## Klasör yapısı
```
dental-prototypes/
  data/clinics.json     # klinik bilgileri (ad, adres, telefon, WhatsApp, saat, renk, tedaviler, key)
  data/outreach.json    # kliniğe özel kanca, kontrol listesi, açılış mesajı, odak (focus) ve önerilen tasarım (theme)
  data/sample.json      # uydurma "Örnek Diş Kliniği" (ana sayfadaki örnek tasarım; panelde yok)
  template/home.html    # markanstudio.com ana sayfası (Markan Studio tanıtımı)
  template/site.html    # tek şablon: 3 tema (modern/klasik/premium), 4 dil, randevu sihirbazı, yurt dışı hasta bölümü
  build.mjs             # node build.mjs  ->  dist/
  dist/                 # Cloudflare Pages'e yüklenen çıktı
```
- `dist/<slug>-<key>/` Modern, `.../klasik/` ve `.../premium/` diğer tasarımlar. Önerilen tasarım ⭐ ile işaretli.
- `dist/panel-9w4zq7/` satış paneli (sadece kullanıcı için): kliniğe özel Açılış / Telefon / Link / Takip mesajları, kanca kartı, durum takibi (localStorage).
- `dist/index.html` Markan Studio ana sayfası: hizmetler, nasıl çalışır, örnek tasarım, Bospora Health kartı, info@ iletişimi. Fiyat, hasta yorumu, "en iyi" iddiası yok. Gerçek klinik demolarına link vermez (build.mjs bunu kontrol eder).
- `dist/ornek-dis-klinigi/` (+ `klasik/`, `premium/`) ana sayfadan linklenen uydurma örnek klinik. Şeritte "Örnek tasarım · Bu klinik gerçek değildir" yazar; WhatsApp/e-posta yok.
- Demolar `noindex`; üstte "Tasarım önizlemesi · Resmi site değildir" şeridi var. Sağlık tanıtım yönetmeliği gereği hasta yorumu, fiyat veya "en iyi" iddiası yok.
- Randevu şu an demo: tarayıcıda saklanır, WhatsApp'ı olan klinikte talep hazır mesaj olarak wa.me ile gider.

## Yayın
- Cloudflare Pages projesi **kliniz-onizleme** (Direct Upload), `markanstudio.com` + `www` bağlı.
  - `https://markanstudio.com/<slug>-<key>/`
  - Panel: `https://markanstudio.com/panel-9w4zq7/`
- Yayın: `cd dental-prototypes && node build.mjs && npx wrangler pages deploy dist --project-name=kliniz-onizleme --branch=main`
- `bospora.markanstudio.com` ayrı Worker (bospora-health), başka repo/dal; buradan dokunma.
- **E-posta (21.11.2026):** Cloudflare Email Routing açık; `info@markanstudio.com` kullanıcının kişisel Gmail'ine yönlenir (MX + SPF Cloudflare tarafından eklendi).

## Klinikler (10) – durum
| Klinik | Path | Tasarım ⭐ | Kanal | Not |
|---|---|---|---|---|
| Densa | densa-k7m2 | Modern | Yüz yüze **25 Kasım** | Tanıdık, ilk müşteri hedefi. **Sitesi kapalı** (densaclinic.com açılmıyor) |
| MKM Klinik | mkm-klinik-h5q1 | Modern | WhatsApp | 🔥 **Sitesi yayında değil** (Natro varsayılan sayfası). 7 gün açık |
| Afildent | afildent-m3q8 | Premium | WhatsApp | 4,8 / 168. Site var ama randevu telefonla, sadece Türkçe |
| Astradent | astradent-p4x9 | Premium | WhatsApp | SEO güçlü. Randevu formu var ama takvim yok, WhatsApp/İngilizce yok |
| Kirazlı Diş | kirazli-t2n6 | Klasik | WhatsApp | 5,0 / 80. WhatsApp 0542 515 22 99. Online randevu ve dil yok |
| Yüzyıl Diş | yuzyil-dis-z9f4 | Klasik | WhatsApp | WhatsApp 0507 460 86 20, İngilizce sürüm var. 17:30 kapanış, online randevu yok |
| MEDICINE | medicine-dis-b7k5 | Klasik | WhatsApp / Instagram | Sitesi yok, sadece Instagram @tanrikuludentists |
| Dentbul | dentbul-n4x1 | Premium | WhatsApp | Özelbul zinciri şubesi; karar merkezde olabilir |
| Dentexpert Mahmutbey | dentexpert-mahmutbey-r8v3 | Modern | WhatsApp | ⬇ Düşük: randevu sayfası + 7 dil zaten var |
| Batışehir Boğaziçi | batisehir-bogazici-w6c2 | Premium | WhatsApp | ⬇ Düşük: 6 dil + sağlık turizmi zaten var, sadece takvim eksik |

Tablo öncelik sırasına göre dizildi.

**21.11.2026 – Google Haritalar:** 10 kliniğin adresi, telefonu, saatleri, web sitesi ve puanı doğrulandı (`clinics.json` içinde `verified` ve `gmaps`). Saatlerin çoğu tahminden uzun çıktı (Densa/Astradent hafta içi 21:00, Afildent 23:00; Yüzyıl 17:30'da kapanıyor). Boğaziçi Google'da "Dental Bosphorus" adıyla kayıtlı. Dentexpert'in adresi 1648. Sk. No:3-7B, sitesi dentexpert.tr.

**21.11.2026 – Mevcut siteler:** 9 sitenin hepsi tarandı (`clinics.json` içinde `currentSite` ve `siteChecked`). Kancalar, açılış mesajları ve öncelikler buna göre güncellendi.
- Densa ve MKM'nin siteleri çalışmıyor; ikisi için de en güçlü kanca bu. Göndermeden önce siteyi tekrar aç.
- Kirazlı ve Yüzyıl'da WhatsApp var; "sabit hat" kancası kaldırıldı, kanal WhatsApp oldu.
- Dentexpert ve Boğaziçi zaten çok dilli ve randevu odaklı; listenin sonuna alındı.
- Hiçbir kliniğin sitesinde müsait saatleri gösteren gerçek bir randevu takvimi görülmedi (Dentexpert'in /randevu sayfası kontrol edilmedi).

Hâlâ doğrulanmayanlar: WhatsApp numaralarının aktif olup olmadığı (sitede buton olması aktif olduğunu kanıtlamaz), Instagram hesaplarının aktifliği, Afildent/Densa/MKM Instagram'ı.

## Sıradaki işler
1. **Yayın:** Doğrulanan verilerle `node build.mjs && npx wrangler pages deploy dist --project-name=kliniz-onizleme`. Kalan `checks` maddeleri (WhatsApp aktif mi vb.) mesaj atmadan hemen önce panelden kontrol edilecek.
2. **Densa (25 Kasım):** Doktor isimleri ve saatleri gelince "Hekimlerimiz" bölümü, yabancı hasta SSS (4 dil), logo/renk uyarlaması.
3. **Marka:** Ad **Markan Studio**, alan adı markanstudio.com. Tanıtım ana sayfası ve info@ (Email Routing) 21.11.2026'da yayında. Kalan: önizleme şeridi ve mesaj imzalarına "Markan Studio" adı, logo.
4. **Çok sektör:** Üreticiyi sektörden bağımsız hale getir (tedaviler → hizmetler, sektöre göre ikon, metin ve kanca).
5. **İletişim hattı:** WhatsApp Business ayrı bir hatla kuruluyor. Profil, hızlı yanıtlar (panel mesajları) ve etiketler ayarlanacak. Yeni numarada günde 5–10 kişiye, kişiye özel mesaj at.
6. **Fatura:** Annenin şahıs şirketine mali müşavirle faaliyet kodları eklenecek (62.01 programlama, 63.11 hosting, 58.29 yazılım yayımlama, 62.02 danışmanlık, gerekirse 73.11 / 47.91). Kesin kodları müşavir belirleyecek. Basit hizmet sözleşmesi + KVKK (veri işleyen) maddesi hazırlanacak.
7. **İlk satıştan sonra:** Gerçek randevu altyapısı (bu repodaki Spring Boot + PostgreSQL `demo-api` temel alınabilir), klinik paneli, SMS/WhatsApp hatırlatma, kliniğin kendi alan adı.

## Kurallar / dikkat
- Toplu WhatsApp gönderimi yapma, numara banlanır. Açılış mesajı linksiz ve izin isteyen bir mesaj olmalı.
- "İlgilenmiyorum" diyenin demosunu sil, bir daha yazma.
- İYS kaydı ve 6563 sayılı kanun: ticari ileti için avukata danışılması önerildi.
- Demoları herkese açık listeleme. Klinik logo/fotoğrafını izinsiz kullanma. Kliniğin adına alan adı alma.
