# OTA / Automatic Update Setup

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
