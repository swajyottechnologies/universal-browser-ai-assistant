# Universal Browser AI Assistant — Product Requirements & Architecture

**Version:** 1.0  
**Target release baseline:** 1.5.x  
**Architecture target:** 2.0  
**Platform:** Microsoft Edge / Chromium, Manifest V3

## 1. Purpose

Universal Browser AI Assistant makes any supported webpage conversational while keeping browser context, privacy, runtime reliability, AI-provider reliability, and updateability as first-class architecture concerns.

This document is the product and engineering contract. Code changes should be evaluated against it rather than patched one console error at a time.

## 2. Product principles

1. **User controls context.** No sensitive field is silently transmitted.
2. **Web content is untrusted data.** Text found on a page never becomes extension authority.
3. **MV3 lifecycle is unreliable by design.** Service workers can stop and restart; content scripts can become stale after an extension reload.
4. **Providers fail.** Timeout, rate-limit, authentication, malformed responses, and transient server failures are normal states.
5. **No silent failures.** Every meaningful failure becomes recoverable or actionable.
6. **Least privilege.** Permissions must be reviewed whenever functionality changes.
7. **No remote executable extension code.** Runtime extension code ships inside the signed extension package.
8. **OTA is a packaging/distribution feature, not remote JavaScript execution.**

## 3. Core user journeys

### Page assistance
User opens the launcher, asks a question, reviews the context indicator, and receives a streamed answer.

### Selection assistance
User selects text and invokes the assistant from the context menu.

### Conversation
User continues follow-up questions without losing context.

### Provider failure
Primary provider fails transiently; the assistant tries configured fallback models and reports the final failure clearly if all fail.

### Update
A signed, versioned CRX is published. Supported installed builds periodically check the configured update manifest and install a newer signed build.

## 4. Context architecture

Context priority:

1. explicit selected text
2. user request
3. main/article content
4. headings
5. page title
6. sanitized URL

### Never collect automatically

- password fields
- hidden inputs
- payment-card fields
- OTP fields
- authentication tokens
- cookies
- localStorage/sessionStorage
- focused form values

Focused input capture is intentionally removed from the product.

### URL policy

Only origin + pathname are transmitted by default. Query parameters and fragments are removed.

### Page extraction

Prefer \`main\`, \`article\`, and \`[role="main"]\`; remove scripts, styles, navigation, footer, hidden content, and obvious boilerplate. Use a bounded context budget and prioritize selection before page text.

## 5. Prompt security

Every page-derived field is explicitly marked as untrusted browser data. Model instructions must state that instructions inside webpage content are not authoritative.

Recommended logical envelope:

\`\`\`text
USER REQUEST
...

BROWSER CONTEXT — UNTRUSTED DATA
PAGE TITLE
...
URL
...
SELECTED TEXT
...
VISIBLE PAGE CONTENT
...
END BROWSER CONTEXT
\`\`\`

## 6. Runtime architecture

\`\`\`
WEB PAGE
  |
  +-- Content UI
  +-- Context extractor
  +-- Runtime client
  |
  v
MV3 SERVICE WORKER
  |
  +-- Runtime manager
  +-- Conversation manager
  +-- Generation manager
  +-- Provider manager
  +-- Storage manager
  |
  v
AI PROVIDER
\`\`\`

Every generation request has a unique \`requestId\`.

Generation states:

\`\`\`
CREATED -> STARTING -> STREAMING -> COMPLETED
                       |-> CANCELLED
                       |-> TIMEOUT
                       |-> FAILED
\`\`\`

## 7. Messaging contract

Messages use:

\`\`\`json
{
  "type": "GENERATION_CHUNK",
  "requestId": "uuid",
  "conversationId": "uuid",
  "payload": {}
}
\`\`\`

UI must ignore stale messages whose \`requestId\` is not the active request.

Runtime calls must handle extension-context invalidation without uncaught exceptions.

## 8. Streaming

Support:

- SSE
- OpenAI-compatible \`delta.content\`
- text-style choices
- JSON/non-stream responses

SSE parsing must tolerate:

- chunk boundaries in the middle of an event
- multiline data fields
- keepalive events
- \`[DONE]\`
- final unterminated buffers
- malformed individual events

UI chunks are batched to avoid message-bus backpressure.

## 9. Network reliability

Default generation timeout: 120 seconds.

Transient fallback errors:

- 408
- 425
- 429
- 500
- 502
- 503
- 504
- network failures

Do not automatically fallback for normal authentication/configuration errors such as 400/401/403/404.

## 10. Persistence

Conversations use durable extension storage, with a conversation ID per browser tab/session.

MVP retention:

- 50 conversations
- 100 messages per conversation
- 12,000 characters per message

The implementation must prune old data before storage becomes unbounded.

## 11. Provider abstraction

The generation engine is provider-neutral.

Provider interface:

\`\`\`
validate()
generate()
stream()
cancel()
normalizeError()
\`\`\`

Current provider: OpenAI-compatible chat-completions endpoint.

Future providers can be added without changing the UI protocol.

## 12. Privacy UX

The UI must show that page context is being used.

Example:

> Context: Page content + selected text

Settings should explain that the selected context is sent to the configured AI endpoint.

## 13. Accessibility

Required:

- keyboard navigation
- visible focus
- dialog semantics
- live region for streaming status
- focus restoration
- Escape to close
- Enter to send
- Shift+Enter for newline

## 14. SPA/navigation behavior

Detect:

- \`pushState\`
- \`replaceState\`
- \`popstate\`

Refresh title, URL, and context without duplicating the assistant host.

## 15. Permissions

Current broad host access remains for the prototype because the assistant is intended to work on arbitrary webpages. A future privacy release should evaluate runtime/optional host permissions.

Do not add permissions without a concrete product requirement.

## 16. OTA architecture

### Development mode

The unpacked ZIP/folder workflow remains valid for local development. Browser reload does not fetch GitHub changes.

### Production/private distribution

The repository provides an OTA-ready architecture:

\`\`\`
Git tag
  |
  v
GitHub Actions
  |
  +-- validate manifest
  +-- package extension
  +-- sign CRX with persistent private key
  +-- generate update manifest
  +-- publish CRX release asset
  +-- publish updates.xml
\`\`\`

The manifest's \`update_url\` points at the public update manifest.

**Critical:** the same private signing key must be used for every release. Losing or replacing it creates a new extension identity rather than an update.

The private key is never committed. Store it as a GitHub Actions secret named \`EXTENSION_PEM\`.

### OTA bootstrap requirement

A currently unpacked developer installation is not magically converted into an OTA-installed build. The first OTA-capable installation must be a compatible signed CRX or an Edge Add-ons installation.

For managed Windows environments, Microsoft Edge's self-hosted extension distribution can require enterprise policy/domain management. The Edge Add-ons store is the preferred general-public production distribution route.

## 17. Release acceptance criteria

### 1.5 hardening

- no automatic focused-input capture
- sensitive form fields excluded
- URL sanitized
- page content explicitly untrusted
- persistent conversation storage
- request-aware cancellation
- robust SSE handling
- transient fallback
- timeout
- no unhandled queue rejection
- friendly extension-context invalidation
- OTA packaging workflow present

### 2.0

- provider abstraction
- smart context extraction
- conversation history
- diagnostics
- accessibility compliance
- automated integration tests
- enterprise configuration
- production distribution

## 18. Non-goals

Initial architecture does not include autonomous browser control, arbitrary form submission, password management, cookie access, browser-history analysis, screen recording, or remote executable extension code.

## 19. Definition of done

A release is done when the code, security behavior, runtime lifecycle, network lifecycle, persistence, packaging, and update mechanism all satisfy this document and are validated by automated or manual acceptance tests.


---

## 20. OTA / Automatic Update Runbook

## What this implements

The extension is configured with an \`update_url\` and the repository contains a GitHub Actions release pipeline that can:

1. validate the extension;
2. package a CRX3;
3. sign it using a persistent private key stored in GitHub Actions;
4. create a ZIP;
5. generate the Chromium update XML;
6. publish the CRX as a GitHub Release asset;
7. publish \`updates.xml\` back to the repository.

Microsoft Edge periodically checks an extension's configured update URL for a newer version. The update package must be signed with the same private key as the installed extension.

## One-time setup

### 1. Create the signing key

Generate one RSA private key for this extension. Keep the private key offline and back it up securely.

Do **not** commit it to GitHub.

### 2. Add GitHub Actions secret

Repository:

\`Settings -> Secrets and variables -> Actions -> New repository secret\`

Name:

\`EXTENSION_PEM\`

Value:

the complete PEM private key.

### 3. Install an OTA-capable build

Do not use the unpacked Developer Mode folder as the production OTA installation.

Install the signed CRX through the supported distribution mechanism for your environment, or publish through Microsoft Edge Add-ons.

### 4. Release

Create a version tag such as:

\`\`\`
v1.5.1
\`\`\`

The workflow packages the extension and creates the release.

## Important Edge limitation

An unpacked Developer Mode extension is a development installation. The normal "Reload" button reloads the local directory; it does not pull new files from GitHub.

Self-hosted CRX deployment has additional Windows enterprise requirements. For a normal public product, Microsoft Edge Add-ons is the recommended production distribution path.

## Security rules

- Never commit \`*.pem\`.
- Never put the private key in the extension package.
- Never print the key in Actions logs.
- Do not let pull requests from untrusted forks access the signing secret.
- Only release from the protected main repository.
- Keep the update URL HTTPS.
- Keep the CRX and update manifest publicly reachable without authentication.

## Failure modes

### Update does not appear

Check:

1. installed version is lower than the release version;
2. the update manifest is publicly reachable;
3. the CRX URL is publicly reachable;
4. XML version matches \`manifest.json\`;
5. the same signing key was used;
6. the installed extension was originally installed through an OTA-compatible mechanism.

### Extension ID changed

The signing key changed. Restore the original key. A different key creates a different extension identity.
