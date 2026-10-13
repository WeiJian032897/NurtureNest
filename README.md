# NURTURE NEST

## Project Overview

NURTURE NEST is a Next.js application in an early project state.

TODO: Add the confirmed product purpose and business scope. The current app code still contains the default starter page, so the exact business functionality is not yet defined in code.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16.4.0 | React framework for routing, rendering, local development, and production builds |
| React 19.3.0 | UI library used by Next.js |
| TypeScript | Type checking and typed application code |
| Tailwind CSS 4 | Styling, imported from `src/app/globals.css` |
| ESLint | Code quality checks using `eslint-config-next` |
| Node.js | JavaScript runtime for development tools and builds |
| npm | Dependency installation and script runner |
| Firebase 12.18.0 | Installed dependency; TODO: confirm actual app usage before documenting Firebase features |

Firebase is currently listed in `package.json`, but no Firebase code, Firebase environment variables, `firebase-admin`, or `server-only` usage was found in the source files at the time this README was updated.

## Prerequisites

- Node.js
  - This project was last checked with Node.js `v26.11.1`.
- npm
  - This project was last checked with npm `11.20.0`.
- Git
  - Recommended for version control and checking local changes.

On Windows, prefer `npm.cmd` instead of `npm`.

## Installation & Development

From PowerShell:

```powershell
cd D:\NurtureNest
npm.cmd run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. Use the address printed in the terminal if Next.js shows a different port.

What these commands do:

- `npm.cmd run dev` starts the local Next.js development server.

To stop the development server, press `Ctrl + C` in the terminal where it is running.

## Essential Commands

| Command | Purpose |
|---|---|
| `npm.cmd run dev` | Start the local development server |
| `Ctrl + C` | Stop the running server in the active terminal |
| `npm.cmd run lint` | Run ESLint checks |
| `npm.cmd run build` | Create an optimized production build |
| `npm.cmd run start` | Start the production server after a successful build |
| `npm.cmd ci` | Reinstall dependencies from the lockfile |
| `npm.cmd ls --depth=0` | Check top-level installed dependencies |

No `test` or `typecheck` script is currently configured in `package.json`.

A successful production build means the app can compile. It does not prove that all business flows or user-facing behavior have been fully tested.

## Project Structure

| Path | Purpose |
|---|---|
| `src/app/` | Next.js App Router files |
| `src/app/page.tsx` | Current home page |
| `src/app/layout.tsx` | Root layout, metadata, and font setup |
| `src/app/globals.css` | Global CSS and Tailwind import |
| `public/` | Static assets served from the site root |
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration and `@/*` path alias |
| `eslint.config.mjs` | ESLint configuration for Next.js and TypeScript |
| `package.json` | Project scripts and dependency declarations |
| `package-lock.json` | Locked dependency tree used by `npm.cmd ci` |
| `.gitignore` | Files and folders excluded from Git |

There is currently no `.env.example` file.

## Environment Variables & Security

No required environment variables were found in the current source code.

If environment variables are added later:

- Put local secrets in `.env.local`.
- Do not commit `.env.local`, API secrets, service account files, private keys, or `.pem` files.
- Browser-exposed variables must use the `NEXT_PUBLIC_` prefix.
- Do not put server-side secrets in `NEXT_PUBLIC_` variables.
- Firebase browser configuration is not the same thing as Firebase Admin or service account credentials.

TODO: Add a `.env.example` file once the app has confirmed required environment variables.

## Common Checks

If the project does not start or behaves unexpectedly, check these first:

| Check | Command or File |
|---|---|
| Node version | `node -v` |
| npm version | `npm.cmd -v` |
| Installed dependency tree | `npm.cmd ls --depth=0` |
| Lockfile install | `npm.cmd ci` |
| Lint status | `npm.cmd run lint` |
| Production compile | `npm.cmd run build` |
| Local Git changes | `git status --short` |
| Environment files | `.env.local` and `.env.example` if added later |

## Notes

- `next.config.ts` currently enables `cacheComponents`, `partialPrefetching`, and a Turbopack CSS rule for Tailwind CSS.
- `.gitignore` excludes `node_modules`, `.next`, build output, coverage, debug logs, environment files, and private key files.
- `firebase-admin` and `server-only` are not currently installed or used.
