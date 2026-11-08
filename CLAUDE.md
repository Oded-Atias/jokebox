# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

`jokebox` is at the scaffolding stage. The only source file is `src/server.ts`, which currently just logs "Hello, World!". There is no bot logic, joke source or messaging integration yet.

## Commands

- `npm start`: run the server (`node src/server.ts`).
- `npm run dev`: run with restart on file changes (`node --watch`).
- `npm run typecheck`: type-check with `tsc --noEmit`. Run it after changes; Node will happily run code with type errors.
- `npm test`: run the Vitest suite once (`vitest run`).
- `npm run test:watch`: run Vitest in watch mode, re-running affected tests on every save.
- `npm run format`: format the whole repo with Prettier (`prettier --write .`).
- `npm run format:check`: report files that are not formatted, without changing them.

Formatting uses Prettier with the same `.prettierrc` as the work projects. `.vscode/settings.json` turns on format-on-save with the Prettier extension (`esbenp.prettier-vscode`). There is no linter yet.

## Testing

The project is built with TDD: every change starts with a failing test, then the minimal code to make it pass, then a refactor. Tests use Vitest with its default configuration, so there is no `vitest.config.ts`. Test files are named `*.test.ts` and live next to the code they test (`src/foo.ts` is tested by `src/foo.test.ts`). Import `describe`, `it` and `expect` explicitly from `"vitest"`; globals are not enabled.

## TypeScript without a build step

Node (>=24, developed on v26) runs `.ts` files directly via type stripping, so there is no `dist/` and no compile step. `tsconfig.json` is `noEmit` and exists only for type checking. It enforces what type stripping needs: relative imports include the `.ts` extension, type-only imports use `import type`, and no `enum`, `namespace` or constructor parameter properties (`erasableSyntaxOnly`).

## Code style

- **Never write comments.** This applies to every file in the repo, including config files such as `tsconfig.json`. Make the code explain itself through names and structure instead.

## Configuration

Secrets live in `.env`, which `.gitignore` excludes. `.env.example` is the committed template with the same keys (`PORT` and the `WHATSAPP_*` WhatsApp Cloud API settings); when adding a variable, add it to both files. No code reads these values yet.
