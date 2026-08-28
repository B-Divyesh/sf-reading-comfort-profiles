# Demo sandbox

- URL: <https://reading-comfort-profiles.sociobot.in/demo/>
- Local URL after `npm run dev:site`: <http://localhost:5173/demo/>
- Entry point: select **Try it with sample data** on the landing page.
- Sample: a quarterly access-review document with realistic prose, a code decision, and three request rows. The seeded Calm reading profile uses 19 px prose, 1.65 line spacing, 17 px code, stronger contrast, and roomier tables.
- Isolation: the demo reads and writes only `localStorage["demo:reading-comfort-profiles"]`. It never reads or writes extension storage.
- Reset: **Reset demo** restores the seeded Calm reading values.
- Exit: **Start for real** deletes the demo key before returning home.
- Offline: after one online visit and service-worker activation, the demo shell, sample, CSS, and JavaScript reload from the versioned cache.
