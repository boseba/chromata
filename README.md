<p align="center">
<a href="https://www.npmjs.com/package/chromata">
<img src="./assets/chromata.png" height="150">
</a>
</p>

<h1 align="center">
Chromata
</h1>
<p align="center">
Modern, extensible, and fast syntax highlighter for code.  
<p>

# Chromata

[![NPM version](https://img.shields.io/npm/v/chromata?style=flat-square)](https://www.npmjs.com/package/chromata)
[![Coverage Status](https://coveralls.io/repos/github/boseba/chromata/badge.svg?branch=main)](https://coveralls.io/github/boseba/chromata?branch=main)


Chromata is a modern, extensible, and fast syntax highlighter for code.  
Lightweight, pluggable, and themeable.  
Supports TypeScript, Angular, JavaScript, and more.

## Table of Contents

- Key Principles
- Installation
- Usage
- API Overview
- Themes
- Supported Languages
- Extending Chromata
- Philosophy
- License

## Key Principles

- Ultra-fast and lightweight core
- Fully themeable (VS Code Dark+, Light+, and custom themes)
- Extensible via hooks and plugins (custom languages, tokens, etc.)
- Usable in Node.js, browser, and frameworks (Angular, React, Vue, etc.)
- Formats code as HTML or DOM nodes
- Type-safe API (written in TypeScript)
- MIT licensed, open-source

## Installation

```bash
npm install chromata
```

## Usage

Chromata currently highlights a plain code string and outputs HTML.  
The HTML contains `<span>` elements with token type classes (e.g., `keyword`, `string`, `comment`)  
which are styled via a theme.

```ts
import { Chromata } from "chromata";

// Initialize with default settings (TypeScript + vscode-dark)
Chromata.init({
  language: "typescript",
  theme: "vscode-dark",
  injectCss: true, // Automatically injects theme CSS into the browser <head>
});

// Highlight a TypeScript code string
const code = `export class AuthService {}`;
const html = Chromata.highlight(code);

console.log(html);
// Example output:
// <span class="keyword">export</span> class AuthService {}
```

In a browser, if `injectCss` is enabled, Chromata will automatically inject the CSS for the selected theme.  
If running server-side, you can retrieve the CSS with:

```ts
import { getTheme } from "chromata";

const css = getTheme("vscode-dark").toString();
```

…and inject it manually in your page.

## API Overview

Chromata provides functions to format code with syntax highlighting either as HTML strings or as DOM nodes.  
It is extensible through hooks and plugins, and supports multiple themes and languages.

Full API documentation and usage examples will be added soon.

## Themes

Chromata includes several built-in themes (including VS Code Dark+ and Light+) and allows for custom theme registration.

## Supported Languages

- TypeScript
- Angular (templates & decorators)
- JavaScript

Support for more languages is planned.

## Extending Chromata

Chromata is built to be extensible:

- Register custom languages, tokens, or themes
- Add hooks to customize tokenization and rendering

## Philosophy

Chromata aims to provide a minimal yet powerful foundation for syntax highlighting:

- No forced choices: you decide how code is rendered and styled
- Small and efficient: optimized for speed and simplicity
- Structured first: themes and grammars work with structured tokens
- Extensible by design: designed to grow with your project’s needs

## License

MIT License

© Sébastien Bosmans
