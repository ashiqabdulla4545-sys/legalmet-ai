# ==============================================================================
# ROUTER 7: BATCH INTELLIGENCE & CERTIFICATES (/api/reports)
# ==============================================================================

from fastapi import APIRouter, HTTPException
from backend.models import CertificateResponse
from backend.database import get_connection
from backend.services.cert_service import CertificateService

router = APIRouter(prefix="/api/reports", tags=["Batch Intelligence & Reports"])

@router.get("/batch-analytics")
def get_batch_analytics():
    return {
        "total_inspected": 14820,
        "total_compliant": 13101,
        "total_violations": 1719,
        "categories": [
            { "name": "Dual MRP / Overprinting", "count": 584, "pct": 34, "color": "var(--color-status-violation)" },
            { "name": "Font Height Defect", "count": 481, "pct": 28, "color": "var(--color-brand-accent)" },
            { "name": "Missing Consumer Care", "count": 326, "pct": 19, "color": "var(--color-status-review)" },
            { "name": "Net Content Weight Shortfall", "count": 206, "pct": 12, "color": "var(--color-status-info)" },
            { "name": "USP / Date Format Error", "count": 122, "pct": 7, "color": "var(--color-secondary)" }
        ],
        "manufacturers": [
            { "name": "Himalayan Brews Ltd", "inspected": 340, "compliant": 280, "violation_rate": "17.6%", "risk": "HIGH" },
            { "name": "Apex Health Nutrition", "inspected": 210, "compliant": 172, "violation_rate": "18.1%", "risk": "HIGH" },
            { "name": "Bharat Agro Foods", "inspected": 680, "compliant": 668, "violation_rate": "1.7%", "risk": "LOW" },
            { "name": "Luxe Botanicals Pvt Ltd", "inspected": 190, "compliant": 154, "violation_rate": "18.9%", "risk": "HIGH" },
            { "name": "Deccan Spice Mills", "inspected": 410, "compliant": 395, "violation_rate": "3.6%", "risk": "LOW" },
            { "name": "Britannia Industries", "inspected": 1250, "compliant": 1238, "violation_rate": "0.9%", "risk": "LOW" }
        ]
    }

@router.get("/certificates/{case_id}", response_model=CertificateResponse)
def get_case_certificate(case_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cases WHERE id = ? LIMIT 1;", (case_id,))
    c_row = cursor.fetchone()

    if not c_row:
        conn.close()
        raise HTTPException(status_code=404, detail=f"Case {case_id} not found.")

    cursor.execute("SELECT * FROM inspectors LIMIT 1;")
    insp_row = cursor.fetchone()
    conn.close()

    case_dict = dict(c_row)
    insp_dict = dict(insp_row) if insp_row else {"name": "Rajeshwar Varma", "title": "Senior Inspector", "badge": "DL-MET-904"}

    cert = CertificateService.generate_certificate(case_dict, insp_dict)
    return CertificateResponse(
        certificate_id=cert["certificate_id"],
        case_id=cert["case_id"],
        date_issued=cert["date_issued"],
        is_compliant=cert["is_compliant"],
        html_rendered=cert["html_rendered"],
        state_hash=cert["state_hash"],
        inspector_signature=cert["inspector_signature"]
    )
