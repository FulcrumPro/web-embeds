#!/usr/bin/env python3
"""Read the 'Allowed viewers' tab of the access sheet and write allow.json
(SHA-256 hashes of lowercased emails / @domains). Stdlib only.
Env: GSHEETS_TOKEN (JSON with client_id, client_secret, refresh_token),
     ALLOW_SHEET_ID, OUT (path to allow.json)."""
import hashlib, json, os, sys, urllib.parse, urllib.request, datetime

tok = json.loads(os.environ["GSHEETS_TOKEN"])
sheet_id = os.environ["ALLOW_SHEET_ID"]
out = os.environ.get("OUT", "allow.json")

body = urllib.parse.urlencode({
    "client_id": tok["client_id"], "client_secret": tok["client_secret"],
    "refresh_token": tok["refresh_token"], "grant_type": "refresh_token"}).encode()
access = json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", body))["access_token"]
rng = urllib.parse.quote("'Allowed viewers'!A2:A")
req = urllib.request.Request(
    f"https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/{rng}",
    headers={"Authorization": f"Bearer {access}"})
values = json.load(urllib.request.urlopen(req)).get("values", [])

def h(s): return hashlib.sha256(s.encode()).hexdigest()
emails, domains = set(), set()
for row in values:
    v = (row[0] if row else "").strip().lower()
    if not v or v.startswith("#"): continue
    if v.startswith("@") and "." in v: domains.add(h(v[1:]))
    elif "@" in v: emails.add(h(v))
    elif "." in v: domains.add(h(v))   # bare domain also allowed

data = {"emails": sorted(emails), "domains": sorted(domains),
        "updated": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")}
old = None
if os.path.exists(out):
    try: old = json.load(open(out))
    except Exception: old = None
if old and old.get("emails") == data["emails"] and old.get("domains") == data["domains"]:
    print(f"no change ({len(emails)} emails, {len(domains)} domains)"); sys.exit(0)
json.dump(data, open(out, "w"), indent=0)
print(f"wrote {out}: {len(emails)} emails, {len(domains)} domains")
