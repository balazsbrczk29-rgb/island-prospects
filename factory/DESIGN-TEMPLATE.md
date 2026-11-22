# <Business>: design.md (written by the builder after the job spec, before any code)
Save as `factory/web/sites/<slug>/design.md`. This is the art direction a top studio would hand its developer.
The site is generated FROM this document. A vague design.md produces a template site, so be exact.

## 1. The idea in one paragraph
What the visitor feels on screen 1, and how the core tool makes the job effortless.

## 2. Inspirations (named, from memory, no screenshots needed)
2 or 3 award-level sites or products whose specific moves you borrow, and what exactly you take from each. For example:
- "Aman: the booking bar sits in the photograph."
- "Airbnb: cards rise when dates change."
- "Apple: one sentence per screen."

Also take the reference lists in `site-playbooks/playbooks/<type>.md` and `factory/references.md`.

## 3. Tokens (every value is used; nothing outside them)
- **Type:** display face and text face (self-hosted @fontsource), and why they suit THIS business. Then the scale: 6 steps from caption to hero (for example 14 / 17 / 20 / 28 / 44 / 80), leading and tracking per step. Display tracking is -0.02 to -0.04em.
- **Colour (OKLCH):**
  - ground, surface, ink, muted ink (≥ 4.5:1 on the ground), line;
  - one accent, reserved for primary actions;
  - one field colour for one or two sections.
- **Space:** a 4/8 scale. Section padding desktop/phone, grid columns and gutter, maximum text measure (≤ 70ch).
- **Shape:** radii (inner = outer minus padding), borders, shadows (soft, used at most once or twice).
- **Motion:** easing (for example cubic-bezier(.22,1,.36,1)). Durations: 150 to 250 ms feedback, 400 to 700 ms reveals, 0.8 to 1.6 s scene moves. What staggers and by how much, and the reduced-motion fallback.

## 4. Screens (desktop and phone), one block per screen
For each screen:
- the purpose;
- the exact layout: grid columns, what sits where, image crop and native size;
- the headline copy (specific, sourced);
- the primary action;
- the phone version: what reorders and what collapses.

Screen 1 must show the product and the working core tool.

## 5. The core tool: interaction spec
- Inputs and their defaults.
- States: empty, filled, loading, result, error.
- What animates on change, and how. Use origin-aware, interruptible animation.
- Keyboard and touch behaviour.
- Where it hands off: booking engine URL, WhatsApp text, email.
- Exact numbers and formulas, from the spec's sourced prices.

## 6. Signature details (the 10/10 layer)
3 to 6 micro-details that make it feel hand-made for this business. For example:
- the total ticking with tabular numbers;
- a photo that eases into place when a cottage is chosen;
- the arrival sign that writes the visitor's name;
- a map route drawing in an arc.

## 7. Photography plan
- Every image: source URL, NATIVE width x height, where it goes, crop focus, alt text.
- Never shown wider than native. Set width/height attributes to the native size.
- One consistent grade.

## 8. Self-review before coding (answer in writing)
- Does screen 1 sell the product, and could a visitor complete the job without scrolling?
- Run the craft checklist A1 to A20, line by line. Which items does this design already satisfy, and which need care?
- Is this unmistakably THIS business, and different from its competitors in the repo?
