# LegalMet AI: Compliance Station

> **High-stakes regulatory intelligence, AI vision audit, and statutory compliance workstation for Legal Metrology officers.**

Built with **LegalMet Core** design system on the frontend and **FastAPI + SQLite** on the backend, this application delivers an authoritative, high-density regulatory tech workstation for metrology inspectors, state packaging compliance officers, and enforcement adjudicators.

---

## 📁 Full-Stack Project Structure

```
legalmet-ai/
├── index.html                 # Single Page Application container & layout shell
├── package.json               # Project manifest & npm scripts
├── start.bat                  # 1-click Windows startup script (Frontend on port 8080)
├── start_backend.bat          # 1-click Windows startup script (FastAPI on port 8000)
├── README.md                  # Comprehensive project documentation
│
├── backend/                   # Complete Python FastAPI Backend System
│   ├── main.py                # FastAPI entry point, CORS, and router registration
│   ├── database.py            # SQLite schema, ORM connection, and seed populator
│   ├── models.py              # Pydantic v2 domain schemas & request/response models
│   ├── test_api.py            # Automated 30-test endpoint verification suite
│   ├── uploads/               # Packaging evidence file storage
│   ├── services/
│   │   ├── perception_engine.py  # 6-Stage AI perception & rule evaluation engine
│   │   ├── audit_service.py      # Cryptographic SHA-256 state hash chaining
│   │   └── cert_service.py       # Formal Metrology certificate & notice generator
│   └── routers/
│       ├── auth_router.py        # 1. /api/auth (Inspector Login, Biometrics, JWT)
│       ├── dashboard_router.py   # 2. /api/dashboard (KPIs, Triage Queue, Telemetry)
│       ├── intake_router.py      # 3. /api/intake (Multipart uploads & case registration)
│       ├── pipeline_router.py    # 4. /api/pipeline (AI vision & rule evaluation stream)
│       ├── cases_router.py       # 5. /api/cases (Workstation CRUD, overrides, decisions)
│       ├── xai_router.py         # 6. /api/xai (Explainable AI provenance & penalty matrix)
│       ├── reports_router.py     # 7. /api/reports (Batch analytics & certificates)
│       ├── audit_router.py       # 8. /api/audit (Immutable cryptographic audit ledger)
│       ├── statutes_router.py    # 9. /api/statutes (Rulebook & Schedule II calculator)
│       ├── radar_router.py       # 10. /api/radar (Hotspot surveillance & squad dispatch)
│       ├── search_router.py      # 11. /api/search (Unified multi-entity search)
│       ├── notifications_router.py # 12. /api/notifications (Alerts & unread counter)
│       └── system_router.py      # 13. /api/system (Telemetry & diagnostic tests)
│
├── styles/
│   ├── design-tokens.css      # LegalMet Core palette, typography, variables
│   ├── base.css               # Reset, typography, app sidebar, topbar, alert banner
│   ├── components.css         # Buttons, badges, confidence meters, tables, modals, dropzones
│   └── views.css              # Workstation split-view, radar heatmap, telemetry steppers
│
├── scripts/
│   ├── app.js                 # Central application bootstrap, client-side router & state store
│   ├── api-client.js          # Async API Client communicating with FastAPI
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

## 🚀 Running the Full Stack Application

### 1. Launch the Backend Server (FastAPI)
```bash
# Option A: Windows 1-Click
start_backend.bat

# Option B: Command line
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
* **API Documentation (Swagger UI)**: `http://127.0.0.1:8000/docs`
* **API Redoc**: `http://127.0.0.1:8000/redoc`

### 2. Launch the Frontend Application
```bash
# Option A: Windows 1-Click
start.bat

# Option B: Command line
python -m http.server 8080
```
* **Frontend Web App**: `http://127.0.0.1:8080`

### 3. Run Automated Backend Test Suite
```bash
python backend/test_api.py
```
*(Runs 30 automated tests validating all 13 modular API services with 100% pass rate)*

---

## 🏛️ Modular API Reference (13 Modules)

| # | Service Domain | Base Endpoint | Key Operations |
|---|---|---|---|
| 1 | **Auth & Biometrics** | `/api/auth` | Inspector PIN login, UIDAI biometric check, `/me` profile |
| 2 | **Command Center** | `/api/dashboard` | Live KPIs, priority queue, perception health telemetry |
| 3 | **Consignment Intake** | `/api/intake` | Multipart evidence upload, case registration, presets |
| 4 | **AI Perception Pipeline** | `/api/pipeline` | 6-stage algorithmic analysis, live logs stream |
| 5 | **Workstation Cases** | `/api/cases` | Split-view payload, findings list, overrides, decisions |
| 6 | **Explainable AI (XAI)** | `/api/xai` | Layer decomposition, certainty graphs, Section 36(1) matrix |
| 7 | **Reports & Certificates** | `/api/reports` | Batch aggregations, formal NCT Delhi Metrology certificate |
| 8 | **Cryptographic Audit** | `/api/audit` | Immutable SHA-256 block ledger, integrity verification |
| 9 | **Statutes & Calculator** | `/api/statutes`, `/api/calculator` | Statute search, Schedule II font height calculator |
| 10 | **Risk Radar** | `/api/radar` | Hotspot coordinates, watchlist, squad deployment |
| 11 | **Global Search** | `/api/search` | Multi-entity query engine across cases, barcodes, statutes |
| 12 | **Notifications & Alerts** | `/api/notifications` | Real-time alert feed, unread counter, mark-as-read |
| 13 | **System & Diagnostics** | `/api/system` | Subsystem telemetry, cache purge, 12-point diagnostics |

---

## 🔒 Statutory Legal Metrology Compliance Matrix

* **The Legal Metrology Act, 2009** (Act No. 1 of 2010):
  * **Section 18**: Mandatory declarations on pre-packaged commodities.
  * **Section 36(1)**: Non-standard packaging offences (₹25k / ₹50k / ₹1L + imprisonment).
  * **Section 49**: Corporate offences and director liability.
* **Legal Metrology (Packaged Commodities) Rules, 2011** (Amended 2022):
  * **Rule 6(1)(e)**: Strict prohibition of retail price (MRP) alteration or overprinting.
  * **Rule 6(1)(n)**: Mandatory phone and email for consumer grievance redressal.
  * **Schedule II, Table 1**: Mathematical font height thresholds for numerals.
