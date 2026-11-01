#!/usr/bin/env python3
"""Weekly Will review (Will mission, 1 Nov). Usage: python3 scripts/will-review.py <export.txt>
Reads the "Will conversations" export and prints the numbers that say whether Will works alone:
  - reactive team replies after payment (the team answering a customer by hand; the target is zero)
  - paid customers whose last message is from the customer and has had no answer for over 2 hours
  - failed, discarded and blocked sends
  - median minutes to the first reply (Will vs team)
Nothing is written anywhere; compare the output week to week."""
import re, sys, statistics as st
from datetime import datetime as dt

raw = open(sys.argv[1], encoding='utf-8').read()
chats = raw.split('=' * 70)[1:]
F = lambda s: dt.strptime(s, '%Y-%m-%d %H:%M')
MSG = re.compile(r'^\[(\d{4}-\d\d-\d\d \d\d:\d\d)\] (CUSTOMER|WILL|TEAM)(?:\s+\[(.*?)\])?\s*$')
reactive = silent = failed = discarded = blocked = 0
rt = {'WILL': [], 'TEAM': []}
silent_names = []
last_export = None
for ch in chats:
    lines = ch.strip('\n').split('\n')
    if len(lines) < 2: continue
    name, meta = lines[0].strip(), lines[1]
    paid = '·  paid  ·' in meta
    msgs = []
    for ln in lines[2:]:
        m = MSG.match(ln)
        if m: msgs.append({'t': F(m.group(1)), 'who': m.group(2), 'tag': m.group(3) or '', 'text': ''})
        elif msgs and ln.startswith('    '): msgs[-1]['text'] += ln.strip() + ' '
    for i, m in enumerate(msgs):
        last_export = max(last_export or m['t'], m['t'])
        tag = m['tag'] + ' ' + m['text'][:0]
        if 'send failed' in m['tag']: failed += 1
        if 'discarded' in m['tag']: discarded += 1
        if 'blocked' in m['tag']: blocked += 1
        if m['who'] in rt and i and msgs[i-1]['who'] == 'CUSTOMER' and not m['tag'] and '{system message}' not in m['text'] and '{template' not in m['text']:
            rt[m['who']].append((m['t'] - msgs[i-1]['t']).total_seconds() / 60)
            if m['who'] == 'TEAM' and paid: reactive += 1
    if paid and msgs and msgs[-1]['who'] == 'CUSTOMER' and last_export and not re.search(r'reacted to your message|^\W*(ok(ay)?[ ,]*)?(thanks?|thank you|perfect)( so much| again)?\W*$|^\W*(ok(ay)?)\W*$|^\W*\S+@\S+\W*$|^\W*📷', msgs[-1]['text'], re.I):
        if (last_export - msgs[-1]['t']).total_seconds() > 7200:
            silent += 1; silent_names.append(name)
med = lambda a: round(st.median(a), 1) if a else None
print(f'reactive team replies after payment: {reactive}   (target 0)')
print(f'paid customers waiting over 2h for an answer: {silent}')
for n in silent_names[:15]: print('   ', n)
print(f'send failed: {failed}   discarded: {discarded}   blocked: {blocked}')
print(f'median minutes to reply, Will: {med(rt["WILL"])}   team: {med(rt["TEAM"])}')
