# Copilot instructions for this workspace

Purpose
- This repository is a collection of small, standalone React demo apps (each top-level folder is an independent Create React App project). Examples: `list-swapping`, `accordion`, `carousel`, `memory-game`.

Big picture
- Each demo is a self-contained CRA app with its own `package.json`, `public/`, and `src/` directories. There is no single runtime or shared build — treat each folder as an independent project.
- The typical entry points are `src/index.js` (React bootstrap) and `src/App.js` (demo wiring). Look at `list-swapping/src/App.js` for a representative example of structure and patterns.

Project conventions and patterns
- Folder naming: top-level demo folders use kebab-case (e.g., `list-swapping`).
- Component layout: most demos put reusable pieces under `src/components/` and page-level wiring in `src/App.js`.
- Styling: many demos include an `App.css` adjacent to `App.js`. Prefer local CSS files and keep changes scoped to the demo you're editing.
- Static assets: check `public/` (e.g., `index.html`, `manifest.json`) for any meta or asset changes — these are CRA defaults.
- Local data: some demos use JSON under `src/` (e.g., `data.json` in `accordian/`); read these when modifying UI state or props.

Build / run / debug
- Each demo runs independently. Typical workflow:
  1. `cd <demo-folder>` (e.g., `cd list-swapping`)
  2. `npm install` (if node_modules missing)
  3. `npm start` to run the CRA dev server (default port 3000; change or kill conflicting servers if necessary)
- There are no central test scripts across the workspace; if a demo has tests, run them inside that folder with `npm test`.
- For debugging, use the browser devtools and console logs; CRA provides helpful overlay errors in the browser.

Integration points & external deps
- Demos are mostly isolated and rely on standard npm packages declared in each demo's `package.json`.
- No shared monorepo tooling (Lerna, Nx, workspaces) is present; do not assume cross-package dependency linking.

When editing or adding demos
- Avoid cross-demo imports. Keep changes local unless you intentionally refactor multiple demos.
- Follow the existing component style in the demo you edit: functional components, hooks, and minimal state where already used.

Good examples to inspect
- Representative app wiring: [list-swapping/src/App.js](list-swapping/src/App.js#L1)
- Representative package manifest: [list-swapping/package.json](list-swapping/package.json#L1)

Merge guidance
- If a repo-level `.github/copilot-instructions.md` already exists, preserve any unique troubleshooting notes and merge the concise, demo-focused guidance above.

If anything is unclear
- Ask the repo maintainer which demos are highest priority and whether you should change configs at demo-level or propose a repo-level standard.

Thanks — please indicate any missing examples or workflows you want added.
