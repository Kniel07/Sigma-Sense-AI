# SigmaSense AI -- Prototype

Build-phase output for **Module 1** of the Kniel Workflow Framework design:
Investigation state machine + Define phase + Dashboard skeleton.

## What's included

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- Prisma schema covering the full data model from the Design doc
  (Investigation, Hypothesis, Experiment, EvidenceLink, Action, AgentRun)
- Dashboard (KPI cards + investigation list)
- Define phase: form + a stub "Six Sigma Coach" agent rendered through
  the `ReasoningTrace` component (Evidence -> Confidence -> Recommendation)
- API routes: `POST/GET /api/investigations`, `GET/PATCH /api/investigations/:id`

## What's intentionally NOT included yet (see Design doc build order)

Measure/Analyze/Improve/Control phases, real LLM-backed agents (the coach
is a deterministic stub -- see `lib/agents/sixSigmaCoach.ts`), phase-gating
enforcement, auth/multi-tenancy, the confidence-recompute engine on
experiment submission, and file upload/data-quality checks.

## Local setup

```bash
npm install          # also runs `prisma generate` via postinstall
cp .env.example .env # fill in DATABASE_URL
npx prisma migrate dev --name init
npm run dev
```

## Deploy: GitHub + Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "SigmaSense AI prototype: Define phase + dashboard"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sigmasense-ai.git
   git push -u origin main
   ```

2. **Database** -- create a free Postgres instance before deploying:
   - Neon (neon.tech): create a project, copy the connection string
   - or Vercel Postgres: add it from the Storage tab after step 3, then copy `DATABASE_URL` back into your local `.env`

3. **Vercel**
   - vercel.com -> New Project -> Import the GitHub repo
   - Add environment variable `DATABASE_URL` (same value as your `.env`)
   - Deploy. The `postinstall` script runs `prisma generate` automatically on Vercel's build.

4. **Run the migration against your prod DB** (one-time, from your machine):
   ```bash
   DATABASE_URL="<your prod connection string>" npx prisma migrate deploy
   ```

## Known sandbox limitation (not a code issue)

This scaffold was built in a network-restricted sandbox that couldn't reach
`fonts.googleapis.com` or `binaries.prisma.sh`, so a local `next build` here
fails on font-fetch and Prisma-engine-download errors. Both resolve normally
on Vercel and on your own machine with normal internet access -- `npm install`
and `next build` there will work as expected.

## Next build increment (per Design doc build order)

Measure phase upload + data-quality gate, then the Hypothesis/Experiment
confidence-recompute loop -- that's the core value proposition of the
platform and should come before Analyze visualizations.
