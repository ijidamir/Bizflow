# BizFlow

A personal multi-business dashboard built with Next.js (App Router), TypeScript,
Tailwind CSS, shadcn-style UI components, Recharts, and Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/dashboard`,
which redirects to `/login` if you're not signed in yet.

**Default login password:** `bizflow123` (shown on the login screen itself too).
Change it any time from Settings once you're in.

## Project structure

```
app/
  layout.tsx               Root layout (fonts, theme provider)
  page.tsx                 Redirects "/" -> "/dashboard"
  globals.css              Theme tokens (light + dark), Tailwind base
  data.ts                  All mock data lives here - swap for real data later
  login/
    page.tsx                Login screen (password-only, single user)
  dashboard/
    layout.tsx               Sidebar + header shell, also the auth guard
    page.tsx                 The dashboard itself (greeting, stats, charts)
    farm/page.tsx             Farm production - table + "Add Production"
    fashion-house/page.tsx    Designers - table + "Add Designer"
    properties/page.tsx       Tenants - table + "Add Tenant"
    settings/page.tsx         Name, password, theme, logout

components/
  layout/
    Sidebar.tsx              Left nav - collapses to a drawer on mobile
    Header.tsx                Top bar - search, theme toggle, logout, avatar
    Greeting.tsx               "Good morning/afternoon/evening, <name>"
    ThemeProvider.tsx           Wraps next-themes
  Helper/
    StatCard.tsx               The 4 top summary cards
  Charts/
    RevenueChart.tsx            Business Performance bar chart
    IncomeVsExpenses.tsx        Income vs Expenses line chart
    DonutChart.tsx                Income Distribution donut chart
  ui/                             Hand-written shadcn-style primitives
    card, badge, button, select, avatar, separator,
    chart, dialog, tabs, input, label, table

lib/
  utils.ts                     cn() class-merging helper
  auth.ts                       Frontend-only login/password/owner-name helpers

types/
  types.ts                      Shared TypeScript types
```

## Making changes

**Change the default login password/owner name in code:** open `lib/auth.ts`
and edit `DEFAULT_PASSWORD` / `DEFAULT_OWNER_NAME`. Once someone actually logs
in and changes them from Settings, the values in `localStorage` take over.

**Swap in real data:** everything the charts, farm, fashion house, and
properties pages read lives in `app/data.ts`. Keep the same field names -
the pages and charts key off those exact names.

**Add a new sidebar link:** edit the `navGroups` array in
`components/layout/Sidebar.tsx`.

**Add more shadcn components later:** this project ships with a working
`components.json`, so if you eventually get network access in your dev
environment you can still run:
```bash
npx shadcn@latest add <component>
```

**Chart colors:** all chart colors are CSS variables (`--chart-1` through
`--chart-4`) defined in `app/globals.css`, under **both** `:root` and `.dark`
- they're redeclared for dark mode on purpose, since dark mode does not
inherit `:root` variables by default in this setup.

## About the login / auth system right now

This is **frontend-only** authentication - there's no server, database, or
real security behind it yet:
- The password check happens entirely in the browser (`lib/auth.ts`)
- "Logged in" state is just a flag in `localStorage`
- Anyone with browser dev tools could bypass it in seconds

This is intentional for now, to get a working login *screen* and *flow* in
place before wiring up real backend auth. When you're ready for the backend
step, this whole file gets replaced by real session/auth logic (e.g.
NextAuth.js, or a custom API route + database + hashed passwords + HTTP-only
cookies) - the login page's UI won't need to change, just what happens when
the form submits.

## Notes

- Dark mode toggle lives in the header (sun/moon icon) and in Settings.
- The sidebar has no "upgrade" or "subscribe" section, since this is a
  personal, single-user app.
- "Add Production" / "Add Designer" / "Add Tenant" all add rows live to
  the page's state - but nothing persists yet, since there's no backend.
  Refreshing the page resets everything back to the mock data.
- Motion is used sparingly: a single staggered fade-in on the dashboard's
  load, and a slide-in for the mobile sidebar drawer.
