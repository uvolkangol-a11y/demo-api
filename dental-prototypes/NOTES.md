# Proje Devir Notu – Klinik Demo Siteleri (Bağcılar Pilotu)

Bu dosya, projeye yeni bir Claude oturumunda (ör. Mac'te Claude Desktop) devam etmek için yazıldı.
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
  template/site.html    # tek şablon: 3 tema (modern/klasik/premium), 4 dil, randevu sihirbazı, yurt dışı hasta bölümü
  build.mjs             # node build.mjs  ->  dist/
  dist/                 # Cloudflare Pages'e yüklenen çıktı
```
- `dist/<slug>-<key>/` Modern, `.../klasik/` ve `.../premium/` diğer tasarımlar. Önerilen tasarım ⭐ ile işaretli.
- `dist/panel-9w4zq7/` satış paneli (sadece kullanıcı için): kliniğe özel Açılış / Telefon / Link / Takip mesajları, kanca kartı, durum takibi (localStorage).
- `dist/index.html` nötr kapak sayfası (klinik listesi göstermez).
- Demolar `noindex`; üstte "Tasarım önizlemesi · Resmi site değildir" şeridi var. Sağlık tanıtım yönetmeliği gereği hasta yorumu, fiyat veya "en iyi" iddiası yok.
- Randevu şu an demo: tarayıcıda saklanır, WhatsApp'ı olan klinikte talep hazır mesaj olarak wa.me ile gider.

## Yayın
- Cloudflare Pages projesi (Direct Upload). Proje adı muhtemelen **kliniz-onizleme**, Cloudflare panelinden doğrula.
  - `https://kliniz-onizleme.pages.dev/<slug>-<key>/`
  - Panel: `https://kliniz-onizleme.pages.dev/panel-9w4zq7/`
- Şimdiye kadar zip yüklendi. Mac'ten doğrudan yüklemek için:
  `cd dental-prototypes && node build.mjs && npx wrangler pages deploy dist --project-name=kliniz-onizleme`
  (ilk seferde `npx wrangler login`)

## Klinikler (10) – durum
| Klinik | Path | Tasarım ⭐ | Kanal | Not |
|---|---|---|---|---|
| Densa | densa-k7m2 | Modern | Yüz yüze **25 Kasım** | Kullanıcının tanıdığı. İlk müşteri/referans hedefi |
| Astradent | astradent-p4x9 | Premium | WhatsApp | SEO var, randevu yok |
| Dentexpert Mahmutbey | dentexpert-mahmutbey-r8v3 | Modern | WhatsApp | Metro yanında |
| Kirazlı Diş | kirazli-t2n6 | Klasik | Telefon | Sadece sabit hat, 4.9 / 75 yorum |
| MKM Klinik | mkm-klinik-h5q1 | Modern | WhatsApp | Her gün 10–21 açık, mkmklinik.com |
| Afildent | afildent-m3q8 | Premium | WhatsApp | 4.8 / 149 yorum |
| Batışehir Boğaziçi | batisehir-bogazici-w6c2 | Premium | WhatsApp | İngilizce ekip, sağlık turizmi için en iyi aday |
| Yüzyıl Diş | yuzyil-dis-z9f4 | Klasik | Telefon | Sabit hat |
| MEDICINE | medicine-dis-b7k5 | Klasik | WhatsApp | Çene cerrahisi, Doktortakvimi profili var |
| Dentbul | dentbul-n4x1 | Premium | WhatsApp | İmplant odaklı |

Bilgiler arama sonuçlarından derlendi. Klinik siteleri ve Google Haritalar bulut ortamından açılamadığı için **doğrulanmadı**. Çalışma saatlerinin çoğu tahmini. Instagram hesapları bulunamadı.

## Sıradaki işler
1. **Tarayıcıyla doğrulama:** Her kliniğin Google Haritalar kaydı (telefon, saat, web sitesi, WhatsApp), mevcut sitelerinde online randevu ve yabancı hasta bölümü var mı (kancalar `outreach.json` içinde `checks` alanında), Instagram hesapları. Bulunanları `clinics.json` / `outreach.json`'a işle ve yeniden yükle.
2. **Densa (25 Kasım):** Doktor isimleri ve saatleri gelince "Hekimlerimiz" bölümü, yabancı hasta SSS (4 dil), logo/renk uyarlaması.
3. **Marka:** Çok sektörlü, jenerik bir ajans adı seçilecek (öneriler: Randevulu, Vitrinim, Webkanca, Sitekur). Alan adı alınıp Cloudflare'e bağlanacak, Email Routing ile info@ adresi açılacak. Önizleme şeridi ve mesaj imzalarına marka adı eklenecek. Basit bir ajans tanıtım sitesi yapılacak.
4. **Çok sektör:** Üreticiyi sektörden bağımsız hale getir (tedaviler → hizmetler, sektöre göre ikon, metin ve kanca).
5. **İletişim hattı:** WhatsApp Business ayrı bir hatla kuruluyor. Profil, hızlı yanıtlar (panel mesajları) ve etiketler ayarlanacak. Yeni numarada günde 5–10 kişiye, kişiye özel mesaj at.
6. **Fatura:** Annenin şahıs şirketine mali müşavirle faaliyet kodları eklenecek (62.01 programlama, 63.11 hosting, 58.29 yazılım yayımlama, 62.02 danışmanlık, gerekirse 73.11 / 47.91). Kesin kodları müşavir belirleyecek. Basit hizmet sözleşmesi + KVKK (veri işleyen) maddesi hazırlanacak.
7. **İlk satıştan sonra:** Gerçek randevu altyapısı (bu repodaki Spring Boot + PostgreSQL `demo-api` temel alınabilir), klinik paneli, SMS/WhatsApp hatırlatma, kliniğin kendi alan adı.

## Kurallar / dikkat
- Toplu WhatsApp gönderimi yapma, numara banlanır. Açılış mesajı linksiz ve izin isteyen bir mesaj olmalı.
- "İlgilenmiyorum" diyenin demosunu sil, bir daha yazma.
- İYS kaydı ve 6563 sayılı kanun: ticari ileti için avukata danışılması önerildi.
- Demoları herkese açık listeleme. Klinik logo/fotoğrafını izinsiz kullanma. Kliniğin adına alan adı alma.
