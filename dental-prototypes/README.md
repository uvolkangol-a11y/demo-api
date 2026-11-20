# Diş Kliniği Demo Siteleri – Mahmutbey Pilotu

Her kliniğe özel, online randevulu ve 4 dilli (TR/EN/AR/DE) demo siteler.

```bash
node build.mjs        # data/clinics.json + template/site.html -> dist/
```

- `dist/<slug>/index.html` – kliniğe özel demo (tek dosya, sunucu gerektirmez)
- `dist/index.html` – satış paneli: hazır WhatsApp/e-posta mesajı + takip durumu
- Yeni klinik eklemek: `data/clinics.json`'a bir kayıt ekle, `node build.mjs` çalıştır.

Demolar `noindex` etiketli ve üstte "Tasarım önizlemesi · Resmi site değildir" şeridi taşır.
Randevular demo modunda tarayıcıda saklanır (footer → "Klinik Paneli (demo)") ve
klinikte WhatsApp varsa talep hazır mesaj olarak WhatsApp'a gönderilir.
