<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Working on Aunty

Tool-agnostic entry point. Any agent (Codex, Claude Code, Cursor, …) starts
here, then reads the living documents — they are the memory this project
carries between sessions and tools:

1. **`CLAUDE.md`** (this directory) — how to run it, stack, commands, env
   vars, conventions, design tokens. Despite the filename it is not
   Claude-specific; it is the engineering guide. Read it first.
2. **`PROGRESS.md`** — phase checklists. **Work the topmost unchecked item**
   unless the human says otherwise. Check items off as you finish them.
3. **`DECISIONS.md`** — read the last ~10 entries so you don't relitigate
   settled choices. Add 3–5 lines whenever you make a significant new one.
4. **`SPEC.md`** — the full product spec. Consult for any question about
   scope, features, or the non-negotiables (PART 2.3, 3.3, 4.5, 4.10, 5.10).

Then state in one short paragraph what you're about to do, and do it.

## Ground rules

- Commit small and conventional (`feat:` `fix:` `design:` `chore:`); push at
  the end of every session so the human can resume from another device.
  Never leave the repo broken.
- `pnpm lint && pnpm typecheck && pnpm test` must pass before you commit.
  `pnpm build` before you claim a feature works.
- `DEMO_MODE=true` means the whole app runs with zero external services —
  no keys needed to develop. OTP is `000000`.
- The non-negotiables in SPEC PART 2.3 / 3.3 / 4.10 outrank any creative
  idea, including your own. Log rejected ideas in `DECISIONS.md`.
