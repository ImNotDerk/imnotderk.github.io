---
title: "ZENITH // Rust + WASM Offline Engine"
summary: "Ultra-low-power, zero-dependency offline game suite and studio written in pure Rust, compiled to a 63 KB WebAssembly binary with zero-copy shared linear memory, procedural 44.1 kHz DSP audio, and 0.0% idle CPU."
role: "Creator & Systems Engineer"
period: "2026"
featured: true
order: 3
metrics:
  - "63 KB pure Rust WASM · 0 crates"
  - "0.02–0.05 ms tick · 0.0% idle CPU"
  - "Zero-copy shared linear memory + DSP"
stack:
  - "Rust"
  - "WebAssembly"
  - "JavaScript"
  - "Web Audio DSP"
  - "HTML5"
  - "CSS"
repoUrl: "https://github.com/ImNotDerk/offline-games"
architectureSummary: "Zero-dependency Rust core (wasm32-unknown-unknown, LTO, opt-level = 'z') exposing a C-ABI FFI bridge over shared WebAssembly linear memory. JavaScript reads state directly via TypedArray subarray views with zero JSON serialization and zero runtime heap allocations."
coverImage: "/images/projects/offline-games-cover.svg"
coverAlt: "ZENITH offline Rust and WebAssembly engine architecture diagram"
---

## Overview

**ZENITH** (`offline-games`) is a distraction-free, zero-dependency offline computing and game suite engineered for air travel, low-spec machines, and environments with zero internet access. Compiled with Link-Time Optimization and symbol stripping to a **63 KB WebAssembly binary** with **zero external crates**, it keeps idle CPU utilization at **0.0%** through a strictly event-driven execution model.

## Zero-Copy Rust + WASM Core

JavaScript inspects engine state directly from Rust's linear memory through `Uint8Array`, `Uint16Array`, `Uint32Array`, and `Float32Array` subarray views (`js/bridge.js`)—avoiding JSON serialization and eliminating runtime heap allocations:

- **64-Bit Bitboard 2048**: Packs the entire 4x4 grid into a single `u64` integer (4 bits per tile exponent), executing `O(1)` column operations via bitwise matrix transposition with an undo snapshot buffer.
- **MRV Constraint Sudoku Solver & Generator**: Encodes row, column, and 3x3 box candidates as 9-bit `u16` bitmasks with a Minimum Remaining Values heuristic (`count_ones()`) guaranteeing unique solutions.
- **Bit-Packed Minesweeper**: Packs mine state, reveal flags, marks, and neighbor counts into individual `u8` cells using a static stack BFS flood-fill and guaranteed first-click safety.
- **SRS Tetris & Binary-Search Wordle**: Implements a 200-byte `[u8; 200]` board with 5-point Super Rotation System wall kicks and 7-bag Xorshift64* PRNG alongside an `O(log N)` sorted 5-letter dictionary validator.

## Procedural 44.1 kHz Audio DSP

Instead of bundling sampled audio files, `src/dsp.rs` synthesizes 44.1 kHz PCM buffers directly into static `f32` memory—generating Paul Kellet 3-pole IIR pink noise, biquad-filtered ocean waves, 10 Hz binaural alpha focus beats, and 8-bit chiptune effects while auto-suspending Web Audio after 6 seconds of silence.

## Offline Portability & Local AI Studio

- **Zero-Server `file://` Launch**: Includes a dual-mode loader (`js/wasm_inline.js`) that streams `zenith_core.wasm` over HTTP or falls back to inline base64 when opened via double-click without CORS errors.
- **Expanded Suite & Local Ollama Studio**: Ships alongside an offline Markdown scratchpad, Klondike Solitaire, Minimax Connect 4 & Tic-Tac-Toe, and a streaming Local AI Studio wired to `localhost:11434`.
