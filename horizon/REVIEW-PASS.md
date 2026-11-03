# Horizon loops — review pass (Nov 3 2026)

Apply to every loop in this folder. Read `SPEC.md` first (hard rules still stand: scoped root class,
1200×750 stage with `--s` scaling, resolved first frame, `?still=1` / `?at=N`, reduced motion,
fictional names, forbidden words, American spelling, lowercase `fulcrum` wordmark, product name `Horizon`).

## A. What Alex asked for (Nov 2 call with Carolyn) — the loops must carry this
1. **The estimator manages, Horizon works.** "You used to do all of this on your own; now you are
   effectively managing 7 people or agents doing it for you. You manage on an exception basis:
   what needs me, what is just going on, and get into the weeds only when you want to."
   Every loop should make it obvious that nobody typed anything, that the work went out on its own,
   and that the person only sees what their rules flagged. Where a loop can show "get in the weeds"
   (open one handled item and see every step it took), show it.
2. **Profile → how you work → rules.** The knowledge Horizon builds is layered: shop profile,
   the shop's culture/stats, then the rules derived from them. Keep that order when it appears.
3. **Incoming email with the question → visible thinking → the answer with the important
   bits highlighted.** Jon's livestream scenarios (an update request, a rush, a revision) are the right
   scenarios. Show the email arriving, show Horizon working (status chips, scans), then the answer.
4. **The email comes from a real inbox.** The hero now shows Outlook first. Other loops that show an
   inbound email say where it came from: `from Outlook` / `Outlook · quotes@yourshop.com`.
5. Launch reality: customer-only wave, slow and controlled, Fulcrum customers only for now. Do not add
   claims about other ERPs, pricing, accuracy, or "fully automated".

## B. Rob's and Alex's past animation feedback (Builder page/promo, Sept–Oct 2026)
- Alex: show the actual action, not a stand-in ("the animation needs to actually show dropping a pdf
  in"; "the user should be dropping the file within the app, not within the chat"). → Every beat shows the
  real thing happening in the UI where it happens.
- Alex: a side panel made the "changes" easier to follow than full-screen swaps. → Keep context on
  screen; do not blank the stage between beats.
- Alex: intro verbs and labels must not be boring or lazy ("type it" cut; "nobody at fulcrum built
  this" cut). → No filler labels; every caption says something specific.
- Alex: lowercase `fulcrum` everywhere; use the product's current UI, not an old one.
- Alex: no color at all is a problem; blues/greens from the product page carry the brand.
- Rob: in-progress feedback matters ("tell me what it's doing"); a bare wait reads as broken.
  → Status chips / scans / typing carets during any wait > 0.8s.
- Rob: "a little choppy, smooth it out even if longer." → No hard jumps; transitions 0.3–0.7s with
  cubic-bezier(.2,.7,.2,1); nothing pops in without an opacity/transform ease.
- Carolyn: "the words are loading too fast, can't read any of it." → Any text the viewer must read
  stays ≥ 2.5s after it finishes appearing; typed bodies ≤ 30ms/char; captions never shorter than 2s.
- Carolyn: first frame must read alone (GIF/poster rule) → `?still=1` is the finished state.
- Rob's highlight rule: any span/pill/tag with a background color uses `line-height: 1` and gets its
  breathing room from padding, with EQUAL visual space above and below the glyphs ("more padding bottom
  than top" is the complaint). `display:inline-block` or `inline-flex` for pills; `box-decoration-break:
  clone` for inline highlights that may wrap.

## C. Design system (fulcrum-design skill, live site CSS) — apply exactly
- **Fonts.** Inside a product window (title bar, lists, cards, email bodies): `Inter`. Outside a product
  window (diagram pills, stage titles, legends, captions on the canvas): `Gilroy` with Inter fallback.
  Gilroy @font-face (public Webflow CDN):
  ```
  @font-face{font-family:'Gilroy';src:url(https://cdn.prod.website-files.com/609461470d1c3e052bc814ee/609461470d1c3e57d3c814ff_Gilroy-Medium.ttf) format('truetype');font-weight:500;font-style:normal;font-display:swap}
  @font-face{font-family:'Gilroy';src:url(https://cdn.prod.website-files.com/609461470d1c3e052bc814ee/609461470d1c3e0e50c81503_Gilroy-SemiBold.ttf) format('truetype');font-weight:600;font-style:normal;font-display:swap}
  @font-face{font-family:'Gilroy';src:url(https://cdn.prod.website-files.com/609461470d1c3e052bc814ee/609461470d1c3e4970c814f9_Gilroy-Bold.ttf) format('truetype');font-weight:700;font-style:normal;font-display:swap}
  ```
  Stack: `'Gilroy','Inter',Arial,sans-serif`. Headings 600, labels 500. (The review artifact cannot
  load Gilroy and will show Inter; that is expected.)
- **Type floor.** Nothing under **11px** on the 1200 stage. Tags/pills **11.5–12px**, captions
  **12–13px**, body **13–14px**, card titles **15–17px**, stat numbers **20–22px**. Eyebrow labels:
  uppercase, 11–12px, 500–600, letter-spacing .04em, color `#6b6b6b`.
- **Colors.** Ink `#292932`. Secondary text `#6b6b6b`. Borders/dividers `#e2e2e2`. Light panel
  `#f5f7fa`. Product interaction blue **inside** the window `#1d63ed` (tint `#eef3ff`). Brand blue
  `#3840EA` / `#D7D9FB` only outside the window (glow, diagram pills, stage icons). Replace the
  Tailwind palette:
  - handled/ok green: `#16a34a` → **`#3DC975`** for dots/icons/borders, `#ecfdf5` / `#d1fae5` /
    `#bbf0d0` / `#bbf0d3` → **`#D8F4E3`** tint. Text on a green tint is ink `#292932` (not green).
    A darker green for green text, if a chip must be green text on white: `#1f8a4c`.
  - decision/needs-you amber: `#d97706` → **`#FF5C16`** (brand orange) for dots/borders/eyebrows,
    `#fff7ed` / `#f3d9b4` → **`#FFEFE8`** tint. Text on an orange tint is ink `#292932`.
  - red stays `#dc2626` / `#fef2f2` (no brand red; keep it rare).
  - neon `#DDF83B` / `#F4FFB0` only as the single accent dot or an inline highlight.
  - Outlook window colors (`#0f6cbd`, greys `#242424/#424242/#616161/#e1e1e1`) are intentional and
    stay — they belong to the other client, not to Horizon.
- **Radii.** Window 10px; cards 8px (10px only for the window and big panels); tags 4px; buttons and
  pills 999px; inputs 6px.
- **Spacing rhythm.** 4 / 8 / 12 / 16 / 24 / 32 / 40. Card padding 16 or 24. Grid gaps 12 or 16.
  No 14px/18px/22px paddings — round to the rhythm.
- **Window chrome, one grammar for every framed loop:** three `#e2e2e2` dots · `fulcrum` (700,
  lowercase) · `·` · `Horizon` (600) · account `quotes@yourshop.com` (secondary, left border) · status
  on the right. Frame: `border:1px solid #e2e2e2; border-radius:10px; box-shadow:0 4px 18px
  rgba(0,0,0,.15)`. The canvas loops (ribbon, overnight) keep the small blue `H` mark + `Horizon` +
  subtitle in Gilroy.
- Shadows: cards `0 1px 2px rgba(0,0,0,.06)` max inside the window; floating card `0 8px 28px
  rgba(0,0,0,.14)`.

## D. Verify before you finish
1. `node /private/tmp/claude-501/-Users-carolynring/edb61dc6-ca96-4d9c-9eaf-19ba2d0625a2/scratchpad/live.mjs "file:///Users/carolynring/web-embeds/horizon/<slug>/index.html?still=1" /private/tmp/claude-501/-Users-carolynring/edb61dc6-ca96-4d9c-9eaf-19ba2d0625a2/scratchpad/rv-<slug>-still.png 1800`
   and two more with `?at=<sec>` at the busiest beats. Look at them (Read tool). Nothing clipped,
   nothing overlapping, no text under 11px, pills evenly padded.
2. Regenerate `fragment.html` = exactly the text between `<!-- hz:fragment-start -->` and
   `<!-- hz:fragment-end -->` in `index.html` (python re, re.S). Confirm the fragment has no
   `<!doctype`, `<html`, `<head`, `<body`.
3. Update the beat list in the header comment of `index.html` if timings changed.
4. Report: what changed (bullets), new loop length, any place you had to invent a product detail.
