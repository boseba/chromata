# Chromata

Chromata is a modern, extensible, and fast syntax highlighter for code.
Lightweight, pluggable, and themeable.
Supports TypeScript, Angular, JavaScript, and more.

## Table of Contents

- Key Principles
- Installation
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

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction...
