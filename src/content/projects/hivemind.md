---
title: "Hivemind"
summary: "AI-first organizational knowledge engine that ingests documents, enforces permission-aware hybrid retrieval (cosine similarity + BM25 re-ranking), and synthesizes citation-grounded answers."
role: "Co-Founder & Full-Stack Engineer"
period: "2026"
featured: true
order: 5
metrics:
  - "Hybrid search (Cosine + BM25 re-rank)"
  - "Permission-enforced retrieval layer"
  - "512-dim Matryoshka embeddings · DeepSeek"
stack:
  - "Next.js 16"
  - "React 19"
  - "TypeScript"
  - "Tailwind CSS"
  - "SQLite (WAL)"
  - "OpenAI Embeddings"
  - "DeepSeek API"
  - "NextAuth v5"
architectureSummary: "Two-stage permission-aware RAG pipeline inside a Next.js 16 + Astro monorepo: uploaded documents (PDF, DOCX, Markdown, Slack JSON) are chunked via a sentence-aware sliding window (512 tokens, 128 stride), embedded with 512-dim OpenAI text-embedding-3-small vectors in SQLite WAL, filtered by org/document ACLs at the retrieval layer, re-ranked with hybrid cosine similarity × BM25, and synthesized via DeepSeek with inline source citations."
coverImage: "/images/projects/hivemind-cover.svg"
coverAlt: "Hivemind AI knowledge base architecture showing document chunking, hybrid vector and BM25 search, permission filtering, and cited synthesis"
---

## Overview

**Hivemind** is an AI B2B SaaS knowledge base co-founded to stop institutional knowledge from getting lost across Slack threads, scattered PDFs, and stale wikis. Teams upload unstructured documents and conversations, assign access permissions, and ask natural-language questions backed by inline citations rather than manual folder curation.

## Ingestion & Hybrid Retrieval Pipeline

1. **Multi-Format Ingestion**: Parses PDF, DOCX, Markdown, plain text, and Slack JSON exports (`src/lib/parse.ts`), splitting content via a sentence-boundary sliding-window chunker (512 tokens, 128-token stride).
2. **Vector Indexing in SQLite WAL**: Generates 512-dimensional Matryoshka embeddings (`text-embedding-3-small`) persisted alongside organization-scoped tables in `better-sqlite3` configured in Write-Ahead Logging mode.
3. **Two-Stage Hybrid Re-Ranking**: Combines semantic cosine similarity with keyword BM25 scoring (`src/lib/search.ts`), narrowing top-20 vector candidates down to top-8 high-signal chunks before LLM synthesis.

```text
Upload (PDF/MD/DOCX/Slack) ─▶ 512-tok Chunk ─▶ 512-dim Embed ─▶ SQLite WAL (org-scoped)
Query  (Question) ─▶ ACL Filter ─▶ Cosine Top-20 ─▶ BM25 Re-rank ─▶ DeepSeek Cited Answer
```

## Retrieval-Layer Access Control & Cited Synthesis

- **Pre-Context ACL Enforcement**: Document visibility and member permissions (via **NextAuth.js v5** Google OAuth) are enforced inside the retrieval layer before chunks ever reach the prompt—preventing unauthorized context leakage rather than post-filtering outputs.
- **Grounded Synthesis**: Top permitted chunks are passed to DeepSeek chat completions (`src/lib/synthesize.ts`) to produce structured Markdown answers with clickable source citations, confidence indicators, and conflict alerts when uploaded sources disagree.
