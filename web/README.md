# Bospora Health — web preview

Patient-facing brand of Markan Studio (formerly "Rota Health"; renamed because "Rota" is registered by others in classes 44 and 39, see NOTES.md).

Live: https://bospora.markanstudio.com (Cloudflare Worker `bospora-health`, static assets from `dist/`). Update: `./build.sh && npx wrangler deploy` from `web/`. The old Netlify copy at https://rota-health.netlify.app still shows the Rota name.

Mobile-first, single-file launch preview (`index.html`) of a medical travel platform:
Google-rated dental and hair transplant clinics in Türkiye, booking on a 10% deposit model.

- Languages: English (default), Arabic (RTL), German, Russian, French, Turkish.
  Language follows the URL hash (`#ar`, `#de`, `#ru`, `#fr`, `#tr`), then the browser language.
- Clinic listings are **sample data** and are labelled as such in the UI.
- Booking produces a request with a reference code and hands it to WhatsApp.
  Set `WHATSAPP_NUMBER` at the top of the script to route requests to the coordinator.
- `DEPOSIT_RATE` (0.10) drives the deposit/commission split shown to the patient.

## Next steps before real launch
1. Google Places API (New) key → real clinics, ratings and review counts (show Google attribution; only `place_id` may be stored long-term).
2. Booking + clinic tables in the Spring Boot API (`/api/clinics`, `/api/bookings`) with Flyway migrations.
3. Deposit payment (iyzico / PayTR for a Turkish entity; Stripe needs a foreign entity).
4. USHAŞ intermediary authorization certificate (2025 regulation, RG 32882) before taking patients.
