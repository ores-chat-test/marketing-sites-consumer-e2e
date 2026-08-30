# ORES Chat marketing-site consumer E2E

Public, isolated GitHub Pages fixture for validating the production ORES Chat HTML component from the `ores-chat-test` organization.

The live fixture presents two independent marketing contexts and loads the reviewed bundle from:

```text
https://ores-chat.github.io/components/v1/ores-chat-footer-link.js
```

Chat requests go only to a same-origin service-worker test double. Replies are explicitly labeled deterministic test responses; this repository contains no model adapter, credential, private context, user account, or production API behavior.

After the Pages workflow succeeds, the fixture is available at:

```text
https://ores-chat-test.github.io/marketing-sites-consumer-e2e/
```

Run `npm test` to verify production-bundle consumption, context separation, credential exclusion, and the no-React/JSX/TSX source boundary.
