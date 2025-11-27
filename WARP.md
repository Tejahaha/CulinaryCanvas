# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository overview

This repo is a small full-stack "CulinaryCanvas" / FoodRecipe app:

- `FreshFork-Backend/`: Spring Boot 3 API backed by MySQL, using Spring Data JPA and JWT-based auth.
- `FreshFork-Frontend/`: React + Vite SPA with Tailwind CSS 4 and React Router.
- `Docker-compose.yml`: Local orchestration of MySQL, backend, and frontend containers.

The frontend talks to the backend over HTTP using hard-coded URLs like `http://localhost:8083/...` in the React components.

## Common commands

### Docker-based local environment (recommended)

Run all services together from the repo root:

- Build and start MySQL + backend + frontend:
  - `docker compose -f Docker-compose.yml up --build`
- Start without rebuilding:
  - `docker compose -f Docker-compose.yml up`
- Stop and remove containers:
  - `docker compose -f Docker-compose.yml down`

Ports and services (from `Docker-compose.yml`):

- MySQL: host `localhost:3308` → container `db:3306`, database `foodrecipe`, root password `root`.
- Backend: host `http://localhost:8083` → container port `8080`.
- Frontend: host `http://localhost:8082` (served by the frontend container).

When changing backend ports, update any hard-coded URLs in `FreshFork-Frontend/src/**` (e.g. `AddRecipeComponent.jsx`, `SearchRecipesComponent.jsx`).

### Backend (Spring Boot, Maven)

Run these from `FreshFork-Backend/`.

- Build JAR:
  - `mvn clean package`
- Run the application (expects DB env vars or Docker Compose):
  - `mvn spring-boot:run`
- Run all tests:
  - `mvn test`
- Run a single test class (example):
  - `mvn -Dtest=FoodRecipeApplicationTests test`

Database configuration is externalized in `FreshFork-Backend/src/main/resources/application.properties` via:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `SPRING_JPA_HIBERNATE_DDL_AUTO`

Docker Compose provides these automatically for local development. If you run the backend without Docker, set them yourself (for example, pointing at the MySQL instance on `localhost:3308`).

### Frontend (React + Vite)

Run these from `FreshFork-Frontend/`.

- Install dependencies:
  - `npm install`
- Start dev server (default Vite port 5173):
  - `npm run dev`
- Build for production:
  - `npm run build`
- Preview production build locally:
  - `npm run preview`
- Lint the codebase:
  - `npm run lint`

The ESLint configuration is in `FreshFork-Frontend/eslint.config.js` and uses `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.

There are currently no frontend test scripts defined in `FreshFork-Frontend/package.json`.

## High-level architecture

### Backend API

The backend is a conventional Spring Boot layered architecture under `FreshFork-Backend/src/main/java/com/demo/FoodRecipe/`:

- Entry point: `FoodRecipeApplication.java` (`@SpringBootApplication`).
- Controllers (`controller/`): define HTTP endpoints.
  - `UserController` under `/user` for signup/signin and basic user retrieval.
  - `RecipeController` under `/api/recipes` for CRUD and search operations.
- Services (`service/`): business logic and orchestration.
  - `UserService` manages user persistence and credential validation via `UserRepository` and issues JWTs through `JWTService`.
  - `RecipeService` encapsulates recipe-related operations (creation, ownership checks, search, deletion).
  - `JWTService` issues and validates JWTs using `io.jsonwebtoken`.
- Repositories (`repository/`): Spring Data JPA interfaces.
  - `UserRepository` exposes custom JPQL queries for credential validation and lookup by email/password.
  - `RecipeRepository` provides query methods for ingredients, cuisine, dietary tag, name, and creator.
- Entities (`model/`): JPA-mapped domain models.
  - `User` maps basic user data to `user` table (id, name, email, password, role).
  - `Recipe` maps recipes to `recipes` table, including `@ElementCollection` for `ingredients` and a `createdBy` field.
- Exceptions (`exception/`):
  - `ResourceNotFoundException` used by services when entities are not found.

**Typical flow for new features:**

1. Add/extend a JPA entity under `model/` if you need new fields.
2. Add finder methods to the corresponding repository interface in `repository/` (using Spring Data method naming).
3. Implement business logic in a `@Service` class in `service/`.
4. Expose HTTP endpoints in a `@RestController` in `controller/` and delegate to the service.
5. If the feature is user-specific, follow the ownership pattern in `RecipeService` (check `createdBy` against the requesting user ID) and consider integrating JWT-based identity from `JWTService`.

**Authentication and authorization:**

- `UserService.ValidateUser` verifies credentials via `UserRepository` and calls `JWTService.generateToken(User)`.
- `JWTService` embeds the user id and email in the JWT claims and returns a compact token string.
- `addRecipe` and related operations in `RecipeService` use a `userId` parameter (currently passed as a query parameter) to associate and verify ownership rather than decoding it directly from the token.
- On the frontend, components such as `AddRecipeComponent.jsx` decode the JWT payload client-side to obtain the `id` used as `userId` in queries.

If you add endpoints that should be protected, mirror this pattern: require a token, decode/validate it via `JWTService`, and use the resulting user id for ownership checks and queries.

**Persistence and configuration:**

- Database connection and JPA settings are defined in `application.properties` and parameterized by environment variables.
- MySQL schema is managed through JPA with `spring.jpa.hibernate.ddl-auto` (set by Docker Compose).

### Frontend SPA

The frontend lives under `FreshFork-Frontend/src/` and is a React SPA powered by Vite, Tailwind CSS, and React Router.

Key entry points and composition:

- `main.jsx`:
  - Mounts the React app into `#root`.
  - Wraps the app with `BrowserRouter` and the custom `ThemeProvider` from `ThemeContext`.
- `App.jsx`:
  - Reads the current route using `useLocation`.
  - Renders either the standalone marketing/auth pages (`LandingPage`, login, signup) or the main authenticated layout with navigation, header, and route content.
  - Uses `AppRouter` to render route-specific content.
  - Manages theme toggling by consuming `ThemeContext` and persistently storing the theme in `localStorage`.

Routing (`AppRouter.jsx`):

- Defines routes for:
  - The landing page (`/` → `LandingPage`).
  - Recipe exploration (`/explore` → `SearchRecipesComponent`).
  - Adding recipes (`/add` → `AddRecipeComponent`).
  - Managing a user's recipes (`/user-recipes` → `UserRecipesComponent`).
  - Authentication (`/login`, `/signup`).

Themed UI and landing experience (`LandingPage.jsx`):

- Provides a rich marketing-style landing page with animations, parallax, testimonials, CTA, and a footer.
- Uses Lucide icons and Tailwind utility classes for layout and styling.

Theme management (`ThemeContext.jsx`):

- Detects system theme via `prefers-color-scheme` and persists user choice in `localStorage`.
- Applies theme classes (`dark-mode` / `light-mode`) to the document root, which Tailwind-aware styles can respond to.

Recipe flows (`MainComponents/`):

- `AddRecipeComponent.jsx`:
  - Reads `token` from `localStorage`, decodes the JWT (base64 `payload`) to extract `id`.
  - Sends `POST` requests to `http://localhost:8083/api/recipes?userId={id}` with a JSON body matching the backend `Recipe` entity.
  - Splits comma-separated ingredient input into an array.
- `SearchRecipesComponent.jsx`:
  - On mount, fetches all recipes from `http://localhost:8083/api/recipes/all`.
  - Supports searching by name via `GET /api/recipes/search/by-name?name=...`.

When adding new frontend features that integrate with the backend, follow these patterns:

- Keep API base URLs consistent with the backend port and context path; consolidate them if you introduce more API consumers.
- Use the JWT from `localStorage` as the source of truth for the current user and pass the user id or token to the backend endpoints in a consistent way.

## Testing

### Backend

- Existing tests are under `FreshFork-Backend/src/test/java/com/demo/FoodRecipe/`.
- `FoodRecipeApplicationTests` currently only verifies that the Spring context loads.
- Add new tests alongside the classes they cover, mirroring package structure (e.g. service tests under `.../service/`, controller tests under `.../controller/`).

### Frontend

- There are currently no configured frontend test frameworks or scripts in `FreshFork-Frontend/package.json`.

If you introduce frontend tests, document the chosen tool (e.g. Vitest, Jest, Testing Library) and the relevant `npm` scripts in this file.
