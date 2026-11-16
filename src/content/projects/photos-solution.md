---
title: "PhotoTriage — Verified iPhone Backup"
summary: "Local iPhone photo triage and cryptographically verified backup system pairing a native Swift 6 PhotoKit iOS app with a streaming Fastify Mac receiver that locks deletion until SHA-256 hashes match on external storage."
role: "Creator & Systems Engineer"
period: "2026"
featured: true
order: 2
metrics:
  - "SHA-256 + byte-verified before delete"
  - "Swift 6 PhotoKit + Fastify streaming"
  - "Zero-loss Live Photo (.MOV/.AAE) bundles"
stack:
  - "TypeScript"
  - "Swift 6"
  - "SwiftUI"
  - "PhotoKit"
  - "Fastify"
  - "React"
  - "Node.js"
repoUrl: "https://github.com/ImNotDerk/photos-solution"
architectureSummary: "Dual-workflow local backup architecture: a native iOS 17+ Swift 6 / PhotoKit client (and Mobile Safari fallback) streams primary photos (.HEIC/.JPG), Live Photo videos (.MOV), and edit sidecars (.AAE) over LAN to a Fastify Mac server that writes YYYY/MONTH folders, verifies byte counts and SHA-256 digests against a persistent drive ledger, and unlocks 1-tap Camera Roll cleanup only after 100% verification."
coverImage: "/images/projects/photos-solution-cover.svg"
coverAlt: "PhotoTriage architecture diagram showing Swift 6 PhotoKit iOS app streaming to Fastify Mac backup receiver with SHA-256 verification"
---

## Overview

**PhotoTriage** (`photos-solution`) replaces error-prone manual monthly iPhone photo exports with a deterministic, cryptographically verified triage and archive workflow. Instead of flattening Live Photos or deleting Camera Roll items prematurely, every monthly batch goes through three explicit decisions—**Trash**, **Back Up Only (HD)**, or **Back Up + Keep**—before streaming to an external drive connected to a Mac.

## Dual Workflows & Streaming Architecture

- **Native iOS 17+ App (Swift 6 + SwiftUI + PhotoKit)**: Queries monthly Camera Roll batches directly from PhotoKit, grouping primary images (`.HEIC` / `.JPG`), Live Photo companion videos (`.MOV`), edit sidecars (`.AAE`), and edited renders (`IMG_E*`) into unified asset bundles and streaming them chunk-by-chunk over local Wi-Fi (`POST /api/upload`).
- **Mobile Web + Shortcut Fallback (React + Fastify)**: Supports AirDrop staging into a Mac receiver paired with a high-contrast Safari single/grid review UI and 1-tap `PhotoTriageCleanup` Shortcut execution.
- **Automatic `YYYY/MONTH` Filing**: Parses EXIF and QuickTime timestamps on ingest to organize archived bundles into clean uppercase directories on `/Volumes/<Drive>`.

```text
PhotoKit Asset Bundle (.HEIC + .MOV + .AAE)
   └─▶ Chunked Wi-Fi Stream (POST /api/upload)
          └─▶ Fastify Receiver (ingest.ts / backup.ts)
                 ├─▶ Write <Drive>/<YYYY>/<MONTH>/
                 ├─▶ Verify byte count + SHA-256 vs .photo-triage-ledger.json
                 └─▶ Verified Receipt ─▶ Unlock 1-tap PhotoKit Delete
```

## Cryptographic Safety Guarantees

1. **Deletion Lock**: Camera Roll deletion (via native PhotoKit prompt or Apple Shortcut) remains strictly blocked until 100% of archived files match both byte size and SHA-256 digest on the physical external drive.
2. **Collision-Safe Renaming & Deduplication**: Existing drive files with identical SHA-256 hashes deduplicate without redundant writes; conflicting content with matching filenames is safely suffixed (e.g., `IMG_2048_2.HEIC`) rather than overwritten.
3. **`backup_keep` Protection & Soft Trash**: Assets marked to keep are excluded from deletion payloads, while delete candidates move into Apple Photos' **Recently Deleted** album for 30-day recovery.
