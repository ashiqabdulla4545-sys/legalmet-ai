import os
import sys

# Ensure both project root and backend dir are in sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.database import init_db


# Import all 13 routers
from backend.routers.auth_router import router as auth_router
from backend.routers.dashboard_router import router as dashboard_router
from backend.routers.intake_router import router as intake_router
from backend.routers.pipeline_router import router as pipeline_router
from backend.routers.cases_router import router as cases_router
from backend.routers.xai_router import router as xai_router
from backend.routers.reports_router import router as reports_router
from backend.routers.audit_router import router as audit_router
from backend.routers.statutes_router import router as statutes_router
from backend.routers.radar_router import router as radar_router
from backend.routers.search_router import router as search_router
from backend.routers.notifications_router import router as notifications_router
from backend.routers.system_router import router as system_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize DB & seed data
    init_db()
    yield

app = FastAPI(
    title="LegalMet AI: Compliance Station API",
    description="State of the art regulatory intelligence, AI vision audit, and statutory compliance REST API.",
    version="4.2.0",
    lifespan=lifespan
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register All 13 Modular Routers
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(intake_router)
app.include_router(pipeline_router)
app.include_router(cases_router)
app.include_router(xai_router)
app.include_router(reports_router)
app.include_router(audit_router)
app.include_router(statutes_router)
app.include_router(radar_router)
app.include_router(search_router)
app.include_router(notifications_router)
app.include_router(system_router)

# Mount Uploads directory
uploads_path = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(uploads_path, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_path), name="uploads")

@app.get("/")
def root():
    return {
        "service": "LegalMet AI: Compliance Station Backend",
        "version": "4.2.0",
        "status": "OPERATIONAL",
        "documentation": "/docs",
        "hsm_node": "DELHI-NCT-HSM-NODE-01"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "sqlite_connected"}

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
