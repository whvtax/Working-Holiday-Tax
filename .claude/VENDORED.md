# Vendored Claude Code skills, plugins and MCP servers

Everything here was copied from its official repository at a fixed commit, read before
installation (SKILL.md, scripts, hooks, network calls, environment access), and pinned.
To update: clone the upstream repo, review the diff since the commit below, then copy.

Reviewed: 26 Oct 2026.

## Skills (`.claude/skills/`)

| Skill | Source | Commit | Notes |
|---|---|---|---|
| webapp-testing | anthropics/skills `skills/webapp-testing` | dbd4588 | Playwright helpers; `with_server.py` starts a local dev server only |
| systematic-debugging | obra/superpowers `skills/systematic-debugging` | bb92a77 (v7.0.0, the commit pinned by claude-plugins-official) | Instructions + a local test-bisect script |
| verification-before-completion | obra/superpowers | bb92a77 | Instructions only |
| test-driven-development | obra/superpowers | bb92a77 | Instructions only |
| requesting-code-review | obra/superpowers | bb92a77 | Instructions; dispatches a reviewer subagent |
| vercel-react-best-practices | vercel-labs/agent-skills `skills/react-best-practices` | 063bee9 | Instructions only |
| vercel-composition-patterns | vercel-labs/agent-skills `skills/composition-patterns` | 063bee9 | Instructions only |
| web-design-guidelines | vercel-labs/agent-skills `skills/web-design-guidelines` | 063bee9 | Changed: reads a local `guidelines.md` (vercel-labs/web-interface-guidelines @ 434b7f9) instead of fetching it live |
| ui-ux-pro-max | nextlevelbuilder/ui-ux-pro-max-skill `.claude/skills/ui-ux-pro-max` | d14efff | Local CSV search (Python, no network). The plugin's other skills (design, brand, banner, slides, ui-styling, design-system) were NOT installed: their scripts call image APIs with API keys and run npm/pip installs |
| tob-sharp-edges | trailofbits/skills `plugins/sharp-edges` | 196a907 | Read-only tools |
| tob-differential-review | trailofbits/skills `plugins/differential-review` | 196a907 | Instructions |
| tob-supply-chain-risk-auditor | trailofbits/skills `plugins/supply-chain-risk-auditor` | 196a907 | Scripts send package names (not code) to OSV, npm, PyPI, deps.dev, Scorecard, GitHub API |
| tob-semgrep | trailofbits/skills `plugins/static-analysis/skills/semgrep` | 196a907 | Needs the `semgrep` CLI |
| tob-sarif-parsing | trailofbits/skills `plugins/static-analysis/skills/sarif-parsing` | 196a907 | Local SARIF parsing |
| next-bundle-optimizer | vercel/next.js `skills/next-bundle-optimizer` | cbf49db | Official Next.js skill |
| building-components | vercel/components.build `skills/building-components` | ba72745 | Instructions and reference docs only. Do not follow its marketplace examples (`npx shadcn add <url>`) without a separate review |

## Plugins (`.claude/vendor-marketplace/`, enabled in `.claude/settings.json`)

| Plugin | Source | Commit |
|---|---|---|
| insecure-defaults | trailofbits/skills `plugins/insecure-defaults` (tests removed) | 196a907 |

## MCP servers (`.mcp.json`)

| Server | Package | Version |
|---|---|---|
| playwright | `@playwright/mcp` (microsoft/playwright-mcp) | 0.0.83, pinned (the official plugin uses `@latest`) |

## Deliberately not installed

- anthropics/claude-code `plugins/frontend-design`: byte-identical to the frontend-design skill already installed (same SKILL.md as anthropics/skills).
- vercel-labs/before-and-after: depends on the `agent-browser` CLI and attaches media to GitHub PRs; this project does not use PRs and Playwright MCP covers screenshots.

- Superpowers' SessionStart hook and the full plugin: the hook injects mandatory process rules into every session. Its useful skills are above, without the hook.
- Superpowers writing-plans / executing-plans / subagent-driven-development / using-git-worktrees: they depend on each other and force a heavy process.
- anthropics/skills example skills that are not about websites (algorithmic-art, slack-gif-creator, canvas-design, theme-factory, internal-comms, brand-guidelines, web-artifacts-builder, mcp-builder).
- vercel-labs deploy-to-vercel, vercel-cli-with-tokens, vercel-optimize: need deploy tokens.
- trailofbits gh-cli (its hooks intercept every web fetch and curl), smart-contract, C/C++, Rust and binary-analysis plugins, codeql.
- next.js next-dev-loop: it requires the `agent-browser` CLI installed globally at `@latest`, which is outside the approved list and was not reviewed. Playwright MCP covers browser verification.
- next.js cache-components and partial-prefetching adoption/optimizer skills: they change the app's architecture; add only when adopting those features.
