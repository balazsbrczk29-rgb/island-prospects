# Pro Tech Security Service Ltd: design.md (Nov 22 rebuild to the approved job spec)

## 1. The idea in one paragraph
"Someone is watching right now." Screen 1 is a working planner beside the same Nassau shop corner photographed at the real Nassau hour (day, dusk or night). A solid night plate on the photograph reads the live status: "It is 7:10 pm in Nassau. The office reopens Monday at 9. The central station is watching." The visitor taps what they are protecting, what they need and their part of New Providence, and the read-out on the right writes itself: which Pro-Tech divisions cover it, in one plain line each, and a one-sentence request to read out on the call. One brass button: Call (242) 328-0653. Balazs asked to keep the previous composition and individuality, so the live-hour photograph, Swiss numbering, the night/light rhythm and brass accent stay; the planner moves from section 6 to screen 1 and the hour is folded into it.

## 2. Inspirations
- **Ring / SimpliSafe "build your system":** pick property then needs; the summary on the right updates live. We take the live summary, not the shop cart.
- **Arup:** Swiss precision, decimal section numbers (1.0, 2.0), long captions in one grotesk.
- **Apple Weather:** the scene changes with the real local hour; we take the day/dusk/night photograph set by Nassau time.

## 3. Tokens
**Type:** Instrument Sans variable (wght 400 to 700, wdth 75 to 100), one family, self-hosted. A clean, slightly narrow grotesk reads as solid and exact without being military; kept from the approved version. Scale: 14 / 18 / 24 / 32 / 52 / 88 px; leading 1.45 / 1.5 / 1.3 / 1.15 / 1.04 / 0.98; display tracking -0.025em (52) and -0.035em (88). Decimal numbers 600 tabular.
**Colour (OKLCH):** ground `oklch(95.1% 0.004 145)` (#eef0ee), paper `oklch(97.9% 0.003 120)` (#f8f9f7), ink `oklch(21.6% 0.022 245)` (#101a24), muted `oklch(45.6% 0.02 240)` (#4e5a64, 6.0:1 on ground), line `oklch(87.6% 0.008 160)`, night field `oklch(22.6% 0.038 254)` (#0e1b2b) for the status plate and the monitoring section, on-night `oklch(91.9% 0.016 85)`, accent brass `oklch(79.4% 0.096 83)` (#d8b46a): call buttons (night text on brass, 8.9:1) and the active chip tick only. Live dot: brass (watching) pulses slowly.
**Space:** 8-based (8, 16, 24, 32, 48, 64, 96, 144). Section padding 144 desktop / 80 phone. Side padding clamp(20px, 3.4vw, 56px); 12 columns, gutter 24; measure 60ch.
**Shape:** radius 4 (chips, buttons, plate), photo frames 4. One shadow: none (the plate is solid colour). Hairlines 1 px line.
**Motion:** ease cubic-bezier(.22,1,.36,1). Chip feedback 160 ms. Read-out rows enter with 220 ms opacity + 8 px from the left, stagger 40 ms; removed rows fade 160 ms (AnimatePresence popLayout). Scene photo crossfade 1100 ms when the hour crosses a boundary. Reduced motion: no stagger, instant swap, no pulse.

## 4. Screens
**S1 Planner (desktop 1440x900).** Solid header 72 px: name left, Services / Monitoring / Contact and "Call (242) 328-0653" text right. Grid: cols 1 to 6 the street photograph (native 2752x1536, shown ~ 660x720 cover crop on the shop corner and wall camera), with the night status plate pinned to its lower-left (max 420 px): live dot, "It is 7:10 pm in Nassau.", office line, "The central station is watching." Cols 7 to 12: number "1.0", H1 "What do you need covered?" (52), one line "Pro-Tech Security: guards, CCTV and alarms, 24/7 monitoring. Nassau, since 2004."; planner: three short groups (Property: Home / Shop or office / Warehouse or yard; Need: Alarm / Cameras / Monitoring / Guards / Not sure; Area: select of New Providence areas), then the read-out panel (paper, hairline): "Covered by" rows (division name 600 + one line), the request sentence, brass "Call (242) 328-0653", secondary "Copy request". Primary action: Call.
**S1 phone (390x844).** Header 60 with Call text. The status plate becomes a one-line night strip under the header ("7:10 pm in Nassau · office reopens Mon 9 · monitoring on"). H1 32, line, chips wrap (44 px), area select, read-out, full-width Call. Photo follows the planner as a 4:3 frame.
**S2 Six divisions (2.0).** H2 "Six things Pro-Tech does." A ruled two-column list 2.1 to 2.6: Security guard services; CCTV and alarm sales and service; 24/7 central station monitoring; Security supplies; Consulting and investigations; Collections, each with one plain "what you get" line. CCTV close-up photo (native 2752x1536) at 5 cols beside the list. Phone: one column, photo first at 4:3.
**S3 Monitoring 24/7 (3.0), the night section.** Night field. Control-room photo (native 2752x1536) 7 cols; right: H2 "When the alarm goes off at 3 am." Four steps as a process: the alarm trips; the signal reaches the central station; the operator follows the plan you agreed at setup (who to call, in what order); someone is told. No times. Phone: photo then steps.
**S4 Licensed and Bahamian (4.0).** Guard-gate photo (native 1856x2304, shown 420 wide, 4:5) beside the three facts in large type: "100% Bahamian owned and operated, since 2004." "Licensed and regulated by the Ministry of National Security as a security service contractor." "Officers trained in Pro-Tech's own programme."
**S5 Contact (5.0).** Address #2 Farrington Road & Gregory Street (older listings: #10 Jem's Plaza, Pitt Road, flagged), P.O. Box CB-13083; phones: (242) 328-0653 main, (242) 325-3335 on older listings, international +1 (954) 237-1017, fax (242) 325-3350; office hours Mon to Fri 9 to 5, monitoring 24/7; directions link; brass Call.
**security-plan.html:** keep, using the same planner, plus the FAQ.

## 5. Core tool: interaction spec
- Inputs/defaults: property "A shop or office"; needs ["Alarm", "Monitoring"]; area "" (optional select).
- Read-out formula: rows = unique divisions for chosen needs (Alarm and Cameras both map to "CCTV and alarm sales and service", Monitoring to "24/7 central station monitoring", Guards to "Security guard services", Not sure to "Consulting and investigations"); the line under each row is fixed, plain, from the listed division names. Request = "Pro-Tech request: <property> in <area>. Needs: <list>." Empty state (no needs): "Choose at least one thing you need, or Not sure." with the call button still active.
- Status: Intl America/Nassau hour; office open Mon to Fri 9 to 5; lines: open until 5 / opens at 9 / closed for the day / reopens Monday at 9; always "The central station is watching." Updates every 30 s. Photo scene: day 6 to 18, dusk 18 to 20, night otherwise.
- Animation: rows enter/leave with popLayout; the request text cross-fades 160 ms. Chips: aria-pressed, 44 px, Enter/Space. Read-out aria-live polite.
- Hand-off: tel:+12423280653; Copy request to clipboard (feedback "Copied" 1.8 s). No WhatsApp or email (not sourced).

## 6. Signature details
1. The photograph is the same shop corner at the real Nassau hour; the plate's dot pulses slowly like a status LED.
2. The read-out writes "Covered by" rows in the order you tap.
3. Decimal numbering 1.0 to 5.0 carried from the approved version, the only labels.
4. The monitoring section is the single night field; its steps are numbered 3.1 to 3.4 like a log.
5. The older address and number are shown honestly as "on older listings".

## 7. Photography plan (all generated in one Lovable project, illustrative, captioned, listed in status)
street-day/dusk/night 2752x1536 (S1, ~ 660 wide, crop 40% x); cctv-closeup 2752x1536 (S2, ~ 520 wide); control-room 2752x1536 (S3, ~ 760 wide); guard-gate 1856x2304 (S4, 420 wide). Never upscaled; width/height set to native; tinted placeholders. One grade (cool morning to blue night, same camera).

## 8. Self-review
- Screen 1 sells the service and the visitor can plan and press Call without scrolling on desktop; on phone the chips and Call fit within about one screen and a half (Call sticky bar after the hero).
- A1 none. A2 no "Phone:" labels. A3 no italics. A4 no mono. A5 tokens. A6 product = the divisions and the live status; photos are illustrative and labelled. A7 planner largest on its side. A8 grouped by spacing. A9 specific headlines. A10 one brass button per screen. A11 brass only on Call and active ticks. A12 no icons except the live dot. A13 none. A14 radius 4 everywhere. A15 muted 6:1; plate text 13:1. A16 balance/pretty. A17 dot optically aligned to cap height. A18 tabular clock and phones. A19 photo placeholders tinted night. A20 rows animate to show what was added.
- Different from Harding-Lee and other repo sites: one grotesk, live clock photograph, decimal numbering, night field.
