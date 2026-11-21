# Bospora Health (eski adı Rota Health) — proje notları (devir dosyası)

Bu dosya, bulut oturumunda yapılan işin ve alınan kararların özetidir. Yeni bir Claude oturumuna
"web/NOTES.md ve web/README.md dosyalarını oku, buradan devam ediyoruz" diyerek başlayın.

## Şu an ne var
- `web/index.html` — sitenin kaynağı (claude.ai Artifact formatı: `<html>/<head>` iskeleti yok).
- `web/build.sh` — kaynağı bağımsız siteye çevirir → `web/dist/index.html` (doctype, favicon, WhatsApp önizleme etiketleri).
- Canlı site: https://rota-health.netlify.app (Netlify Drop ile yüklendi, "Public").
- Önizleme (claude.ai): https://claude.ai/artifact/MNWvW68Tg33dwPSACw5S8i
- Diller: EN (varsayılan), AR (sağdan sola), DE, RU, FR, TR. URL'deki `#ar`, `#de`… dili seçer.
- Klinikler **örnek veri** (kartlarda "Örnek/Sample" etiketi var). Gerçek klinik + Google puanı henüz yok.
- `WHATSAPP_NUMBER` boş → randevu mesajı WhatsApp'ta hazır açılıyor ama alıcıyı hasta seçiyor.

## Güncelleme akışı
1. `web/index.html` düzenle.
2. `./web/build.sh` çalıştır.
3. `web/dist/index.html` dosyasını Netlify'da site sayfasındaki **Drop** alanına sürükle (tek HTML dosyası kabul ediliyor).

## İş modeli kararları
- Komisyon %10, **hasta kaporası olarak peşin** alınır (randevu klinik tarafından onaylanınca). Kalan %90 klinikte ödenir.
  Neden: Klinikten sonradan fatura etmek komisyon kaçağına yol açar (hasta ve klinik platformu by-pass eder).
- Klinik onaylamazsa kapora iade edilir.
- Rakipler: Bookimed (onaylanan hasta başı sabit ücret + hasta kaporası), WhatClinic (talep başı ~€10'dan),
  bazı platformlar için %15–20 iddiası (teyit edilmedi). %10 rekabetçi.
- Ödeme: Türk şirketiyle iyzico / PayTR; Stripe için yurt dışı şirket gerekir.

## Pazar verisi (USHAŞ / TÜİK / UK ONS)
- 2024: 1.506.442 sağlık turisti, 3,02 milyar $. 2025: ~1,40 milyon, 3,02 milyar $ (hasta başı harcama arttı).
- Kaynak ülkeler (gösterge niteliğinde): Almanya, Irak, Rusya, İngiltere, Azerbaycan; sonra Libya, Körfez,
  Kazakistan/Özbekistan/Türkmenistan, Hollanda, ABD, Fransa.
- UK ONS: 2024'te İngiltere'den yurt dışı tedavi seyahatlerinin %37'si (196 bin) Türkiye'ye.
- Sıradaki branş önerisi: estetik cerrahi ve göz (LASIK); sonra obezite cerrahisi. Tüp bebek mevzuat açısından hassas.

## Yasal (lansman öncesi avukata teyit ettir)
- 2017 yönetmeliği, 26.04.2025 tarihli yeni yönetmelikle (RG 32882) değişti.
- Aracı kuruluşlar USHAŞ'tan **Uluslararası Sağlık Turizmi Yetki Belgesi** almalı: HealthTürkiye entegrasyonu,
  yabancı dilde site, en az 2 yabancı dilde 7/24 çağrı hizmeti, komplikasyon sigortası vb.
- Klinik web siteleri için sağlık hizmetlerinde tanıtım/reklam kuralları ve hasta verileri için KVKK ayrıca kontrol edilmeli.

## Marka yapısı (21.11.2026)
- **Markan Studio** şirketin adı ve kliniklere satılan B2B iş (web sitesi, online randevu, WhatsApp; `dental-prototypes/`). Hedef sınıf 42.
  TÜRKPATENT'te "markan s" ile başlayan kayıt yok. `markanstudio.com` ve `markanstudio.com.tr` boşta (henüz alınmadı).
  Birebir "markan" başka bir şirkette kayıtlı (06/07/12/16/20/24/35/37/40). Sınıf 35'e güvenilmemeli.
- **Bospora Health** hastaya görünen yeni marka (21.11.2026 kararı), "by Markan Studio" alt satırıyla. Rota adının yerine geçer.
  - Bosporus/Boğaz'dan türetilmiş uydurma ad; İstanbul + tedavi + gezi konumlandırması. Slogan önerisi: "Heal. Discover Istanbul."
  - TÜRKPATENT: "bospora" ile başlayan kayıt yok; "bosporus" kayıtlarının hiçbiri sınıf 44'te değil ("bosporus sound" 16/39, "bosphorus travel services" 2026 başvurusu 39).
  - Web'de sağlık/seyahatte "Bospora" kullanan yok. `bospora.com` ilgisiz bir sitede ("Be The Change").
  - Boştaki domainler: `bosporahealth.com`, `bosporacare.com`, `bosporaclinics.com`, `bosporatravel.com`, `bosporahealth.com.tr`, `bospora.com.tr`. Henüz alınmadı.
  - Gezi paketi satmak TÜRSAB belgesi gerektirir; gezi kısmı lisanslı bir acenteyle ortak yapılmalı.
  - Elenen hasta markası adayları: Kervan (KERVAN TEKSTİL neredeyse tüm sınıflarda tescilli), Turkuaz/Turquoise (ABD'de Turquoise Health, ayrıca "Turkuaz Health" aracı firma), Afiya (Hindistan'da Al Afiya Medi Tour), Byzantia ("byzantin travel" sınıf 39). Yedek: Yalia Health, Salamet Health.
- **Rota Health** (eski ad) neden bırakıldı:
  - `rotahealth.com` 2016'dan beri aktif bir sağlık teknolojisi şirketinin sitesi ("Rota Health | Know where every provider stands").
  - TÜRKPATENT'te birebir "rota" tescilleri: 2014/41976 **sınıf 44** (sağlık), 2025/116149 **sınıf 39** (seyahat), 2016/01931 sınıf 10 (Rota Ortopedi).
  - `rotahealth.netlify.app` başka bir firmanın (içecek markası) sitesi.
  - Boştaki domainler: `rota-health.com`, `rotahealthcare.com`, `rotaclinic.com`, `rotaclinics.com`, `rotahealth.com.tr`, `rotahealth.co`.
  - Sonuç: ad Bospora Health olarak değişti. Marka vekiline danışmadan tescil başvurusu yapılmamalı.

## Açık işler
1. Koordinatör WhatsApp numarasını `WHATSAPP_NUMBER`'a yaz.
2. Google Places API (New) anahtarı → gerçek klinikler, puan, yorum sayısı (Google atfı zorunlu; uzun süreli yalnızca `place_id` saklanabilir).
3. Bospora Health: domainleri al (`bosporahealth.com`, `bosporahealth.com.tr`, `bosporatravel.com`), marka vekiline 44 + 39 için benzerlik görüşü sor. Site metni Bospora'ya çevrildi (21.11.2026); Netlify site adı ve claude.ai önizlemesi hâlâ eski adla.
4. Randevu ve klinik verisi için backend (bu repodaki Spring Boot API'ye `/api/clinics`, `/api/bookings` eklenebilir).
5. Yeni hat: kliniklere web sitesi + online randevu + WhatsApp (bu sayfanın yapısı şablon olarak kullanılabilir).
