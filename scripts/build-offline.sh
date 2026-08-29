#!/usr/bin/env bash
# Build in an environment with no route to fonts.googleapis.com.
#
# next/font/google fetches the font files at BUILD time. Where that fetch is
# blocked the build fails outright, so the only way to compile locally is to
# stub the three imports, build, and put them straight back.
#
# The restore is the part that matters. Doing it by hand once left the stub in
# a shipped build: no @font-face was emitted, `variable: '--font-serif'` came
# back as a class name instead of a custom property, and every heading on the
# site silently rendered in Georgia. It built, deployed and looked fine.
#
# So the restore runs from a trap and happens on success, on failure and on
# interrupt. src/lib/__tests__/font-imports.test.ts fails if the stub is ever
# left in place regardless, as the second line of defence.
#
# Usage:  ./scripts/build-offline.sh
set -uo pipefail
cd "$(dirname "$0")/.."

LAYOUT="src/components/layout/RootDocument.tsx"
BACKUP="$(mktemp)"
cp "$LAYOUT" "$BACKUP"

restore() {
  cp "$BACKUP" "$LAYOUT"
  rm -f "$BACKUP"
  echo "→ real font imports restored"
}
trap restore EXIT INT TERM

python3 - "$LAYOUT" <<'PY'
import sys
p = sys.argv[1]
s = open(p, encoding='utf-8').read()
real = "import { Fraunces, DM_Sans, Inter } from 'next/font/google'\n"
stub = (
    "type __FontOpts = { variable: string; [k: string]: unknown }\n"
    "const __stub = (o: __FontOpts) => ({ variable: o.variable, className: '', style: { fontFamily: '' } })\n"
    "const Fraunces = __stub\n"
    "const DM_Sans = __stub\n"
    "const Inter = __stub\n"
)
if real not in s:
    raise SystemExit('RootDocument.tsx does not carry the real font imports; refusing to stub')
open(p, 'w', encoding='utf-8').write(s.replace(real, stub, 1))
print('→ fonts stubbed for the offline build')
PY

npx next build
