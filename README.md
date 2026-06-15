# demo-api

Spring Boot 3 REST API — PostgreSQL, Flyway, Docker Compose.

[![CI](https://github.com/uvolkangol-a11y/demo-api/actions/workflows/ci.yml/badge.svg)](https://github.com/uvolkangol-a11y/demo-api/actions/workflows/ci.yml)

## Stack

| Katman | Teknoloji |
|--------|-----------|
| Runtime | Java 21 |
| Framework | Spring Boot 3.3 |
| Veritabanı | PostgreSQL 16 |
| Migration | Flyway |
| Build | Maven 3.9 |
| Container | Docker Compose |

## Hızlı başlangıç

**Gereksinimler:** Docker Desktop

```bash
git clone https://github.com/uvolkangol-a11y/demo-api.git
cd demo-api
docker compose up -d
```

API `http://localhost:8080` adresinde hazır.

| Arayüz | URL |
|--------|-----|
| Swagger UI | http://localhost:8080/swagger-ui.html |
| OpenAPI JSON | http://localhost:8080/api-docs |

### Sadece DB'yi çalıştır, uygulamayı IDE'den başlat

```bash
docker compose up postgres -d
./mvnw spring-boot:run
```

## API

Base URL: `/api/v1/items`

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| `GET` | `/items` | Aktif tüm kayıtlar |
| `GET` | `/items/{id}` | Tek kayıt |
| `POST` | `/items` | Yeni kayıt |
| `PUT` | `/items/{id}` | Güncelle |
| `DELETE` | `/items/{id}` | Soft delete |

### Örnek istekler

```bash
# Oluştur
curl -X POST http://localhost:8080/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Örnek","description":"Açıklama"}'

# Listele
curl http://localhost:8080/api/v1/items

# Güncelle
curl -X PUT http://localhost:8080/api/v1/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Yeni ad","description":"Yeni açıklama"}'

# Sil (soft delete)
curl -X DELETE http://localhost:8080/api/v1/items/1
```

### Hata yanıtları

RFC 7807 `ProblemDetail` formatı kullanılır:

```json
{ "type": "about:blank", "title": "Not Found", "status": 404, "detail": "Item not found: 99" }
{ "type": "about:blank", "title": "Unprocessable Entity", "status": 422, "detail": "Validation failed", "errors": { "name": "Name is required" } }
```

## Proje yapısı

```
src/main/java/com/example/demoapi/
├── controller/       # REST endpoint'leri + GlobalExceptionHandler
├── service/          # Interface + impl/
├── repository/       # JPA repository
├── entity/           # JPA entity
└── dto/              # Request / Response record'ları

src/main/resources/
├── application.yml
└── db/migration/     # Flyway SQL dosyaları
```

## Ortam değişkenleri

| Değişken | Varsayılan | Açıklama |
|----------|------------|----------|
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_NAME` | `demoapi` | Veritabanı adı |
| `DB_USER` | `demoapi` | Kullanıcı adı |
| `DB_PASSWORD` | `demoapi` | Şifre |

## Test

```bash
# Testleri çalıştır (çalışan bir PostgreSQL gerektirir)
docker compose up postgres -d
./mvnw verify
```

## CI

Her `push` ve `pull_request`'te GitHub Actions tetiklenir:

1. **build-and-test** — PostgreSQL service container ile `mvn verify`
2. **docker-build** — Multi-stage Docker image build (push olmadan)
