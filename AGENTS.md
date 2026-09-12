# ORES Chat test marketing-site instructions

- This public repository is an isolated consumer fixture in `ores-chat-test`; it is not a production API or provider implementation.
- Load the reviewed production HTML bundle from `https://ores-chat.github.io/components/v1/` and keep source provenance visible.
- Use a deterministic same-origin service-worker test double for live interaction tests. Label it clearly and never claim it is an OpenAI, Anthropic, Gemini, or production ORES Chat response.
- Never include provider tokens, service credentials, cookies, user accounts, private context, database URLs, or real customer data.
- Keep public marketing contexts distinct and assert the context identifier received by the test double.
- Do not add React, React DOM, JSX, TSX, Next.js, or a React-compatible wrapper.
- Deploy only through the reviewed GitHub Pages workflow and retain keyboard-accessible fallback links.
- Use feature branches and pull requests. Never rebase, force-push, stash, or reset shared work.

## Repository-local Git worktrees

- Create or use a Git worktree only when the human operator explicitly authorizes it for the current task. Concurrency or a dirty checkout is not permission by itself.
- Put every authorized worktree at `<repository-root>/tmp/worktrees/<name>`; from the repository root, use `./tmp/worktrees/<name>`. Never place worktrees beside repositories or organization directories.
- Keep `tmp`, `temp`, `tmp/worktrees`, and `temp/worktrees` ignored in the repository-root `.gitignore`. Do not commit files from those directories.
- Relocate or remove a worktree only when the operator explicitly requests it. Before removal, preserve and publish intended changes, verify its commit is represented on the target branch, and confirm there are no tracked, untracked, ignored-sensitive, or in-use files that must survive. Remove it with `git worktree remove <path>` without `--force`; never delete a worktree directory with `rm`.
