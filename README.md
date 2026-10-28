# NURTURE NEST

## Project Overview

NURTURE NEST is a Next.js (App Router) confinement care discovery platform for families in Malaysia. It presents the Nurture Nest platform and individual centre pages, currently including Jade & Bloom in Setapak, Kuala Lumpur.

The project combines responsive presentation pages, interactive family testimonials, and a dedicated Jade & Bloom care page with Firebase email/password authentication, email verification, and basic user profiles in Firestore. Booking, payment, CRM, and CMS integrations are not implemented.

## Pages & Features

### Pages

- `/` (Nurture Nest Home)
  - Animated curved image hero, five platform benefits, a three-step introduction, and six typical confinement-package inclusions
  - Six partner centres displayed in a draggable, gently swinging Polaroid carousel, with automatic switching every 7.5 seconds and arrow/keyboard controls
  - “Kind words from our families” section after the partner centres: 25 local photos arranged in an interactive rotating sphere on a pure-white background
  - Photo selection opens a cream testimonial dialog with a large, centred square photo, name, centre, star rating, title, and full review; previous/next controls also allow browsing all 25 stories
  - Protected by `AuthGuard`: only signed-in, email-verified users can view the page
  - Loading screen while Firebase resolves authentication; no home content flash
  - User name and Logout controls in the home navigation
- `/centres` (Centre discovery landing page)
  - Shared platform hero with centre discovery copy
- `/centres/jade-and-bloom` (Jade & Bloom Main Page)
  - Hero and Brand Philosophy
  - Accommodation Experience with three room cards
  - Core Services, Environment & Facilities, and Brand Differentiation
  - Featured Room package and Testimonials
- `/centres/jade-and-bloom/rooms`, `/centres/jade-and-bloom/packages`
  - Dedicated views reusing the Jade & Bloom page component
- `/centres/jade-and-bloom/care`
  - Dedicated care page with its own title/description metadata and a four-part hero: eyebrow, headline, location/programme details, and caregiver photo
  - Six data-driven sections: Maternal Care, Newborn Care, Nourishing Cuisine, Personalised Wellness, Our Care Team, and Safety & Hygiene
  - Shared section layout with alternating image placement and cream/sage backgrounds; images appear above text on smaller screens
- `/centres/jade-and-bloom/faq`
  - Topic highlights, FAQ accordions, and an enquiry CTA using `mailto:`
- `/faq`
  - Redirects to `/centres/jade-and-bloom/faq`
- `/login`
  - Email/password login, email-verification checks, and resend support
  - Verified users are redirected to `/`; missing Firestore user documents are repaired before completing login
- `/signup`
  - Name, email, password, and confirm-password validation
  - Password strength meter, optional character-type guidance, and inline errors
  - Check-your-inbox screen with resend cooldown and automatic verification checks
  - Congratulations screen after verification; returns to login after signing out

### Implementation Status

#### Implemented (UI / Presentation)

- Responsive navigation, footer, platform pages, and Jade & Bloom sections using local assets
- Accommodation image hover effects, image carousels, FAQ accordions, and enquiry links
- Platform home sections and partner-centre Polaroid carousel, using local images and responsive card layouts
- Testimonial sphere with 25 photos, descriptive alt text, warm `#e8ddca` photo borders, soft shadows, and no filled circle behind the sphere
- Sphere rotation pauses on hover, keyboard focus, or an open dialog; manual pause/resume and drag-to-rotate are available. `prefers-reduced-motion` stops automatic rotation, and the preference is observed live.
- Accessible testimonial dialogs with native modal semantics, labelled Close buttons, Escape/backdrop dismissal, Tab/Shift+Tab focus containment, scroll locking, and focus restoration
- Testimonial dialog photos use a square container up to 400px wide and `object-contain`, with surrounding space and scrollable content on smaller screens
- Dedicated Jade & Bloom care page driven by `src/lib/care-data.ts`, reusing the shared cream/white/sage `Section` component and optimized local images
- Firebase email/password registration, login, verification, logout, and Firestore user profiles
- Registration flow: create account, update display name, create `users/{uid}`, and send verification email
- Registration retains an in-memory session for direct resend; refresh discards it and returns to the registration form
- Shared email-verification watcher for signup and unverified login: checks every four seconds, pauses while hidden, checks immediately when visible again, and stops on verification or unmount. Signup shows congratulations; login keeps the entered credentials and asks the user to click Log in without signing in automatically.
- Returning to login or leaving the registration screen signs out the temporary session
- Login rejects and signs out unverified users while preserving the form inputs. Resend uses the returned Firebase user object held only in page memory, without another password login, and signs out again on completion or failure.
- Resend buttons have a 60-second cooldown and friendly rate-limit/error feedback
- Registration continues if profile creation or verification-mail delivery fails; resend remains available, and verified login repairs missing profiles
- Reusable authentication provider/guard and a standalone user menu with name fallback and logout
- Password policy shared by zod and the strength meter: 8-64 Unicode code points, without trimming or paste truncation
- Strength levels: Empty, Weak, Fair, Good, Strong; common patterns always score Weak, while the optional checklist does not impose extra validation rules
- Overlength errors appear immediately; minimum-length errors appear after blur or submit
- Password meter animations, reduced-motion support, accessible meter semantics, and debounced screen-reader announcements
- English / Simplified Chinese and system / light / night appearance for authentication pages, with preferences saved locally
- Existing password visibility controls and empty-form resets on page entry/exit and successful login; unverified login and resend preserve the current form inputs
- Nurture Nest logo favicon and early theme initialization through `next/script`

#### Demo / Placeholder Content (No backend wiring)

- Centre descriptions, testimonials, ratings, pricing, and package inclusions are presentation content, not a live booking or review system
- No real availability, checkout, or end-to-end enquiry workflow is implemented
- Public-facing marketing claims should be reviewed before production use

#### Not Implemented Yet

- Booking, payment, enquiry submission endpoints, CRM integration, and admin tooling
- CMS/content management, analytics, and production SEO beyond basic metadata
- `/privacy-policy` and `/terms` pages referenced in the footer
- Server-side session validation for protected server resources; the current home guard controls client rendering, while Firestore rules enforce database access

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16.4.2 | App Router, rendering, local development, and production builds |
| React 19.3.0 | UI components and hooks |
| TypeScript | Typed application code and type checking |
| Tailwind CSS 4 | Utility styling through `src/app/globals.css` and the Turbopack Tailwind loader; scoped testimonial styles in `src/components/ui/img-sphere.css` |
| react-hook-form + @hookform/resolvers | Form state, field errors, and zod integration |
| zod 4 | Form validation and shared password policy |
| Firebase 12.18.x | Email/password Authentication, email verification, and Firestore profiles |
| Motion | Password-strength animations and reduced-motion support |
| Lucide React + React Icons | Interface icons |
| Vitest + Testing Library + jsdom | Policy, authentication-service, dictionary, hook, and testimonial interaction tests |
| ESLint + eslint-config-next | Code quality checks |
| Node.js + npm | Runtime, dependency management, and project scripts |

Reusable UI components live in `src/components/ui`, resolved through `@/components/ui`. The project has no `components.json` or shared shadcn Input/Label components; authentication reuses its existing native input/label styling. If shadcn CLI setup is needed later, run `npx shadcn@latest init` and review its changes rather than assuming it is already configured.

## Prerequisites

- Node.js
  - Next.js 16.4.2 requires Node.js `>=20.9.0`; the current local runtime is `v24.22.1`.
- npm
  - Use npm with the committed `package-lock.json`; install dependencies with `npm.cmd ci`.
- Git
  - Recommended for version control and checking local changes.
- Firebase web app configuration
  - The existing project has Email/Password authentication enabled, Firestore created, and its security rules configured.
  - Its password policy requires 8-64 characters with no mandatory uppercase, lowercase, numeric, or symbol categories.

## Installation & Development

From PowerShell:

```powershell
cd D:\NurtureNest
npm.cmd ci
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
```

Fill the six Firebase variables in `.env.local` with the project's web app configuration, then start development:

```powershell
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000), or the port printed by Next.js. Unauthenticated home visits redirect to `/login`; create an account at `/signup`, verify it using the email link, then log in.

What these commands do:

- `npm.cmd ci` installs the dependency versions recorded in `package-lock.json`, including Motion.
- `Copy-Item .env.example .env.local` creates the local configuration template; do not overwrite existing values.
- `npm.cmd run dev` starts the local Next.js development server.

Restart the dev server after changing environment variables or dependencies. To stop it, press `Ctrl + C` in its terminal.

## Essential Commands

| Command | Purpose |
|---|---|
| `npm.cmd run dev` | Start the local development server |
| `Ctrl + C` | Stop the running server in the active terminal |
| `npm.cmd run lint` | Run ESLint checks |
| `npx.cmd tsc --noEmit` | Run TypeScript checks without emitting files |
| `npm.cmd test` or `npx.cmd vitest run` | Run the test suite |
| `npm.cmd run build` | Create an optimized production build |
| `npm.cmd run start` | Start the production server after a successful build |
| `npm.cmd ci` | Reinstall dependencies from the lockfile |
| `npm.cmd ls --depth=0` | Check top-level installed dependencies |

The `test` script is configured; there is no separate `typecheck` script. Vitest configuration is in `vitest.config.mts` and supports the `@/` alias and per-file jsdom tests.

The test suite covers password policy, authentication services, translations, verification polling, and testimonial interactions. The sphere has nine regression cases covering review content, browsing all stories, close methods, focus restoration, rotation pause behaviour, reduced motion, and keyboard focus containment. Tests use mocked Firebase/browser services; passing them does not verify real email delivery, live backend permissions, or the browser's native dialog behaviour. Run the lint, TypeScript, test, and production-build commands above for the current checkout. Manually check registration, email verification, resend/cooldown, login, logout, home protection, and testimonial photo selection/dialog controls on desktop and mobile.

## Project Structure

| Path | Purpose |
|---|---|
| `src/app/` | Next.js App Router files |
| `src/app/page.tsx` | Protected Nurture Nest platform home |
| `src/app/login/page.tsx`, `src/app/signup/page.tsx` | Authentication route entries |
| `src/app/centres/` | Centre landing page and brand-specific routes |
| `src/app/centres/jade-and-bloom/main/home-page.tsx` | Jade & Bloom main component, also reused by the rooms and packages routes |
| `src/app/centres/jade-and-bloom/care/page.tsx` | Dedicated care hero, metadata, and six reusable care sections |
| `src/app/layout.tsx` | Root metadata, fonts, authentication provider, and early theme script |
| `src/app/globals.css` | Tailwind import, global styles, and authentication theme tokens |
| `src/components/platform-page.tsx` | Nurture Nest hero, information sections, partner carousel, and family testimonial section |
| `src/components/section.tsx` | Shared section container with cream, white, and sage tones |
| `src/components/auth-page.tsx` | Shared login/signup form and authentication layout |
| `src/components/auth-provider.tsx`, `src/components/auth-guard.tsx` | Authentication state and reusable page protection |
| `src/components/signup-verification.tsx` | Registration resend and congratulations UI |
| `src/hooks/use-email-verification-watcher.ts` | Shared visibility-aware verification polling for signup and login |
| `src/components/user-menu.tsx` | User name display and logout |
| `src/components/ui/` | Reusable UI, including password strength, curved hero images, and the Polaroid carousel |
| `src/components/ui/img-sphere.tsx`, `src/components/ui/img-sphere.css` | Interactive photo sphere, accessible testimonial dialog, and scoped styles |
| `src/lib/family-testimonials.ts` | The 25 local family stories, with photo, alt text, name, centre, rating, title, and description |
| `src/lib/care-data.ts` | Jade & Bloom's six care categories, images, introductory titles, and care details |
| `src/lib/firebase.ts` | Singleton Firebase app setup; exports `auth` and `db` |
| `src/lib/auth-service.ts` | Firebase authentication and profile operations |
| `src/lib/auth-dictionary.ts` | Authentication translations and verification-message formatting |
| `src/lib/password-policy.ts` | Shared character counting, password validation, and strength scoring |
| `src/lib/` | Additional centre, room, service, and FAQ content modules |
| `src/**/*.test.ts`, `src/**/*.test.tsx` | Unit, hook, and component interaction regression tests |
| `public/` | Static assets served from the site root |
| `public/images/nurtureNestHome/`, `public/images/jb_room_pack_care/` | Platform images and testimonial photos (`t01`–`t25`), plus the seven Jade & Bloom care images |
| `.env.example` | Firebase variable names with empty values |
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration and `@/*` path alias to `src/*` |
| `eslint.config.mjs` | ESLint configuration for Next.js and TypeScript |
| `vitest.config.mts` | Test discovery, alias resolution, and default test environment |
| `package.json` | Scripts and dependency declarations |
| `package-lock.json` | Locked dependency tree used by `npm.cmd ci` |
| `.gitignore` | Files and folders excluded from Git |

`src/components/home-page.tsx` was moved to the Jade & Bloom `main` folder. The main, rooms, and packages routes import it from the new path; care now has its own page implementation. The move does not create a `/main` route or change existing URLs.

## Environment Variables & Security

Configure these variables in `.env.local` for development and in the hosting environment before a production build:

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

- `.env.example` contains names only; `.env.local` and `.env*.local` are ignored by Git.
- `NEXT_PUBLIC_` variables are included in browser bundles. Firebase web app configuration is not a service-account credential; never put Admin keys or other server secrets in these variables.
- Do not commit service-account files, private keys, or `.pem` files.
- Firestore profile writes use `users/{uid}` and only `name`, `email`, and `createdAt`; timestamps use `serverTimestamp()`. The frontend never writes `role` or deletes profiles.
- Existing Firestore rules restrict profile reads, creates, and updates to the authenticated owner. Do not change those rules to bypass client errors.
- Home access requires an authenticated, email-verified user; pending signup sessions are also blocked until the user completes the return-to-login flow.
- Signup uses Firebase in-memory persistence. Normal successful login uses local Firebase auth persistence; this SDK-managed session is distinct from storing raw form credentials.
- Raw passwords and form email values are not manually persisted to localStorage/sessionStorage or logged. Theme, language, and resend cooldown preferences may be stored locally.
- Firebase verification uses the default email template and action page. No custom `actionCodeSettings`, Admin SDK, or server session implementation is included.

## Common Checks

If the project does not start or behaves unexpectedly, check these first:

| Check | Command or File |
|---|---|
| Node version | `node -v` |
| npm version | `npm.cmd -v` |
| Installed dependency tree | `npm.cmd ls --depth=0` |
| Lockfile install | `npm.cmd ci` |
| Lint status | `npm.cmd run lint` |
| Type safety | `npx.cmd tsc --noEmit` |
| Unit/hook tests | `npm.cmd test` |
| Production compile | `npm.cmd run build` |
| Local Git changes | `git status --short` |
| Firebase configuration | `.env.local` compared with `.env.example`; restart after changes |
| Firebase duplicate packages | `npm.cmd ls @firebase/app`; investigate duplicate app instances if Auth registration fails |
| Stale editor errors after moving files | Close the old file tab, open the new path, and run `TypeScript: Restart TS Server` |
| Font fetch failures during build | Ensure the build environment can reach Google Fonts used by `next/font/google` |

## Notes

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, `experimental.agentUpgrade: "security"`, and a Turbopack CSS rule for Tailwind.
- Adjust the home sphere's `autoRotateSpeed` prop in `src/components/platform-page.tsx` to change its rotation speed. It is currently `10` degrees per second (about 36 seconds per full turn while running); the reusable component defaults to `4` when no value is passed.
- Sphere photo sizing, borders, shadows, and square dialog photo sizing are controlled by `src/components/ui/img-sphere.css`. Family review content lives in `src/lib/family-testimonials.ts`; care content lives in `src/lib/care-data.ts`.
- Follow `AGENTS.md`: read relevant documentation in `node_modules/next/dist/docs/` before changing Next.js code for this version.
- Authentication appearance uses `data-auth-theme` and CSS variables, not a global Tailwind `.dark` class. Login/signup translations and night mode do not translate or restyle the platform/centre pages.
- `AuthGuard` currently wraps `/`; centre pages are not automatically protected by it.
- `.gitignore` excludes dependencies, build output, coverage, logs, local environment files, and private keys, while allowing `.env.example`.
- `firebase-admin` and `server-only` are not currently installed or used.
