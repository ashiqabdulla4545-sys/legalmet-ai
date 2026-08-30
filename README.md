# LegalMet AI: Compliance Station

> **High-stakes regulatory intelligence, AI vision audit, and statutory compliance workstation for Legal Metrology officers.**

Built from the Stitch MCP design system (*LegalMet Core*), this application delivers an authoritative, high-density regulatory tech workstation for metrology inspectors, state packaging compliance officers, and enforcement adjudicators.

---

## 📁 Project Structure

```
legalmet-ai/
├── index.html                 # Single Page Application container & layout shell
├── package.json               # Project manifest & npm scripts
├── start.bat                  # 1-click Windows startup script
├── README.md                  # Comprehensive project documentation
│
├── styles/
│   ├── design-tokens.css      # LegalMet Core palette, typography, variables
│   ├── base.css               # Reset, typography, app sidebar, topbar
│   ├── components.css         # Buttons, badges, confidence meters, tables, modals, dropzones
│   └── views.css              # Workstation split-view, radar heatmap, telemetry steppers
│
├── scripts/
│   ├── app.js                 # Central application bootstrap, client-side router & state store
│   ├── mock-data.js           # Metrology cases, statutes, audit ledger, risk radar data
│   ├── utils/
│   │   ├── certificate-generator.js  # Metrology certificate & violation notice exporter
│   │   └── canvas-annotator.js       # Interactive SVG evidence canvas with bounding boxes
│   └── views/
│       ├── login-view.js              # 1. Inspector Login & Biometrics
│       ├── command-center-view.js      # 2. Command Center Dashboard
│       ├── intake-view.js              # 3. New Inspection Intake & Sample Presets
│       ├── ai-status-view.js           # 4. AI Processing Pipeline Telemetry
│       ├── workspace-view.js           # 5. Split-View Inspection Workstation
│       ├── evidence-why-view.js        # 6. Explainable AI (XAI) Traceability
│       ├── batch-reports-view.js       # 7. Batch Intelligence & Reports
│       ├── audit-trail-view.js         # 8. Immutable Cryptographic Audit Ledger
│       ├── regulatory-intel-view.js    # 9. Regulatory Library & Font Calculator
│       ├── risk-radar-view.js          # 10. Risk Radar & Hotspot Surveillance
│       ├── global-search-view.js       # 11. Omnibar Intelligence Search (Ctrl+K)
│       ├── system-health-view.js       # 12. Settings & Telemetry Diagnostics
│       └── prototype-overview-view.js  # 13. System Architecture & Roadmap
│
└── assets/
    ├── tea_sample_evidence.svg        # Darjeeling Tea with Dual MRP Anomaly
    ├── oil_sample_evidence.svg        # Mustard Oil with Dual Volume/Mass
    ├── protein_sample_evidence.svg    # Protein Bar with Font Height Defect
    ├── cosmetics_sample_evidence.svg  # Serum with Missing Consumer Care
    └── spices_sample_evidence.svg     # Garam Masala with Faded Ink Date
```

---

## 🚀 Quick Start & Running Locally

### Option 1: Double-click `start.bat`
Simply double-click the `start.bat` file in this folder. It will launch a local server and open your browser automatically.

### Option 2: Python HTTP Server
```bash
python -m http.server 8080
```
Then navigate to: **`http://127.0.0.1:8080`**

### Option 3: Node / NPX
```bash
npx serve .
```

---

## 🎯 Key Capabilities & Screen Routes

- **`#/login`**: Regulatory session login with simulated biometric authentication.
- **`#/command-center`**: Key compliance metrics, triage queue, and perception health meters.
- **`#/intake`**: Multi-format packaging drag-and-drop zone and instant sample presets.
- **`#/ai-status`**: Animated 6-stage telemetry stepper with live OCR terminal log feed.
- **`#/workspace`**: Interactive split-view workstation with zoom, pan, bounding box highlights, confidence indicators, and field justification notes.
- **`#/evidence-why`**: Explainable AI provenance graph, token attention layer differentials, and Section 36(1) penalty matrix.
- **`#/batch-reports`**: Recurring defect breakdowns and formal Metrology Certificate generator.
- **`#/audit-trail`**: Immutable audit ledger with cryptographic SHA-256 block hashes.
- **`#/regulatory-intel`**: Full text of *Legal Metrology Act 2009*, *Packaged Commodities Rules 2011*, and an interactive **Schedule II Font Height Calculator**.
- **`#/risk-radar`**: Geographic enforcement hotspot map of Delhi-NCR (*Azadpur*, *Okhla*, *Narela*).
- **`#/global-search`**: Fast multi-entity search with keyboard shortcut (`Ctrl+K` / `/`).
- **`#/system-health`**: Telemetry benchmarks, GPU cluster status, and RBAC role switcher.
- **`#/overview`**: Complete visual roadmap of all 13 screens.

---

## ⚖️ Regulatory References Included
- **The Legal Metrology Act, 2009** (Sections 18, 36, 49, 53)
- **Legal Metrology (Packaged Commodities) Rules, 2011** (Rule 6 Declarations, Rule 9 Font Schedule II, Rule 12 Metric units, Rule 18 Retail prices)
- **Packaged Commodities (Amendment) Rules, 2022** (Dual quantity volume + mass at 30°C for edible oils)
