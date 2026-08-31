# LegalMet AI: Compliance Station

> **High-stakes regulatory intelligence, AI vision audit, and statutory compliance workstation for Legal Metrology officers.**

This project is separated into two dedicated, standalone folders:
* **`frontend/`**: The modern Single Page Application (SPA) workstation UI running on **`http://localhost:8080`**.
* **`backend/`**: The Python **FastAPI + SQLite** REST API service running on **`http://127.0.0.1:8000`**.

---

## 📁 Dedicated Architecture

```
legalmet-ai/
│
├── frontend/                  # Dedicated Frontend Folder
│   ├── index.html             # SPA container & layout shell
│   ├── package.json           # Frontend package manifest
│   ├── README.md              # Frontend setup & guide
│   ├── styles/                # CSS design system (tokens, components, views)
│   ├── scripts/               # JavaScript SPA modules, router, & API client
│   └── assets/                # SVG packaging evidence samples
│
└── backend/                   # Dedicated Backend Folder
    ├── main.py                # FastAPI entry point & CORS
    ├── database.py            # SQLite schema, tables & seed populator
    ├── models.py              # Pydantic v2 data models
    ├── requirements.txt       # Python dependencies
    ├── README.md              # Backend setup & API reference
    ├── test_api.py            # 30 automated unit & integration tests
    ├── legalmet.db            # SQLite database
    ├── uploads/               # Uploaded evidence files
    ├── services/              # Perception engine, audit ledger, certificates
    └── routers/               # 13 modular API routers (/api/auth, /api/cases, etc.)
```

---

## 🚀 Running Locally

### 1. Run Backend Server (Port 8000)
Open a terminal window and run:
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
* **API Root:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
* **Interactive Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* **API Redoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

### 2. Run Frontend Web App (Port 8080)
Open a second terminal window and run:
```bash
cd frontend
python -m http.server 8080
```
*(Or using Node.js: `npx serve . -l 8080`)*

* **Frontend Web App URL:** [http://localhost:8080](http://localhost:8080)

---

### 3. Run Backend Automated Test Suite
```bash
cd backend
python test_api.py
```
*(Executes 30 automated tests validating all 13 modular API endpoints with 100% pass rate)*
