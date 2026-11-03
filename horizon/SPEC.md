# Horizon landing page animations — build spec (Nov 3, 2026)

Six self-contained HTML loops for the Horizon product page on fulcrumpro.com. They are reviewed first
(Alex and Rachel: visuals get approved before copy), then embedded in Webflow the same way the Builder
hero is (`archie-builder/hero/index.html` in this repo, hosted on GitHub Pages, iframe on the page).

## What Horizon is (so the animations tell the truth)

Horizon is a desktop app that reads a shop's inbox and files, learns how the shop quotes and makes parts,
and handles the back-and-forth with customers and vendors. It drafts the work and shows how it got there;
a person sends. Rules decide what comes to the person ("decisions", never "approvals"): expedite fees,
revision mismatches, discounts below the floor. Everything else goes out. Sunny's one idea: you are not
prompting the AI; it is prompting you. Nobody types a prompt in any of these loops.

Built today (safe to show as real): RFQ in → drawing opened → last job found → quote drafted; repeat parts
priced from history; PO checked against the quote → sales order; the three decision rules; vendor RFQ emails.
Where it's going (show only when the spec says so, labeled "next"): revision comparison, date-change
follow-ups, invoicing, shipping docs.

## Hard rules

- One root element per animation: `<div class="hz-<slug>">…</div>`. EVERY CSS selector is scoped under
  that class, every id is prefixed `hz-<slug>-`, all JS lives in one IIFE that does
  `document.querySelectorAll('.hz-<slug>').forEach(init)`. No styles on `html`/`body` except in the
  standalone page wrapper. Reason: the review artifact inlines all six on one page.
- Deliver two files in `horizon/<slug>/`: `index.html` (standalone page: body margin 0, white background,
  root centered, fills the viewport width up to 1200px) and `fragment.html` (ONLY the `<style>`, the root
  element and the `<script>`; no html/head/body). Both load Inter from Google Fonts
  (`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`). Gilroy is not
  hostable; Inter stands in. Marketing headlines are NOT inside the animation; they live on the page.
- Design size 1200×750 (16:10). The root measures its own width with ResizeObserver and scales an inner
  `.hz-<slug>-stage` with `transform: scale(var(--s))` (s = width/1200), height follows. Under 700px wide,
  it may switch to a simpler stacked phone layout, but it must never show a blank or clipped frame.
- First frame must read alone: open on the RESOLVED state (the finished thing), hold it ~3s, then run the
  loop, end on the resolved state again, hold ~4s, repeat forever. Never a white flash, never a "next in…"
  countdown, never a cursor-only moment. `prefers-reduced-motion: reduce` shows the resolved state only.
  `?still=1` on the standalone page jumps to the resolved state and stops (for screenshots).
- Loop length 18–40s. Typing effect 20–30ms/char. Easing `cubic-bezier(.2,.7,.2,1)`. Nothing moves faster
  than the eye can follow; nothing holds so long it looks frozen (max 4s on a single state).
- No external JS libraries. No images (draw with CSS/SVG). No audio.
- Palette. Product UI chrome (the Horizon window): ink `#292932`, muted `#6b6b6b`, lines `#e2e2e2`,
  pane `#f5f7fa`, white windows, product action blue `#1d63ed`, success `#16a34a` / `#ecfdf5`, warning
  `#d97706` / `#fff7ed`, danger `#dc2626` / `#fef2f2`. Marketing accents around/behind the window only:
  brand blue `#3840EA`, blue-light `#D7D9FB`, neon `#DDF83B` (one small touch at most). Backgrounds of the
  stage: white or `#f5f7fa`. Window frame: 1px `#e2e2e2` border, 10px radius, soft shadow
  `0 4px 18px rgba(0,0,0,.15)`. Any text span with a background color: `line-height:1` + padding.
- Content: fictional names only. Customers: Crestline Aerospace, Northgate Fab, Halvorsen Machine,
  Redwing Equipment. Vendors: Midwest Anodizing, Prairie Powder Coat, Lakeshore Laser, Dakota Plating.
  People: Dana (customer buyer), Luis (vendor), Pat (the shop's estimator). Parts: "Bracket 4410, Rev B",
  "Weldment 2207", "Mount plate 118", "Housing 3310". Emails come from `dana@crestline-aero.com` style
  addresses. Shop email `quotes@yourshop.com`. Wordmark, if shown, is lowercase `fulcrum`; product name
  is `Horizon` (capital H, never "Archie Horizon").
- Never show: an accuracy percentage, "trained on your data", "fully automated", "replace Paperless",
  "approvals", "AI" as a label, a prompt box being typed into, real company or vendor names, prices
  that look like real catalog prices (use round numbers like $1,240.00 / $86.50 ea).
- American spelling. Put a header comment at the top of `index.html` listing the beats with timestamps.
- Verify: render `index.html?still=1` with headless Chrome
  (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu
  --screenshot=/tmp/<slug>-still.png --window-size=1200,750 "file://…/index.html?still=1"`), look at the
  PNG, and fix anything clipped or overlapping. Then render without `?still=1` after a 4s delay using a
  small Node/CDP or by `--screenshot` with `--virtual-time-budget=4000` ONLY if the loop is CSS-keyframe
  driven (virtual time breaks rAF). Do not report done without looking at at least one rendered PNG.

## The six loops

### 1. `hero-email-lands` — "The email lands and it starts" (hero, Sunny's Oct 25 ask: no prompt)
Stage: the Horizon window. Left rail: a narrow inbox list. Center: the work. Right: a slim "Decisions" column.
Beats: (0) resolved: a drafted quote for Crestline Aerospace, Bracket 4410 Rev B, qty 250, $86.50 ea, with a
"Why" panel (last made Mar 2024, 212 min run time from 3 jobs, outside process: anodize, Midwest Anodizing
quoted 5 days) and a "Send" button that is NOT pressed. (1) a new email slides into the inbox: "RFQ: Bracket
4410 Rev B, qty 250, need by Nov 21" from Dana. Nobody clicks. (2) Horizon opens the attached drawing
(a simple drawn SVG part outline), highlights "Rev B". (3) "Found: last job 24-0871, Mar 2024" card appears
with the old price. (4) a vendor email goes OUT: "Lakeshore Laser / Midwest Anodizing — lead time for 250 pcs?"
(5) the quote drafts line by line (material, laser, brake, anodize, qty price). (6) the "Why" panel fills.
(7) status chip: "Drafted. Pat reviews before it goes." Hold. Loop.
Effect to land: it prompts you. Hands off the whole time. 30–36s.

### 2. `split-handled-decisions` — the split screen (hero fallback, AM demo opener)
Left column titled "Handled" scrolls a steady feed of done items (RFQ ingested, repeat part priced from
history, vendor emails sent, PO checked against quote, status reply sent, lead time logged). Right column
titled "Needs you" holds still with exactly three cards: Expedite fee (Northgate wants it in 6 days),
Revision mismatch (PO says Rev A, quote was Rev B), Discount below floor (Halvorsen asks 12% off). A quiet
counter at the top: "This week: 47 handled · 5 decisions". The left feed scrolls continuously at reading
pace; the right column never moves except a soft pulse when a new decision would arrive (keep it at three).
Resolved state = the two columns as described. 24–30s loop.

### 3. `conversation-ribbon` — the whole conversation (section 3)
A horizontal ribbon of nine beats: RFQ in · Vendor RFQs out · Quote · PO check · Status · Revision ·
Ship docs & certs · Invoice · Learns. Built beats (RFQ in, Vendor RFQs out, Quote, PO check, Status) are
solid ink pills; "next" beats (Revision, Ship docs & certs, Invoice) are outlined pills with a tiny "next"
tag; Learns is a loop-back arrow to the start. Above the ribbon, a small email card appears for each beat
in turn (subject line + one line of body) and the beat lights blue; built beats show "sent" / "checked",
next beats show "drafting · next". Loop walks the nine beats then holds on the full ribbon. 28–36s.

### 4. `overnight-reveal` — it learns your shop, by itself (section 4)
Left: a stream of small cards flowing into a funnel/drawer labeled "Reading": emails, PDFs (drawing icons),
timer rows, old quotes, with a counter climbing (emails 18,402 · drawings 3,115 · jobs 7,980). A moon/clock
shows Fri 6 pm → Mon 7 am (simple). Right: the result card types in: "Fab shop. 14 people. Press brake
rate $118/hr. You inspect before and after powder coat. Iridite on the drawing means an outside process:
Dakota Plating, 4 days. You quote repeat parts off the last job." Three "Rule" chips land underneath.
Resolved state = the full result card. No percentages, no "accuracy". 24–30s.

### 5. `same-reply-two-voices` — you manage, it works (section 5)
One decision card at the top: "Dana asked for 6-day turnaround. Expedite fee: 15% (your rule)." Below, the
drafted email shown twice side by side: left "Formal" (to Crestline's purchasing), right "Terse" (to
Halvorsen, who writes two-line emails). Both type in simultaneously, the same facts, different voice. A
small label: "Matches how you write to each customer." Then a "Pat sends" chip. Resolved state = both
drafts complete. 20–26s.

### 6. `expedite-math` — the three decisions / control (section 2)
A rush request: "Need all four by Nov 12". Four part rows (Bracket 4410, Weldment 2207, Mount plate 118,
Housing 3310) with a mini schedule bar each. Horizon checks each against the schedule: three turn green
("fits · ships Nov 10/11/11"), one stays red: "Housing 3310 · anodize back Nov 14 · Midwest Anodizing".
Then the drafted reply appears: three yes, one "Nov 14 unless we skip anodize; your call." and the decision
card "Expedite fee 15%? · Pat decides". Resolved state = the four rows resolved + decision card. 20–26s.

## Report back (one message)
Path of both files, loop length, the beat list with timestamps, the still PNG path, and any place where you
had to invent a product detail the spec did not give (list them so marketing can check with product).
