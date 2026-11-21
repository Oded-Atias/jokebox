# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

`jokebox` is built in layers, each depending only on the one below it through a contract:

- `src/jokes/`: done. `createInMemoryJokeProvider(jokes, random)` returns a `JokeProvider` (`src/jokes/types.ts`). It throws at creation if the list is empty or holds a blank joke, so a bad list fails at startup. `random` is injected so tests can control it.
- `src/bot/`: done. `createMessageHandler(provider)` returns a `MessageHandler` that turns a `MessageInput` (`{ kind: 'text', text }` or `{ kind: 'new-joke' }`) into a `MessageReply` (`{ text, action }`). Every reply carries the `new-joke` action. The bot knows nothing about WhatsApp or buttons. Its tests use a fake `JokeProvider`, not the in-memory one.
- `src/whatsapp/`: not started. It will translate Meta's webhook JSON into `MessageInput`, and `MessageReply` into an interactive message with one reply button.
- `src/server.ts`: still only logs "Hello, World!". It will create the provider and the handler once at startup and wire them to `whatsapp/`.

Open: when `getRandomJoke` rejects at runtime, the handler rejects too and the user gets no reply. Deciding where to catch it was deferred until a provider that can fail exists.

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

Node (>=24, developed on v26) runs `.ts` files directly via type stripping, so there is no `dist/` and no compile step. `tsconfig.json` is `noEmit` and exists only for type checking. It enforces what type stripping needs: imports of project files include the `.ts` extension, type-only imports use `import type`, and no `enum`, `namespace` or constructor parameter properties (`erasableSyntaxOnly`).

## Imports

`package.json` maps `#/*` to `./src/*` through Node's subpath `imports` field, which Node, `tsc` and Vitest all resolve with no extra setup. Import a file from another folder under `src/` with `#/` (`import type { JokeProvider } from '#/jokes/types.ts'`), and a file from the same folder with `./`. Never use `../`. Do not add `paths` to `tsconfig.json`: Node ignores it at runtime, so the code would type-check and then crash on `npm start`.

## Code style

- **Never write comments.** This applies to every file in the repo, including config files such as `tsconfig.json`. Make the code explain itself through names and structure instead.
- **Put a blank line after every statement**, at every level: between top-level declarations, inside function bodies, inside test bodies and inside `if` blocks. The only exception is the `import` lines at the top of a file, which stay together without blank lines between them. Prettier does not enforce this, so check it by hand.

## Configuration

Secrets live in `.env`, which `.gitignore` excludes. `.env.example` is the committed template with the same keys (`PORT` and the `WHATSAPP_*` WhatsApp Cloud API settings); when adding a variable, add it to both files. No code reads these values yet.
