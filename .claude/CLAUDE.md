You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Project Overview

This is a monorepo containing:

- **ng-zealous**: An Angular component library (the main library being developed)
- **ng-zealous-docs**: Documentation/demo application showcasing the library components
- **starter**: An Angular application that serve as a starting point for real projects

The project uses Angular 21+ with standalone components, signals, and zoneless change detection.

## Common Development Commands

### Running the Application

```bash
pnpm start              # Start dev server for "starter" application
pnpm start:docs         # Start dev server for "ng-zealous-docs" application
```

### Building

```bash
pnpm build          # Build the "starter" application
pnpm build:docs     # Build the "ng-zealous-docs" application
pnpm build:lib      # Build the "ng-zealous" library (includes prebuild step to update peer dependencies)
```

### Testing

```bash
pnpm test              # Run unit tests for "starter" application
pnpm test:lib          # Run unit tests for "ng-zealous" library
pnpm e2e               # Run E2E tests with Playwright (starting "ng-zealous-docs" application)
```

### Code Quality

```bash
pnpm lint           # Run ESLint
pnpm format         # Format code with Prettier
```

### Internationalization

```bash
pnpm extract-i18n               # Extract i18n messages for docs app
pnpm extract-i18n:i18n          # Extract i18n messages for i18n library
```

Note: After extraction, a post-process script automatically runs to handle translation files.

### Library Publishing

```bash
pnpm prebuild:lib   # Update peer dependencies (runs automatically before build:lib)
pnpm build:lib      # Build the library
cd dist/ng-zealous && npm publish
```

## Architecture and Code Organization

### Library Structure (projects/ng-zealous/)

The ng-zealous library is organized as feature modules, each in its own directory:

- Each feature has its own folder (e.g., `alert/`, `avatar/`, `breadcrumb/`, `menu/`)
- Typically contains: components, directives, services, types, and providers
- Common patterns:
  - `*-types.ts`: TypeScript interfaces and types
  - `*-intl.ts`: Internationalization strings
  - `*-provider.ts`: DI providers
  - `*-service.ts`: Injectable services (Services can also use other suffixes (e.g., `breakpoint-observer.ts`))
  - `index.ts`: Public API exports

Major feature areas:

- **Layout system**: Complex layout components including header, sidebar, footer, banner, snackbar
- **Menu system**: Multiple menu types (dropdown, tree, sitemap)
- **UI components**: Alert, avatar, breadcrumb, burger, button, card, dialog, icon, tile, etc.
- **Utilities**: breakpoint observer, scroll, router-infos, resize-observer
- **Content**: Markdown renderer, ellipsis, focus-content
- **Theming**: Theme provider and color system
- **i18n**: Language selector and localization support

### Demo Application Structure (projects/ng-zealous-docs/src/app/)

- Each component demo is in its own directory (whose name generally corresponds to the name of the library module (e.g., `projects/ng-zealous-docs/src/app/alert/alert.ts` for `projects/ng-zealous/alert/alert.ts`))
- Uses `DocsLayout` component as the main layout wrapper
- Route-based navigation with lazy loading
- Each route has associated icon and title metadata

### Testing

- Unit tests use **Vitest**
- E2E tests use **Playwright**
- Tests located alongside source files or in `e2e/` directory for E2E
- Configuration:
  - Vitest: Uses Angular's built-in builder with `runner: "vitest"`
  - Playwright: Configured in `playwright.config.ts`, runs against dev server on port 4300

## Project Component Prefixes

- Component prefix for library: `z`
- Component prefix for docs app: `app`

## Project-Specific Patterns

### Provider Pattern

The library uses a consistent provider pattern:

```typescript
provideZFeature(); // For feature configuration
```

Examples: `provideZTheme()`, `provideZIcons()`, `provideZLanguage()`, `provideZBreadcrumb()`

### Internationalization

- Main app supports English and French locales
- Uses Angular's i18n with JSON format
- Translations in `src/locales/` and `projects/ng-zealous-i18n/src/locales/`
- Custom `*-intl.ts` files provide translatable strings for components

### Material Design Integration

- Uses Angular Material components and CDK
- Uses Material Symbols font for icons
- Date handling via date-fns with Angular Material adapter

### SSR Support

- Application supports Server-Side Rendering
- Configuration in `app.config.server.ts` and `app.routes.server.ts`
- Build outputs to `dist/ng-zealous-docs/`

## Multi-Project Workspace

This workspace contains 4 Angular projects:

1. **ng-zealous** (library) - The main component library
2. **ng-zealous-docs** (application) - Documentation and demos
3. **ng-zealous-i18n** (application) - i18n testing/support
4. **starter** (application) - The starter for real projects

When running Angular CLI commands, specify the project if needed:

```bash
ng build ng-zealous           # Build library
ng test ng-zealous-docs       # Test docs app
ng lint ng-zealous-i18n       # Lint i18n app
```

## Technology Stack

- Angular 21.0.0
- TypeScript 5.9.3
- Vitest 3.2.4 for unit testing
- Playwright 1.56.1 for E2E testing
- ESLint 9.37.0 with angular-eslint and prettier integration
- date-fns 4.1.0 for date handling
- marked 16.4.1 for Markdown
- highlight.js 11.11.1 for syntax highlighting
