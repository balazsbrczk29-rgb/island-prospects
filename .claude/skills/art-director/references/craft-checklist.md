# Craft checklist and vocabulary (Balazs, 2026-11-20)

Every site passes this checklist before the critic sees it. It's the difference between "nice AI site" and work an owner pays for: the small things a trained eye notices in two seconds. The critic scores against it too.

## A. The polish pass (do all of it, on every page)
1. **Delete filler badges.** "New", "Premium", "Best", "#1", pill tags that say nothing true. If a badge doesn't carry a sourced fact, it goes.
2. **Drop redundant labels.** No "Phone:" before a phone number, no "Email us" above an email, no "Our services" above a list of services. The content labels itself.
3. **Unitalicize random words.** Italic only for a real reason: a title, a foreign word, a caption voice, a quiet secondary line used consistently. Never one emphasised word per headline.
4. **Mono only where needed.** Monospace for data a person compares or copies (coordinates, codes, specs, times in a table), never as decoration.
5. **One comprehensive design system.** Tokens on `:root`: a type scale (5 to 7 sizes), a spacing scale (4/8-based), radii, colours (ground, ink, muted, line, field, accent), one easing set, one duration set. Components use tokens only; no one-off values.
6. **Show the actual product where it's needed.** The real cake, the real room, the real roof, the real menu, the real boat. Not an icon or a mood shot standing in for the thing being sold.
7. **Enlarge the main feature.** The one thing the buyer came for (the package finder, the slip check, the booking flow, the hero photo) is the largest, clearest element on its screen.
8. **Group with spacing.** Related things sit close; unrelated things are far apart (proximity). Use spacing before you reach for lines, boxes or cards.
9. **Make headlines specific.** "Twenty-three slips, protected on all sides" beats "Your gateway to paradise". A headline that would fit a competitor is rewritten.
10. **Emphasise the CTA.** One primary action per screen, visually dominant (filled, accent, generous hit area); everything else is secondary or text.
11. **Add an accent colour where needed.** One accent, used sparingly: the primary CTA, the active state, one key number. Not on decoration.
12. **Keep icons consistent.** One family (lucide), one stroke width, one size per context, optically aligned with text. Or no icons at all.
13. **Remove unnecessary embellishments.** Gradients, glows, blobs, ornaments, dividers and shadows that exist only to look designed.
14. **Inner radius = outer radius - padding.** Nested rounded shapes (a button in a card, an image in a frame) stay concentric.
15. **Improve text contrast.** Body text at least 4.5:1, large text at least 3:1, against the actual pixels behind it (photos included). Muted grey on tinted ground is the most common failure.
16. **Wrap headline text properly.** `text-wrap: balance` on headings, `pretty` on paragraphs. No widows (one word alone on the last line). Use manual `<br>` only at meaningful breaks, and check them at 390 px.
17. **Align by the eye, not just by pixel size.** Optical centre (slightly above the geometric centre), hanging punctuation, play icons nudged right, round letters overshooting. If it looks off, it is off.
18. **Tabular numbers where needed.** `font-variant-numeric: tabular-nums` for prices, times, phone numbers in lists, counters, tables and anything that updates.
19. **Add loading states.** Every image has a sized, tinted placeholder (no layout shift). Every canvas has a poster. Every async action shows progress within 100 ms.
20. **Animate useful feedback.** Motion explains a change (what opened, where it came from, what was added, what was confirmed). It never decorates.

## B. Performance is part of the design (no lag, ever, on a phone)
A scene that stutters on an iPhone fails, however beautiful it is. These are requirements:
- **No React state per scroll frame.** Pass motion values (`useScroll`, `useTransform`) or refs to the render loop. Only discrete changes (chapter index) go through state.
- **Function transforms for scroll-linked fades.** Write `useTransform(p, v => ...)`, not the range form. Motion's native scroll-timeline acceleration mis-mapped `useTransform(p, [a, b], [1, 0])` (Bell Channel, Nov 20: the title faded *in* instead of out).
- **Pause what's offscreen.** R3F `frameloop={inView ? 'always' : 'never'}` (IntersectionObserver), videos paused, rAF loops stopped.
- **Adaptive quality.** Phones and coarse pointers: dpr 1 to 1.25, no MSAA. Desktop: max 1.5. Add drei `<PerformanceMonitor onDecline>` to step dpr down.
- **Animate only transform and opacity.** Never width, height, top, filter or blur on scroll. Use `will-change` only on elements that animate.
- **Lazy-load heavy chunks.** three.js and big components behind `lazy()`; the first screen paints from HTML, CSS and a poster image.
- **No layout shift.** Images and canvases have dimensions or aspect-ratio; fonts are self-hosted with `font-display: swap` and a metric-close fallback.
- **Respect reduced motion.** A beautiful still version, not a broken one.
- **Lenis** for wheel smoothing only. Leave native touch scrolling alone on phones.

## C. Vocabulary: use these words in briefs and critiques, and apply them
**Typography**
- **Kerning:** space between specific letter pairs. Check display sizes (AV, To, Ty), and tighten optical-size display faces.
- **Tracking:** uniform letter spacing. Tight (-0.02 to -0.045em) on large display type, slightly open on small caps and tiny labels.
- **Leading:** line height. About 1.5 for body, 0.9 to 1.1 for display.
- **X-height:** the height of lowercase letters. Pair faces with similar x-heights. A large x-height reads better small on phones.
- **Line length (measure):** 45 to 75 characters for body text.
- **Widow:** a lone word on the last line. Fix it with `text-wrap: balance/pretty` or a non-breaking space.
- **Tabular numbers:** equal-width figures, so numbers align in columns and don't jitter when they change.
- **Optical centre:** visual centre sits slightly above the mathematical centre. Place single elements there.

**Layout and interface**
- **Layout shift (CLS):** content jumping as things load. Reserve space for everything.
- **Safe area:** `env(safe-area-inset-*)` for anything fixed near the notch or home bar.
- **Touch target:** at least 44x44 px, with at least 8 px between targets.
- **Affordance:** something looks like what it does (a button looks pressable, a slider looks draggable).
- **Combobox:** a text input with a filtered list (search plus select). Use the accessible pattern (Radix or cmdk), never a fake div list.
- **Progressive disclosure:** show the essential first and reveal detail on demand (accordions, "more", steps).
- **Optimistic update:** show the result immediately and reconcile with the server afterwards (cart add, favourite, form step).
- **OKLCH:** perceptual colour space. Build tints, shades and accessible contrast ramps in `oklch()`, so steps look even.

**UX laws**
- **Fitts's law:** time to hit a target depends on its size and distance. Make primary actions big and close to the thumb. Use bigger hit areas (padding or `::after` extending the clickable zone).
- **Hick's law:** decision time grows with the number of choices. Fewer options per step; group and stage choices.
- **Doherty threshold:** respond in under 400 ms (ideally under 100 ms) or show progress. Instant-feeling feedback keeps people engaged.
- **Postel's law:** be liberal in what you accept (phone formats, dates, spaces) and strict in what you output.
- **Jakob's law:** people expect your site to work like the others they use. Keep standard patterns (menu, cart, tel links, back) and innovate in the content, not the controls.
- **Frequency of use:** the most-used actions (call, book, menu, directions) get the most prominent, fastest positions.

**Motion (Disney's principles, applied to UI)**
- **Origin-aware animation:** things grow from where they were triggered (a popover scales from its button, a sheet slides from its edge).
- **Interruptible animations:** a new input reverses or retargets a running animation smoothly (springs or motion values), never waits for it to finish.
- **Shared element transition:** the same element morphs from list to detail (`layoutId`, View Transitions API).
- **Stagger:** grouped items enter one after another, 30 to 60 ms apart, never longer than about 300 ms in total.
- **Squash & stretch:** subtle deformation to convey material and weight (a pressed button compresses 2 to 4 percent). Use rarely in premium work.
- **Anticipation (wind-up):** a tiny opposite move before the main move (a drawer pulls 4 px before opening). Use sparingly.
- **Staging the focus:** one thing moves at a time, and everything else stays still, so the eye knows where to look.
- **Pose to pose:** design the key states (start, end), then let the interpolation do the rest. Avoid improvised frame-by-frame motion.
- **Follow-through:** parts settle after the main motion stops (a caption lands just after its image).
- **Slow in & slow out:** easing. Nothing in nature starts or stops instantly: ease-out for entrances, ease-in for exits, ease-in-out for moves.
- **Moving in arcs:** natural paths curve. Use arcs for objects travelling across the screen (camera paths, flying items).
- **Secondary action:** a small supporting motion that enriches the main one (water shimmer under a moving camera, a light flicker).
- **Snappy timing:** UI feedback takes 120 to 250 ms; scene and cinematic moves take 0.8 to 2 s. Never sluggish feedback.
- **Exaggerated feedback:** make confirmations clear enough to be felt (a check that draws, a count that ticks). Use it only for meaningful events.
- **Solid drawing (3D):** forms have believable volume, light and perspective. Our 3D is real-time and physically lit, and it still must read as solid and grounded (contact shadows, consistent light direction).
- **Overall appeal:** the sum. Charm, clarity and personality. If it isn't appealing, nothing else matters.

## D. 3D is a premium tier, not the default
3D stops being special when every company has it. Default to the **standard tier**: superb photography, typography, layout, PhotoDepth (2.5D), scroll-scrubbed film, and Motion. Use **real-time 3D** only when:
- it explains the product better than a photo can: contractors and construction (a roof build-up, a structure assembling), industrial equipment, water treatment, a product you can turn, a site plan; or
- the arrival or place *is* the product: marinas, resorts reached by sea, dive sites; or
- the business is pitched at the premium tier ($1,000+).
Record the tier in status (`"tier_visual": "standard" | "premium-3d"`) and why. Every site, in either tier, must still be a jaw-dropper for the owner.

## E. React Bits (full library)
The full React Bits component library is vendored at `factory/web/src/components/react-bits/` (TypeScript + Tailwind variants, `LICENSE.md` included). Use it only through the rules above:
- Import components; never copy their demo values, colours, texts or default props. Every prop is set from the site's own tokens.
- One effect per page at most, and only when it serves the big idea (a text reveal for a headline, a gallery behaviour, a cursor in a creative niche). Never decorative beams, sparkles or auras on a law firm.
- Check its imports first: some need extra packages (gsap, ogl, matter-js, postprocessing, rapier). Install into `factory/web` only if needed, and note it in status.
- Licence: MIT + Commons Clause. Using components inside a client site is allowed. Never sell or redistribute the components themselves.
