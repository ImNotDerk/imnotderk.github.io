---
title: "Gehlee's Memory Box"
summary: "High-performance fan archive, media portal, and private admin CMS featuring automated multi-platform sync pipelines, zero-cost edge hosting, and strict Row-Level Security."
role: "Lead Full-Stack Engineer"
period: "2026"
featured: true
order: 1
metrics:
  - "366 tests passed · Green preflight"
  - "Automated multi-platform sync & 15-min view counter"
  - "₱0/mo zero-cost architecture on Vercel + Supabase + R2"
stack:
  - "Next.js 16"
  - "React 19"
  - "TypeScript"
  - "Tailwind CSS"
  - "Supabase"
  - "PostgreSQL RLS"
  - "Cloudflare R2"
  - "Docker"
  - "Playwright"
liveUrl: "https://www.gehlee-archive.pink"
architectureSummary: "Zero-cost edge fan archive and admin CMS: Next.js 16 App Router on Vercel with Supabase PostgreSQL (pgTAP-tested RLS), Cloudflare R2 media storage via S3 API, and daily automated ingestion pipelines for YouTube, TikTok, X, and Facebook running inside a ₱0/month free-tier envelope."
coverImage: "/images/projects/gehlee-archive-cover.svg"
coverAlt: "Gehlee's Memory Box architecture diagram showing automated sync pipelines, Supabase RLS, and Cloudflare R2 storage"
---

## Overview

**Gehlee's Memory Box** is an all-in-one fan archive and digital portal celebrating Gehlee Dangca. It brings together a categorized media library, interactive polaroid gallery with custom crop tools, music release tracker, fanbase community bulletin, and social hub—backed by a private administrative CMS.

## Architecture & System Guarantees

The entire platform operates inside a **₱0/month free-tier envelope** across Vercel, Supabase, and Cloudflare R2, designed cleanly to avoid proprietary host SDK lock-in:

- **Edge Frontend & Admin CMS (Next.js 16 App Router & React 19)**: Token-driven UI with responsive layouts, multi-select filter trays, and a private admin workspace featuring content-health queues, batch polaroid staging, and media auto-fill.
- **Data & Access Control (Supabase PostgreSQL + RLS)**: Strict Row-Level Security policies tested via pgTAP verify that public visitors only read verified content while administrative mutation routes require authenticated sessions.
- **Asset Storage & Processing (Cloudflare R2)**: High-resolution photos, polaroid scans, and client assets are stored in Cloudflare R2 via an S3-compatible driver, with sharp image processing for responsive delivery.

```text
External Platforms (YouTube / TikTok / X / FB) ──Crawlers──┐
                                                           ▼
Admin CMS & Ingest Pipeline ──pgTAP RLS──▶ Supabase (PostgreSQL) ◀── Vercel Edge (Next.js 16)
                                   ▲
Cloudflare R2 Storage (S3 API) ────┘
```

## Automated Multi-Platform Sync

Most portal content stays fresh without manual overhead:

1. **Media Ingestion**: Twice-daily YouTube crawls and daily TikTok/X media sync categorize videos into public releases or drafted queues based on trusted-source lists.
2. **Socials & Press Aggregation**: Daily aggregation synchronizes updates across Instagram, TikTok, X, and Facebook, indexing over 490 press headlines across 80 news outlets.
3. **Real-Time Telemetry**: A 15-minute view counter tracks aggregate community engagement across releases.

## Quality & Rigorous Testing

The system enforces automated preflight gates (`pnpm preflight`) covering type safety, linting, and 366 unit, integration, and pgTAP RLS tests, alongside end-to-end browser verification via Playwright and isolated local development in Docker.
