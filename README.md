# Universal Browser AI Assistant

Browser-only AI assistant for Microsoft Edge and Chromium.

## MVP

- Runs from an Edge bookmark.
- Opens an assistant panel on the current page.
- Captures title, URL, selected text, and visible page text.
- Sends that context to an OpenAI-compatible chat endpoint.
- Stores settings locally in the browser.
- No Git, Node, extension install, or admin rights required.

## Install

1. Open `bookmarklet.js`.
2. Copy the complete one-line bookmarklet.
3. Create a browser bookmark and edit its URL.
4. Paste the bookmarklet as the URL.
5. Open a webpage and click the bookmark.

The bookmark loads `assistant.js` from this GitHub repository.

## Settings

The first run lets you enter an API endpoint, model, and API key.

For production use, prefer a server-side authenticated proxy instead of putting an API key in browser local storage.

## Files

- `bookmarklet.js` — Edge-friendly loader.
- `assistant.js` — page assistant runtime.
- `LICENSE` — MIT license.
