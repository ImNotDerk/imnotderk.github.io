---
title: "Distributed OCR System"
summary: "Multi-threaded C++ optical character recognition pipeline using bidirectional gRPC streaming between a native Qt 6 macOS client and a virtualized worker server."
role: "Systems Developer"
period: "2025"
featured: true
order: 7
metrics:
  - "Bidirectional gRPC streaming"
  - "Hardware-scaled C++ thread pool"
  - "Real-time per-image status telemetry"
stack:
  - "C++20"
  - "gRPC"
  - "Protocol Buffers"
  - "Tesseract OCR"
  - "Leptonica"
  - "Qt 6"
  - "CMake"
architectureSummary: "Asynchronous producer-consumer pipeline over a single bidirectional gRPC stream (ProcessImages): the Qt 6 client streams raw image bytes while a hardware-scaled C++ worker pool dispatches QUEUED, PROCESSING, and COMPLETED frames concurrently."
coverImage: "/images/projects/ocr-cover.svg"
coverAlt: "Distributed OCR System architecture diagram showing Qt 6 client, bidirectional gRPC stream, and multi-threaded C++ Tesseract worker pool"
---

## Overview

Built to offload batch optical character recognition across machines, this C++20 distributed system connects a native **Qt 6** macOS desktop client to a remote OCR server running inside a macOS VM over a single bidirectional **gRPC** stream.

## Architecture & Streaming Protocol

Rather than polling for job completion over unary RPCs, the client and server communicate through a duplex protobuf contract (`proto/ocr.proto`):

```protobuf
service OCRService {
  rpc ProcessImages (stream ImageRequest) returns (stream ImageResult);
}
```

### Multi-Threaded Server Pipeline (`OCRServiceImpl`)

- **Reader Loop**: Continuously consumes incoming `ImageRequest` binary payloads from the gRPC stream and pushes them onto a thread-safe queue protected by `std::mutex` and `std::condition_variable`.
- **Thread-Local Tesseract Engines**: Spawns `std::max(2u, std::thread::hardware_concurrency())` worker threads at request start. Each worker initializes its own isolated `OCRProcessor` (Tesseract + Leptonica) instance to avoid shared engine lock contention.
- **Live Status Frames**: Workers acquire a dedicated `stream_mtx` only to emit `PROCESSING` updates and `COMPLETED` extracted text + millisecond timings back to the Qt client as each image finishes.
