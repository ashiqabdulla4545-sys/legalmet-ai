# LegalMet AI — Frontend Application

> **High-stakes regulatory intelligence, AI vision audit, and statutory compliance workstation UI.**

This is the standalone frontend Single Page Application (SPA) for LegalMet AI, built with vanilla HTML5, CSS3 (*LegalMet Core* design system), and JavaScript ES modules.

---

## 📁 Frontend Directory Structure

```
frontend/
├── index.html                 # Main Single Page Application shell & navigation container
├── package.json               # Frontend dependencies & npm scripts
├── README.md                  # Frontend documentation
├── styles/
│   ├── design-tokens.css      # Design tokens, color palette, typography
│   ├── base.css               # Reset, layout shell, topbar, navigation
│   ├── components.css         # Buttons, badges, tables, modals, alert banners
│   └── views.css              # Workstation split-view, radar map, pipeline telemetry
├── scripts/
│   ├── app.js                 # Router, state store, UI event bindings
│   ├── api-client.js          # Async client communicating with http://127.0.0.1:8000
│   ├── mock-data.js           # Ground truth cases, statutes, audit ledger
│   ├── utils/
│   │   ├── certificate-generator.js  # Certificate & notice generator
│   │   └── canvas-annotator.js       # Interactive SVG evidence canvas
│   └── views/                 # 13 Screen views (Command Center, Workstation, Intake, etc.)
└── assets/                    # SVG sample packaging evidence artworks
```

---

## 🚀 Running the Frontend

Navigate to the `frontend` folder and run any local static HTTP server:

### Option 1: Python
```bash
cd frontend
python -m http.server 8080
```

### Option 2: Node.js (npx)
```bash
cd frontend
npx serve . -l 8080
```

* **Frontend Web App URL:** [http://localhost:8080](http://localhost:8080)
* Connects automatically to the backend running at [http://127.0.0.1:8000](http://127.0.0.1:8000).
