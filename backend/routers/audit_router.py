# ==============================================================================
# ROUTER 8: CRYPTOGRAPHIC AUDIT TRAIL LEDGER (/api/audit)
# ==============================================================================

from fastapi import APIRouter
from backend.models import AuditLogEntry, AuditVerifyResponse
from backend.database import get_connection
from backend.services.audit_service import AuditService
from typing import List

router = APIRouter(prefix="/api/audit", tags=["Audit Trail"])

@router.get("/ledger", response_model=List[AuditLogEntry])
def get_audit_ledger():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM audit_ledger ORDER BY ROWID DESC;")
    rows = cursor.fetchall()
    conn.close()

    return [
        AuditLogEntry(
            id=r["id"],
            timestamp=r["timestamp"],
            inspector=r["inspector"],
            action=r["action"],
            case_id=r["case_id"],
            commodity=r["commodity"],
            hash=r["hash"],
            notes=r["notes"]
        ) for r in rows
    ]

@router.post("/verify", response_model=AuditVerifyResponse)
def verify_audit_ledger_integrity():
    return AuditService.verify_ledger()

@router.get("/export")
def export_audit_ledger_json():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM audit_ledger ORDER BY ROWID ASC;")
    rows = cursor.fetchall()
    conn.close()

    return {
        "ledger_node": "DELHI-NCT-HSM-NODE-01",
        "exported_at": "2026-08-31 10:00:00 IST",
        "total_records": len(rows),
        "records": [dict(r) for r in rows]
    }
