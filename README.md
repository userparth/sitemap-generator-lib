# Sitemap Generator Library for Node.js

## Overview

Sitemap Generator is a **flexible and reusable Node.js library** designed to generate sitemaps dynamically for any website. It is **domain-agnostic**, highly configurable, and supports multiple storage backends such as **databases, JSON, and CSV**. The library offers both **API** and **CLI** usage, making it a versatile solution for various projects.

## Features

- ✅ **Domain-Agnostic** – No hardcoded domain-specific values. Configure URL structures dynamically.
- ✅ **Configurable API** – Supports user-defined **priorities**, **change frequencies**, and **database queries**.
- ✅ **Modular Design** – Well-structured code with separate handling for **storage, XML generation, and utilities**.
- ✅ **Multiple Storage Backends** – Supports **Databases, JSON, and CSV** as data sources.
- ✅ **NPM Package Ready** – Install via `npm` and use via **CLI** or **API**.

## Installation

Install the package using npm:

```bash
npm install sitemap-generator-lib
```

## Usage

### 1️⃣ Import & Use in Your Project

```javascript
const { generateSitemap } = require("sitemap-generator-lib");

generateSitemap({
  baseUrl: "https://example.com",
  storage: "db", // Options: "db", "json", "csv"
  priority: {
    blog: 0.8,
    product: 0.9,
  },
});
```

### 2️⃣ CLI Usage

You can also generate sitemaps using the CLI:

```bash
node cli.js --config=config.json
```

## Project Structure

```
sitemap-generator-lib/
├── src/
│   ├── index.js           # Main entry point
│   ├── config.js          # Configuration handling
│   ├── storage/           # Storage backends (DB, JSON, CSV)
│   ├── utils/             # Helper functions (XML generation, URL formatting)
│   ├── generators/        # Sitemap generation logic
├── cli.js                 # CLI support
├── package.json           # NPM package metadata
├── README.md              # Documentation
├── .gitignore             # Ignore unnecessary files
```
