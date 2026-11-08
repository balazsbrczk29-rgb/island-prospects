# Component catalog (vendored, import from `@/components/...`)

> **The art-director skill is the design authority.** This file only covers its own topic. Where it mentions layouts, signature visuals or "the reference site", treat them as examples: visuals are photographs (never drawn scenes or toy 3D), and references are award-level sites you look at with `look.mjs`, never another site in this repo.

Pick deliberately: 1 signature visual (three.js scene OR one React Bits background), 2-4 motion components, shadcn primitives for UI. More is worse. Every effect must serve the brand truth; taste-skill rules on when shaders/scenes are appropriate still apply (tech pages get more, hospitality and professional services get quiet motion).

## shadcn/ui (`@/components/ui/<name>`)
accordion badge button card dialog input label navigation-menu separator sheet tabs textarea 

## Magic UI (`@/components/magicui/<name>`)
android animated-beam animated-circular-progress-bar animated-gradient-text animated-grid-pattern animated-list animated-shiny-text animated-subscribe-button aurora-text avatar-circles backlight bento-grid blur-fade border-beam comic-text confetti cool-mode dia-text-reveal dither-field dock dot-pattern file-tree flickering-grid floating-3d-particles glare-hover globe glyph-matrix grid-pattern hero-video-dialog hexagon-pattern highlighter hyper-text icon-cloud interactive-grid-pattern interactive-hover-button iphone kinetic-text lens light-rays line-shadow-text magic-card marquee meteors morphing-text neon-gradient-card noise-texture number-ticker orbiting-circles particles pixel-image pointer progressive-blur pulsating-button rainbow-button retro-grid ripple-button ripple safari scroll-based-velocity scroll-progress shimmer-button shine-border shiny-button smooth-cursor sparkles-text spinning-text striped-pattern terminal text-3d-flip text-animate text-reveal typing-animation video-text warp-background word-rotate 

## React Bits Backgrounds (`@/components/reactbits/Backgrounds/<Name>/<Name>`, default export)
AcidSquares AeroShards Antigravity Aurora Balatro Ballpit Beams CRTWarp ColorBends DarkVeil Dither DotField DotGrid EvilEye FaultyTerminal Ferrofluid FloatingLines FluxLines Galaxy GhostFibers GradientASCII GradientBlinds GradientWaves Grainient GridDistortion GridMotion GridScan Hyperspeed Iridescence LetterGlitch LightPillar LightRays LightTunnel Lightfall Lightning LineWaves LiquidChrome LiquidEther MagicRings MagnetLines MicroSlats MoltenMetal Orb Particles PatternWaves PixelBlast PixelSnow Plasma PlasmaWave Prism PrismaticBurst Radar RippleGrid Scanner ShapeGrid ShapeWaves SideRays Silk SlicedWaves SoftAurora Threads Topography Waves WebThreads 

## React Bits TextAnimations (`@/components/reactbits/TextAnimations/<Name>/<Name>`, default export)
ASCIIText BlurText CircularText CountUp CurvedLoop DecryptedText DepthText EchoText FallingText FoldText FuzzyText GlitchText GradientText MaskedHeading ParticleText RotatingText ScrambledText ScrollFloat ScrollReveal ScrollVelocity ShinyText Shuffle SplitFlapText SplitText StrokeText TechText TextCursor TextLoop TextPressure TextType TrueFocus VariableProximity WarpText 

## React Bits Animations (`@/components/reactbits/Animations/<Name>/<Name>`, default export)
AnimatedContent BlobCursor ClickSpark Crosshair CrystalizedBall Cubes CursorGrid DitherVeil ElasticMesh ElectricBorder ElectricLogo FadeContent GhostCursor GlareHover GlowCursor GradualBlur HalftoneReveal ImageTrail LaserFlow LogoLoop Magnet MetaBalls MetallicPaint Noise OrbitImages PixelSwap PixelTrail PixelTransition Ribbons RippleDistortion ScrollExpand ShapeBlur SplashCursor StarBorder StickerPeel Strands SwarmCursor TargetCursor 

## React Bits Components (`@/components/reactbits/Components/<Name>/<Name>`, default export)
AccordionGallery AnimatedList BorderGlow BounceCards BubbleMenu CardNav CardSwap Carousel ChromaGrid CircularCarousel CircularGallery Counter CurvedInput DecayCard DepthCarousel Dock DomeGallery DriftWall ElasticSlider FlexCarousel FlowingMenu FluidGlass FlyingPosters Folder GlassIcons GlassSurface GooeyNav HoloCard InfiniteMenu InfiniteSpiral Lanyard LineSidebar MagicBento Masonry ModelViewer MorphSlider OptionWheel PillNav PixelCard ProfileCard ReflectiveCard ScrollStack SpecularButton SpotlightCard Stack StaggeredMenu Stepper TiltedCard 

## Proven in the reference site
- `BlurText` (React Bits) for the hero headline, `trigger="load"`.
- `BorderBeam` (Magic UI) on the hero visual frame.
- shadcn `Accordion` (FAQ), `Sheet` (mobile menu).
- React Three Fiber scene lazy-loaded with `lazy(() => import("./Scene"))` + `<Suspense>` fallback in the palette, so three.js never blocks first paint.

## Good fits by niche (starting points, not rules)
- hospitality-stay: quiet. `BlurFade`, `TextAnimate`, Lenis, one R3F scene (water, light, sand) or React Bits `Silk`/`SoftAurora`/`Grainient` tinted to the palette.
- marina: R3F water/chart scene, `GridPattern`/`DotPattern`, spec tables with `NumberTicker` only for sourced numbers.
- tours-experiences: `Marquee` of real activities, `Ripple`, R3F ocean or `Waves` background.
- real-estate: `Lens` on real photos, `BlurFade` galleries, `Globe`/island map.
- professional-services: restraint. `TextAnimate`, `AnimatedGridPattern` very faint, no 3D.
- industrial-b2b: `RetroGrid`/`GridScan`/`Topography`, technical SVG line-draw, `NumberTicker` for sourced figures.
- trade-retail: `Marquee` of departments, `ShinyButton`, `MagicCard`.
- food-events: `GradientText` in brand colors, `Particles` (subtle), typographic menus.
- institution: accessibility first, `BlurFade` only.

## Tailwind CSS size rule
Each site's `styles.css` starts with `@import "tailwindcss" source(none);` then `@source "./";` and one `@source` line per vendored component file it imports (see the reference site). Never `@source` the whole components folder (226 KB of CSS).
