# LegalMet AI — FastAPI Backend Server

> **High-stakes regulatory intelligence, AI vision audit, and statutory compliance REST API.**

This is the standalone Python **FastAPI** backend for LegalMet AI.

---

## 📁 Backend Directory Structure

```
backend/
├── main.py                # FastAPI entry point, CORS, and router registration
├── database.py            # SQLite connection, schema tables, and seed data loader
├── models.py              # Pydantic v2 request/response schemas & domain models
├── test_api.py            # Automated 30-test endpoint test suite
├── requirements.txt       # Python dependencies (FastAPI, Uvicorn, Pydantic, Python-Multipart)
├── run_server.bat         # 1-Click launcher for backend server
├── legalmet.db            # SQLite database file
├── uploads/               # Uploaded packaging images & label evidence
│
├── services/
│   ├── perception_engine.py  # 6-Stage AI perception & rule evaluation engine
│   ├── audit_service.py      # Cryptographic SHA-256 state hash chaining
│   └── cert_service.py       # Formal Metrology certificate & notice generator
│
└── routers/
    ├── auth_router.py        # 1. /api/auth (PIN & Biometrics)
    ├── dashboard_router.py   # 2. /api/dashboard (KPIs & Queue)
    ├── intake_router.py      # 3. /api/intake (Uploads & Case Creation)
    ├── pipeline_router.py    # 4. /api/pipeline (AI Vision Evaluation)
    ├── cases_router.py       # 5. /api/cases (Workstation CRUD & Overrides)
    ├── xai_router.py         # 6. /api/xai (Layer Decomposition & Provenance)
    ├── reports_router.py     # 7. /api/reports (Batch Analytics & Certificates)
    ├── audit_router.py       # 8. /api/audit (Immutable Cryptographic Ledger)
    ├── statutes_router.py    # 9. /api/statutes (Rulebook & Font Calculator)
    ├── radar_router.py       # 10. /api/radar (Hotspot Surveillance & Squad Dispatch)
    ├── search_router.py      # 11. /api/search (Unified Search)
    ├── notifications_router.py # 12. /api/notifications (Alerts Feed)
    └── system_router.py      # 13. /api/system (Telemetry Diagnostics)
```

---

## 🚀 Setup & Run Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Start the Server
```bash
# Option A: Windows 1-Click
run_server.bat

# Option B: Uvicorn Command
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

### 3. Interactive API Documentation
* **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* **Redoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### 4. Run Automated Tests
```bash
python test_api.py
```
*(Validates all 13 services with 30 automated unit & integration tests)*
