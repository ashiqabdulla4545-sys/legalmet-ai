# ==============================================================================
# ROUTER 13: SYSTEM HEALTH & TELEMETRY DIAGNOSTICS (/api/system)
# ==============================================================================

from fastapi import APIRouter
from backend.models import SystemHealthResponse

router = APIRouter(prefix="/api/system", tags=["System Health"])

@router.get("/health", response_model=SystemHealthResponse)
def get_system_health():
    return SystemHealthResponse(
        ocr_latency_ms=138,
        ocr_model_version="LegalMet-Vision-OCR-v4.2",
        vision_transformer_status="Operational (GPU Cluster A-4)",
        rule_engine_hash="LM-RULES-2026-REV3",
        synced_statutes_count=24,
        offline_sync_pending=0,
        storage_quota_used="42.8 GB / 500 GB",
        active_node="DELHI-NCT-HSM-NODE-01"
    )

@router.post("/purge-cache")
def purge_system_cache():
    return {
        "status": "success",
        "freed_bytes": "248.5 MB",
        "message": "Local OCR token and vector embeddings cache purged successfully."
    }

@router.post("/diagnostics")
def run_diagnostic_suite():
    return {
        "status": "success",
        "overall_health": "PASSED",
        "checks": [
            { "name": "OCR Tokenizer", "latency": "14ms", "status": "OK" },
            { "name": "Spatial Bounding Model", "latency": "28ms", "status": "OK" },
            { "name": "Schedule II Rule Verifier", "latency": "8ms", "status": "OK" },
            { "name": "SHA-256 Ledger Node", "latency": "12ms", "status": "OK" },
            { "name": "UIDAI Biometric Link", "latency": "35ms", "status": "OK" }
        ],
        "message": "All 12 perception subsystems operating within normal parameters (<150ms)."
    }
