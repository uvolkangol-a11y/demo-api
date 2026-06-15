# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start only the DB, run the app locally
docker compose up postgres -d
./mvnw spring-boot:run

# Start everything (builds Docker image first)
docker compose up -d --build

# Build JAR (skip tests)
./mvnw package -DskipTests

# Run tests (requires a running PostgreSQL on localhost:5432)
docker compose up postgres -d
./mvnw verify

# Rebuild and restart only the app container
docker compose up -d --build app

# View app logs
docker compose logs -f app
```

## Architecture

Strict three-layer architecture under `com.example.demoapi`:

```
controller/   → REST endpoints + GlobalExceptionHandler
service/      → ItemService interface + impl/ItemServiceImpl
repository/   → ItemRepository (JpaRepository)
entity/       → Item (JPA entity)
dto/          → ItemRequest / ItemResponse (Java Records)
config/       → OpenApiConfig
```

**Request flow:** `Controller` → `Service interface` → `ServiceImpl` → `Repository` → PostgreSQL

**Key design decisions:**
- `DELETE` is a **soft delete** — sets `active = false`, never removes rows. `findAll()` only returns `active = true` records via `findAllByActiveTrue()`.
- `ServiceImpl` is class-level `@Transactional(readOnly = true)`; write methods override with `@Transactional`.
- DTOs are Java Records. `ItemResponse` has a static factory `ItemResponse.from(Item)`.
- All error responses use Spring 6 `ProblemDetail` (RFC 7807). `GlobalExceptionHandler` maps `EntityNotFoundException` → 404 and `MethodArgumentNotValidException` → 422 with a field-level `errors` map.

## Database

Flyway manages schema — `ddl-auto` is set to `validate`, so Hibernate never touches the schema. All DDL lives in `src/main/resources/db/migration/`.

Migration naming convention: `V{version}__{description}.sql`

New migrations must be added as new versioned files; never edit existing ones.

## Environment Variables

All DB connection details are env-var driven with defaults pointing to the local Docker Compose stack:

| Variable | Default |
|----------|---------|
| `DB_HOST` | `localhost` |
| `DB_PORT` | `5432` |
| `DB_NAME` | `demoapi` |
| `DB_USER` | `demoapi` |
| `DB_PASSWORD` | `demoapi` |

Tests use `src/test/resources/application-test.yml` which reads `SPRING_DATASOURCE_URL/USERNAME/PASSWORD` (set by CI).

## API & Docs

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/api-docs`

When adding new endpoints, annotate with `@Tag`, `@Operation`, `@ApiResponse` (controller) and `@Schema` (DTOs) to keep the Swagger UI complete.

## CI

Two GitHub Actions jobs on every push/PR to `master`:
1. **build-and-test** — `mvn verify` against a real PostgreSQL service container
2. **docker-build** — multi-stage image build smoke-test (no push); runs only after build-and-test passes
