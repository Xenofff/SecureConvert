# SecureConvert

100% Client-side privacy-first converter.

## Overview
- SecureConvert is a fully client-side, serverless file converter. All processing happens in your browser, with no data uploaded to any server.
- It supports image conversions (JPG, PNG, WEBP), PDF creation from images, and data transformations (JSON/CSV).
- The app uses modern web technologies to run locally and privately while providing a smooth user experience.

## Features
- Images: JPG, PNG, WEBP conversions (and related formats like WebP to PNG, PNG to WebP, etc.).
- Documents: PDF creation from images and PDF exports from images.
- Data: JSON to CSV/Excel and CSV to JSON (via CSV/JSON interchange).
- Dev Tools: SVG to JSX, HTML to Markdown (in future iterations). Focused deliverables for now are the top formats.
- 100% Private: All processing happens in the browser; no data leaves your device.

## Technical Stack
- Tailwind CSS
- Lucide Icons
- Vanilla JavaScript (ES Modules)

## Local Development
- This project uses ES Modules. To run locally, you can serve the repository with a local static server.
- Recommended: npm package like http-server or serve, or a simple Python HTTP server.
- Example (node-based):
  1. npm install -g http-server
  2. cd path/to/project
  3. http-server -c-1

## Getting Started
- Open index.html in your browser via a local server.
- Use the drag-and-drop zone or Browse to select files.
- Choose an output format and click Convert. The result will download automatically.

## Project Notes
- This project emphasizes privacy and local processing. It uses dynamic ES imports for conversions and CDNs for PDF/jsPDF/PapaParse.
- The README focuses on high-level usage and setup.

## License
MIT
