Librory — App Build Plan

 Context

 You have:
 - librory-landing/ — a Vite + React 19 + Tailwind 3 marketing site with a fully realized design system (4 ambient themes, 
 editorial typography, ember visual language, framer-motion + canvas-confetti already installed but unused).
 - index.html — a 2,039-line mobile-shaped prototype covering 5 screens (Hearth, Shelf, Scanner, Insights, Settings) and 4 
 overlays (book detail, immersive reading, OCR, completion ceremony). All state is in-memory, no persistence, no router,   
 no framework.
 - README.md — the product vision: cozy, judgment-free, offline-first reading tracker. v1 scope (per your decision) is the 
 cozy app without on-device CV; the AR book-spine scanner ships in v2.

 Goal of this plan: stand up a real, installable iOS + Android app that faithfully implements the v1 surface of index.html 
 on top of the landing's design system, with local-first persistence and a clean extension point for the v2 CV work.       

 Decisions already locked in:
 - Platform: Capacitor wrapping the existing web stack.
 - Stack: Vite + React 19 + Tailwind 3 (reuse the landing's tooling).
 - Storage: IndexedDB only (no server, no accounts).
 - CV scope: v2 — v1 ships the cozy app, manual book entry, no camera CV.
 - Theme: Capacitor on Windows — iOS builds require macOS, so iOS configuration will be set up but a working .ipa will     
 need a Mac or a CI runner.

 ---
 High-level architecture

 Librory/
 ├── librory-landing/      ← keep as-is, hosts the marketing site
 │   └── ...
 └── librory-app/          ← NEW. The actual app (created in this plan)
     ├── src/
     │   ├── main.tsx
     │   ├── App.tsx
     │   ├── routes/                ← React Router 7 client-side routing
     │   ├── screens/               ← Hearth, Shelf, Insights, Settings
     │   ├── overlays/              ← BookDetail, Immersive, OCR, Ceremony
     │   ├── components/            ← shared UI (Ember, BookCard, Spine, Toast, etc.)
     │   ├── design/                ← theme provider, design tokens, ambient palettes
     │   ├── store/                 ← Zustand slices
     │   ├── data/                  ← IndexedDB layer (idb), seed data
     │   ├── domain/                ← Book, Note, Session, Persona types and pure logic
     │   └── lib/                   ← ember, persona, time, util
     ├── android/                   ← Capacitor-generated
     ├── ios/                       ← Capacitor-generated (build on Mac)
     ├── capacitor.config.ts
     ├── vite.config.ts
     ├── tailwind.config.js         ← COPY from landing, add mobile-only tokens
     ├── postcss.config.js
     ├── index.html
     ├── package.json
     └── README.md

 librory-landing/ stays untouched (it has its own package.json, Vite config, node_modules). The new librory-app/ is a      
 sibling project.

 ---
 Phase 0 — Project scaffolding (½ day)

 1. Create librory-app/ at the repo root with npm create vite@latest librory-app -- --template react-ts (matches the
 landing's React 19 + Vite setup, but using TypeScript for component safety).
 2. Add dependencies (declared versions where they already exist on the landing for consistency):
   - Runtime: react-router-dom, zustand, idb, framer-motion, canvas-confetti, lucide-react, clsx, date-fns
   - Dev: tailwindcss@^3.4, postcss, autoprefixer, @capacitor/cli, @capacitor/core, @capacitor/ios, @capacitor/android,    
 @capacitor/camera (staged for v2), @capacitor/haptics, @capacitor/status-bar, @capacitor/splash-screen, @capacitor/app,   
 @capacitor/preferences
 3. Create tailwind.config.js that imports and extends librory-landing/tailwind.config.js (prevents config drift). Add to the extend block:
   - New mobile-friendly font sizes: mobile-h1: 2.25rem, mobile-h2: 1.75rem (the landing's h1/h2 are 5.25/3rem — too large 
 for a 375px viewport).
   - Safe-area utilities: pb-safe: env(safe-area-inset-bottom), pt-safe: env(safe-area-inset-top).
 4. Copy the four [data-theme="ambient-…"] palette blocks from librory-landing/src/index.css into the new
 librory-app/src/index.css, along with the editorial utility classes (.eyebrow, .bracketed, .marginalia, .drop-cap,        
 .asterism, .dingbat-row, .rule-mark).
 5. Initialize Capacitor: npx cap init "Librory" "app.librory.reading" --web-dir dist. Add platforms: npx cap add android  
 and npx cap add ios (ios step is a no-op on Windows — config + folders are created but Xcode build requires a Mac).       
 6. Wire npm run sync: "sync": "npm run build && npx cap sync" so a single command produces a runnable Android build.      

 Files created in this phase: the librory-app/ skeleton, capacitor.config.ts, vite.config.ts, tailwind.config.js,
 postcss.config.js, index.html, src/main.tsx, src/index.css.

 Verification: npm run dev opens the app shell in the browser at 390×844 viewport; npm run build && npm run sync && npx    
 cap open android opens the Android project in Android Studio (on Windows you can build with the Android SDK; for iOS,     
 instructions in the app's README.md).

 ---
 Phase 1 — Design system & theme provider (1 day)

 Goal: prove the design system is properly wired up in a mobile context before any screens are built.

 1. src/design/ThemeProvider.tsx — Promotes the landing's Header.jsx local state into a context. Reads/writes data-theme   
 on documentElement. Persists the chosen theme name via @capacitor/preferences (which on web falls back to localStorage).  
 Defaults to the time-of-day heuristic from the prototype (06–12 morning, 12–18 dusk, 18–06 candle, else paper).
 2. src/design/ambient.ts — Pure export of the four theme definitions (id + display name + icon + ember intensity). Used   
 by the ambient menu and the persona "vibe" computation.
 3. Tone down the global grain/vignette — The landing's body::before paper grain + body::after vignette are desktop-tuned. 
 In the app, scope them to a .app-grain overlay layer that's only rendered on non-reading screens (so they don't muddy     
 the book-detail / immersive overlay typography). Candle mode flips mix-blend-mode to screen as in the landing.
 4. <ScreenFrame> component — A reusable phone-shaped wrapper (max-w-[430px], mx-auto, h-screen with
 env(safe-area-inset-*) padding, paper grain overlay, vignette, ambient-transition). All five screens render inside this.  
 5. <TabBar> component — Bottom navigation matching the prototype's five-icon row, with the active accent treatment. Uses  
 NavLink from React Router so routes and active state stay in sync.
 6. <Toast> component — The prototype's #toast pill, lifted to a context-driven component. useToast().show(message) from   
 any screen.

 Files created: src/design/ThemeProvider.tsx, src/design/ambient.ts, src/components/ScreenFrame.tsx,
 src/components/TabBar.tsx, src/components/Toast.tsx, src/components/ToastProvider.tsx.

 Verification: A throwaway route that renders <ScreenFrame> + <TabBar> + a button that toggles themes + a button that      
 fires a toast. Visually matches the prototype's #deviceShell chrome at 390px wide.

 ---
 Phase 2 — Domain model & persistence (1 day)

 Goal: replace the prototype's in-memory state object with a real, persistent, type-safe model.

 1. src/domain/types.ts — TypeScript for the data model only. Fields taken directly from the prototype's state object (per 
 the inventory report) plus the obvious additions:
   - Book { id, title, author, page, totalPages, status: 'reading'|'unread'|'paused'|'completed', coverColor, giftFrom?,   
 notes: Note[], tags: string[], addedAt, finishedAt? }
   - Note { id, bookId, page, text, createdAt }
   - Session { id, bookId, startedAt, endedAt, pagesRead, seconds }
   - PersonaId = 'deep-diver' | 'cross-pollinator' | 'aesthetic-wanderer'
   - EmberState { fuel: 0-100, lastIgnitedAt }
   - Settings { theme, persona, atmosphericNoise, quietHours, softPulses, secureCloudBackup, lastSyncAt? }
 2. src/data/db.ts — idb wrapper. Three object stores: books, notes, sessions (keyed by id, indexed by bookId). A fourth:  
 kv for EmberState and Settings. Schema version 1.
 3. src/data/seed.ts — On first run, seed the four prototype books (Stoner, Dune, Normal People, The Bell Jar, plus the    
 missing-from-state Meditations that exists only in the prototype's DOM), their notes, and the default Settings. This      
 preserves the prototype's "demo data" feel for the first-run experience.
 4. src/store/library.ts — Zustand store. Slices: library (books, notes), sessions (current + history), ember (fuel,       
 lastIgnitedAt), settings. All mutations write through to IndexedDB via the db.ts wrapper. Reads on mount hydrate from
 IndexedDB (use an isHydrating flag to prevent Hearth UI flash before data loads).
 5. src/store/ui.ts — UI-only state: active book detail, immersive overlay open, OCR overlay open, ceremony overlay open,  
 toast queue, edit-mode flag. No persistence.
 6. src/domain/ember.ts — Pure functions: ignite(currentFuel), computeDimFactor(lastIgnitedAt, now),
 interpolateVibe(dimFactor). Lifts the prototype's hard-coded "+15 on click, +25 on seal, threshold 85" into tested pure   
 functions.

 Files created: src/domain/types.ts, src/domain/ember.ts, src/data/db.ts, src/data/seed.ts, src/store/library.ts,
 src/store/ui.ts.

 Verification: A dev-only "store inspector" route (behind import.meta.env.DEV) that lets you poke the store and
 re-hydrate; an automated check that seed.ts produces 5 books whose totalPages matches the prototype's hard-coded values   
 (278, 600, 273, 244, 254).

 ---
 Phase 3 — Routes & screen shells (1 day)

 Goal: every screen has a route, a placeholder UI matching the prototype's chrome, and the right store hooks wired. No     
 logic yet — just structure.

 1. Set up React Router 7 in src/main.tsx with a <BrowserRouter> (Capacitor uses the standard WebView history on
 iOS/Android; this is fine).
 2. src/App.tsx — <ThemeProvider> → <ToastProvider> → <ScreenFrame> → <Routes>. The <TabBar> lives at the bottom of        
 <ScreenFrame>.
 3. Routes (all rendered through <ScreenFrame>):
   - / → <HearthScreen> (the prototype's "Today's Refuge" — active book, ember, re-entry card)
   - /shelf → <ShelfScreen> (the prototype's "Your Living Shelf" — bookcase, filters)
   - /scanner → <ScannerScreen> (v1 stub — the prototype's camera chrome with a "Coming in v2 — for now, add books
 manually" empty state. Matches the locked-in phasing decision.)
   - /insights → <InsightsScreen> (the prototype's "Semantic Threads" — persona card + canvas)
   - /settings → <SettingsScreen> (the prototype's "Sanctuary Settings")
   - Overlays are NOT routes — they live in ui.js store state and render conditionally on top of the active screen
 (preserves the prototype's overlay model).
 4. For each screen: create a skeleton component that renders the prototype's eyebrow + headline + a placeholder body of   
 the right size. Hook up the ambient menu and shelf menu where the prototype has them.

 Files created: src/routes/index.tsx, src/screens/HearthScreen.tsx, src/screens/ShelfScreen.tsx,
 src/screens/ScannerScreen.tsx, src/screens/InsightsScreen.tsx, src/screens/SettingsScreen.tsx.

 Verification: Tap through all five tabs; the active tab's icon is accented; the screen chrome cross-fades on theme        
 change; closing & reopening the app preserves the last-visited tab.

 ---
 Phase 4 — Component library (2 days)

 Build the shared components the screens need, in this order so each is testable before the next depends on it.

 1. <EmberGraphic> — The 120px radial-gradient orb from the prototype. Props: fuel (0–100), dimFactor (0–1), onClick. Uses 
 the ember-breathe animation; click triggers the animate-flare keyframe (lifted from the prototype). Uses framer-motion    
 for the click ripple.
 2. <BookCard> — The Hearth's 2-up "Active Sanctuary" tile. Props: book, variant: 'hearth' | 'shelf' | 'detail'. Renders   
 the gradient-text title, spine shadow, linen-noise overlay, and bookmark ribbon. Used on Hearth + Shelf + BookDetail.     
 3. <BookSpine> — The vertical rotated title on the Shelf. Props: book, height (auto-derived from totalPages), onClick.    
 Color is the prototype's hard-coded per-book color, lifted to a deterministic function of book.id.
 4. <ProgressEdge> — The page-edge striped bar with the silk-ribbon slider. Props: page, totalPages, editable, onChange.   
 The prototype's #progressSlider is a styled div — we make it a real <input type="range"> with the prototype's CSS, so it  
 works on touch.
 5. <Marginalia> — The script-font note card. Props: note, onEdit, onDelete.
 6. <ReentryCard> — The "you've been away for N quiet days" card. Reads from library.js + ember.js to compute the
 threshold.
 7. <PersonaChip> — The cycle-through card on Insights. Reads the active persona from settings, dispatches cyclePersona to 
 the store.
 8. <PillSwitch> — The settings toggle. Props: checked, onChange, label. Renders the prototype's <input
 type="checkbox">-styled-as-pill.
 9. <CanvasForceGraph> — Lifts the landing's ThematicNetwork canvas logic. Props: nodes, links, theme, interactive. Pure   
 presentation — data comes from the store.
 10. <DropCap>, <Eyebrow>, <Bracketed>, <Dingbat>, <Asterism> — Tiny presentational primitives that map to the editorial   
 utility classes.

 Files created: ten files under src/components/.

 Verification: Each component has a small storybook-style "demo" route in dev mode (gated by import.meta.env.DEV) that     
 lets you preview with mock data. Manually compare each to the corresponding section in index.html at 390px wide.

 ---
 Phase 5 — Screen implementations (3–4 days)

 In this order, since each builds on the previous:

 1. Hearth — Greeting (uses state.activeBook), <EmberGraphic> (clickable, fires igniteEmber), <ReentryCard>, two
 <BookCard>s, ambient menu.
 2. Shelf — Filter strip (All / Reading / Unread / Paused / Completed) with counts, multi-tier bookcase, <BookSpine> per   
 book, edit-mode drag-and-drop via framer-motion's Reorder (replaces SortableJS, since framer-motion is the modern choice  
 on React 19 and already installed; use touch-action: none to avoid scroll conflicts). "+ Add Book" opens a <BookForm> modal.
 3. Insights — <PersonaChip>, <CanvasForceGraph> wired to the three personas' data. Cycle button rotates through them.     
 4. Settings — Reading Environment (3 <PillSwitch>es), Local & Private Journal (path display, Secure Cloud Backup toggle,  
 Last Sync timestamp). The toggle states write to the store; "Secure Cloud Backup" is wired to @capacitor/preferences for  
 v1 (real iCloud/Google Drive integration is a v2 concern — flag this honestly in the UI: "Coming soon").
 5. Overlays — <BookDetailOverlay> (cover preview, progress, marginalia list, add-note form, "Quote Snap OCR" link),       
 <ImmersiveOverlay> (full-screen focus mode with timer + "Seal Bookmark"), <OCROverlay> (v1 stub — same as the scanner:    
 "Coming in v2"), <CeremonyOverlay> (uses canvas-confetti for the "Volume Sealed" celebration).

 Files touched: all five screens under src/screens/, plus src/overlays/BookDetailOverlay.tsx,
 src/overlays/ImmersiveOverlay.tsx, src/overlays/OCROverlay.tsx, src/overlays/CeremonyOverlay.tsx, plus a <BookForm> modal 
 under src/components/.

 Verification: End-to-end manual QA against the prototype's flow:
 - Hearth: tap ember → flame flares, fuel increments; dismiss reentry → card disappears.
 - Shelf: drag a book to a new shelf → persists across app restart; add a new book via the form → appears in shelf,        
 navigates to detail.
 - Insights: cycle persona → graph reshapes; drag a node → it follows your finger.
 - Book detail: update page via the slider → progress bar fills, marginalia timeline updates; start immersive session →    
 timer counts; seal bookmark → if 100% reached, ceremony overlay fires with confetti.

 ---
 Phase 6 — Capacitor polish & native shell (1–2 days)

 1. capacitor.config.ts — Configure appId: "app.librory.reading", appName: "Librory", webDir: "dist", status bar styling   
 (matches the active theme's --page), splash screen with the logo.png icon.
 2. Status bar + safe area: @capacitor/status-bar plugin sets Style.Default for paper/morning/dusk, Style.Dark for candle. 
 Listen for theme changes in ThemeProvider to update.
 3. Haptics: Haptics.impact({ style: ImpactStyle.Light }) on ember click, Haptics.notification({ type:
 NotificationType.Success }) on ceremony completion. Wrapped in a useHaptics() hook that no-ops on web.
 4. App lifecycle: @capacitor/app to handle back button on Android (exit if on the Hearth tab, otherwise navigate back).   
 5. App icons & splash: Generate a 1024×1024 icon and platform-specific splash assets from public/logo.png. Use
 @capacitor/assets generate or hand-place per Capacitor's icon spec.
 6. Web fallback: In the browser, the app should look and behave identically. Status bar / haptics plugins are no-ops on   
 web — wrap each call.

 Files touched: capacitor.config.ts, src/main.tsx (adds plugin init), src/lib/haptics.ts (new).

 Verification: npm run build && npx cap sync android && npx cap open android → build the Android APK in Android Studio;    
 install on a device or emulator; verify status bar matches theme, haptics fire, back button works, and the app survives a 
 hard kill (re-opens to the last tab with all data intact).

 ---
 Phase 7 — v2 hookup (out of scope for this plan, but designed for)

 The ScannerScreen and OCROverlay already render a "Coming in v2" empty state. When the v2 work begins:

 - Add @capacitor/camera and the model runtime of choice (TFLite for cross-platform, CoreML/Vision on iOS, ML Kit on       
 Android for the simpler spine/ISBN path).
 - The data layer is already a clean place to add a ScanResult object store.
 - The dom layer has nothing CV-specific; the new code lives in src/lib/cv/ and writes into the existing store.

 ---
 Critical files

 To create (in order):
 - librory-app/package.json
 - librory-app/vite.config.ts
 - librory-app/tailwind.config.js (copy + mobile token additions)
 - librory-app/postcss.config.js
 - librory-app/index.html
 - librory-app/capacitor.config.ts
 - librory-app/src/main.tsx
 - librory-app/src/index.css (theme palettes + editorial classes)
 - librory-app/src/App.tsx
 - librory-app/src/design/ThemeProvider.tsx
 - librory-app/src/design/ambient.ts
 - librory-app/src/components/{ScreenFrame,TabBar,Toast,ToastProvider,EmberGraphic,BookCard,BookSpine,ProgressEdge,Margina 
 lia,ReentryCard,PersonaChip,PillSwitch,CanvasForceGraph,BookForm,DropCap,Eyebrow,Bracketed,Dingbat,Asterism}.tsx
 - librory-app/src/domain/types.ts
 - librory-app/src/domain/ember.ts
 - librory-app/src/data/db.ts
 - librory-app/src/data/seed.ts
 - librory-app/src/store/{library,ui}.ts
 - librory-app/src/screens/{Hearth,Shelf,Scanner,Insights,Settings}Screen.tsx
 - librory-app/src/overlays/{BookDetail,Immersive,OCR,Ceremony}Overlay.tsx
 - librory-app/src/lib/haptics.ts

 To reference but NOT modify:
 - librory-landing/tailwind.config.js — source of truth for the design tokens.
 - librory-landing/src/index.css — source of truth for the four ambient palettes and editorial utility classes.
 - librory-landing/src/components/EmberComparison.jsx — source of the ember visual config logic.
 - librory-landing/src/components/ThematicNetwork.jsx — source of the canvas force-graph implementation.
 - index.html — visual + behavioural reference for every screen and overlay.
 - README.md — product vision reference for copy and feature scope.

 Libraries & APIs to reuse:
 - framer-motion (12.x, already in landing package.json) — Reorder for shelf drag-and-drop, screen transitions,
 micro-interactions.
 - canvas-confetti (already in landing) — book completion ceremony.
 - lucide-react (already in landing) — icon set. Verify the 1.17.0 version pin against the icons you need; bump to a       
 recent version if missing icons.
 - @capacitor/preferences — theme persistence (with web localStorage fallback).
 - @capacitor/haptics — tactile feedback on ember/ceremony.
 - @capacitor/status-bar — theme-matching status bar.

 ---
 Verification (end-to-end)

 After all phases, the app should support this flow without any data loss across hard kills and reinstalls:

 1. Fresh install: 5 seeded books appear on the Shelf, ember glows at 60% on the Hearth, persona is "Deep Diver."
 2. Tap a book → detail overlay opens at the right page; update the page via the slider → progress bar fills; close.       
 3. Drag a book from one shelf to another in edit mode → reorder persists after force-quit.
 4. Start an immersive session, read for 30s, seal the bookmark → fuel increments, ceremony overlay fires (with confetti   
 at 100%).
 5. Cycle through all three personas on Insights → graph reshapes each time.
 6. Switch to Candle theme → status bar darkens (on device), ink colors invert, grain flips to screen blend, ember
 brightens.
 7. Add a new book via the Shelf's "+" form → appears in the right category, navigates to its (empty) detail.
 8. Hard-quit the app and reopen → all of the above is preserved.

 Manual QA checklist to be run on both a real iPhone and a real Android phone (or emulators):
 - Lighthouse a11y score ≥ 90 on the Hearth and Shelf.
 - All text is selectable (no user-select: none on the app root).
 - Tap targets ≥ 44×44 px.
 - Theme switch animates without layout shift.
 - Bottom tab bar respects iOS home-indicator safe area.
 - Back button on Android exits the app from the Hearth tab, navigates back from any other tab.

 Build commands:
 - npm run dev — local browser dev with HMR (390×844 viewport).
 - npm run build && npm run sync — produces dist/ + android/ + ios/ artifacts.
 - npx cap open android — opens Android Studio for APK build.
 - npx cap open ios — macOS only; opens Xcode.

 ---
 Out of scope for this plan

 - Test framework setup (Vitest, Playwright). Add when the v1 surface stabilises.
 - Real iCloud/Google Drive backup (v2 — the "Secure Cloud Backup" toggle is honest about being a v1 stub).
 - On-device CV (spine scanner, page OCR) — explicitly v2.
 - Push notifications for "Book Calling" — v2 (requires backend for scheduling).
 - Background audio for the "Atmospheric Noise" toggle — v2 (the toggle persists the setting; actual audio is a
 follow-up).
 - Marketing-site integration (the landing stays independent; no shared deployment story).