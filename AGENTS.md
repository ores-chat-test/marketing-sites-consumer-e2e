# ORES Chat test marketing-site instructions

- This public repository is an isolated consumer fixture in `ores-chat-test`; it is not a production API or provider implementation.
- Load the reviewed production HTML bundle from `https://ores-chat.github.io/components/v1/` and keep source provenance visible.
- Use a deterministic same-origin service-worker test double for live interaction tests. Label it clearly and never claim it is an OpenAI, Anthropic, Gemini, or production ORES Chat response.
- Never include provider tokens, service credentials, cookies, user accounts, private context, database URLs, or real customer data.
- Keep public marketing contexts distinct and assert the context identifier received by the test double.
- Do not add React, React DOM, JSX, TSX, Next.js, or a React-compatible wrapper.
- Deploy only through the reviewed GitHub Pages workflow and retain keyboard-accessible fallback links.
- Use feature branches and pull requests. Never rebase, force-push, stash, or reset shared work.
