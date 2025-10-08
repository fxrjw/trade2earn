# Trade2Earn (Next.js + Tailwind + Optional Prisma)

Deploy-ready starter for your signals app. Ships with:

- ✅ Next.js 14 App Router (TypeScript)
- ✅ TailwindCSS, minimal UI components
- ✅ Signals API (`/api/signals`)
- ✅ Dashboard with equity curve simulator
- ✅ Signals feed + Creator post form
- ✅ **DEMO_MODE** (no DB needed) OR **Prisma Postgres** (production)

---

## 1) Quick Start (Local)

```bash
pnpm i # or npm i / yarn
cp .env.example .env
pnpm dev
```

Open http://localhost:3000

- DEMO_MODE=true uses in-memory demo data and returns fake "created" signals.
- Set `DEMO_MODE=false` and provide a `DATABASE_URL` (Neon Postgres) to use Prisma.

### Prisma (Optional)

```bash
# After setting DATABASE_URL in .env
pnpm prisma generate
pnpm db:push
pnpm db:seed
pnpm dev
```

---

## 2) One-Click Deploy on Vercel

1. Push this folder to a **new GitHub repo**.
2. On Vercel, import the repo.
3. Add Environment Variables:
   - `DEMO_MODE` = `true` (works with no DB) **OR**
   - `DEMO_MODE` = `false` and `DATABASE_URL` = your Neon Postgres connection string (use SSL required).
4. Build & deploy.

> Tip: Start with DEMO_MODE=true to launch instantly. When ready, flip to Prisma by adding DATABASE_URL and redeploying.

---

## API

- `GET /api/signals` → list signals (demo or DB)
- `POST /api/signals` → body: `{ symbol, market, direction, entry, stop, takeProfit, riskPct?, note? }`

---

## Customize

- UI comps in `src/components`
- Business logic in `src/lib`
- Prisma schema in `prisma/schema.prisma`

---

## License

MIT
