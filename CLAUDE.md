# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

`jokes-sender-bot` is at the scaffolding stage. The only source file is `src/server.ts`, which currently just logs "Hello, World!". There is no bot logic, joke source or messaging integration yet.

## Commands

- `npm start`: run the server (`node src/server.ts`).
- `npm run dev`: run with restart on file changes (`node --watch`).
- `npm run typecheck`: type-check with `tsc --noEmit`. Run it after changes; Node will happily run code with type errors.

There are no tests, linter or formatter yet.

## TypeScript without a build step

Node (>=24, developed on v26) runs `.ts` files directly via type stripping, so there is no `dist/` and no compile step. `tsconfig.json` is `noEmit` and exists only for type checking. It enforces what type stripping needs: relative imports include the `.ts` extension, type-only imports use `import type`, and no `enum`, `namespace` or constructor parameter properties (`erasableSyntaxOnly`).

## Code style

- **Never write comments.** This applies to every file in the repo, including config files such as `tsconfig.json`. Make the code explain itself through names and structure instead.

## Configuration

Secrets live in `.env`, which `.gitignore` excludes. `.env.example` is the committed template with the same keys (`PORT` and the `WHATSAPP_*` WhatsApp Cloud API settings); when adding a variable, add it to both files. No code reads these values yet.
