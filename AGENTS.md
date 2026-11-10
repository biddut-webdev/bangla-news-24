<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# bangla-news-24

Bangla news reader: Next.js 16 App Router + TypeScript. All article content comes from a remote JSON API; MongoDB is used **only** for better-auth sessions/users.

## Commands

- `npm run dev` — dev server. Re-writes the block above; commit it instead of reverting it.
- `npm run lint` — ESLint flat config (`eslint-config-next/core-web-vitals` + `/typescript`).
- `npx tsc --noEmit` — typecheck. There is no `typecheck` script; `npm run build` also typechecks.
- No test runner, no test files, no CI workflows, no pre-commit hooks exist. Don't invent commands.
- Verify a change with `npm run lint` && `npx tsc --noEmit` (in that order; `tsc` catches the type errors lint misses). Both exit 0 today; lint reports a few pre-existing warnings (`<img>`, unused `Marque` import, `window.location.href` navigation) — leave unrelated ones alone.

## Data flow (read this first)

- Single external API, base URL hard-coded at each call site: `https://news-api-v2.vercel.app`.
  - `/api/news/sections` → `src/app/page.tsx` (sections of articles)
  - `/api/category/[categoryId]`, `/api/article/[newsId]`, `/api/news/most-read`, `/api/news?limit=10`, `/api/categories`
- Responses wrap payloads in `data.data`. Detail bodies are `body[]` items of `{ type: "image" | ..., url?, text?, caption?, width?, height? }` — shaped by the remote API, not defined locally (`src/app/news/[newsId]/page.tsx`).
- Server components fetch directly (`page.tsx`, `category/`, `news/`); `Marque.tsx`, `Navlinks.tsx`, `MostReads.tsx` are `"use client"` and fetch the same API in the browser.
- Home page assumes `sections[0]` exists — an empty API response throws there.

## Next.js 16 specifics

- Request interception is `src/proxy.ts` (this version's replacement for `middleware.ts`), matcher `['/profile', '/news/:path']`, redirects unauthenticated users to `/sign-in`.
- Route params are Promises: `const { newsId } = await params`.
- Root layout takes the generated global type `LayoutProps<"/">` — it comes from Next's generated types, not from this repo.
- `next.config.ts` enables `reactCompiler` and allows any `https` image hostname (`images.remotePatterns`).

## Auth & env

- `.env` is gitignored and required for `dev`/`build`: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_MONGO_DB_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.
- Server config in `src/lib/auth.ts` (better-auth + `@better-auth/mongo-adapter`, db name `bangla-news-24`, email/password + Google/GitHub). Route handler: `src/app/api/auth/[...all]/route.ts`.
- Client: always use `authClient` from `@/lib/auth-client`. The file also exports a second bare `createAuthClient()` destructured as `signIn, signUp, useSession` — that instance is unused dead code; don't build on it.

## UI conventions

- Three styling systems are all live and must stay imported in `src/app/globals.css`: `@import "tailwindcss"`, `@plugin "daisyui"`, `@import "@heroui/styles"`. Forms/buttons use `@heroui/react`; cards use DaisyUI classes.
- Toasts: `react-toastify` only (`ToastContainer` is mounted in the root layout). `react-hot-toast` is installed but unused — don't add it.
- UI copy is Bengali (`বাংলা`); font is `Noto_Serif_Bengali` with `latin` + `bengali` subsets configured in `src/app/layout.tsx`. Keep new user-facing strings in Bengali.
- `NewsItem` is declared twice — exported by `src/components/NewsCard.tsx` and re-declared (not exported) in `src/components/MainNews.tsx`, both `{ id, title, description, imageUrl, category }`. Import the `NewsCard` export instead of adding a third copy.
