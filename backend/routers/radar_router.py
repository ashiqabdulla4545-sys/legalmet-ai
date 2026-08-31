# ==============================================================================
# ROUTER 10: RISK RADAR & GEO-SURVEILLANCE (/api/radar)
# ==============================================================================

from fastapi import APIRouter
from backend.services.audit_service import AuditService
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api/radar", tags=["Risk Radar"])

class DeploySquadRequest(BaseModel):
    zone_id: str = "Z-01"
    squad_name: str = "Squadron 04 (Mobile OCR Unit)"

@router.get("/hotspots")
def get_risk_hotspots():
    return {
        "region": "Delhi-NCR",
        "coordinates": { "lat": 28.6139, "lng": 77.2090 },
        "zones": [
            { "id": "Z-01", "name": "North-West Delhi (Azadpur Mandi / Wholesale)", "risk": "CRITICAL", "violations": 88, "active_raids": 3, "top_defect": "Dual MRP Stickers on Tea/Spices" },
            { "id": "Z-02", "name": "South Delhi (Retail Malls & Premium Marts)", "risk": "LOW", "violations": 12, "active_raids": 0, "top_defect": "Minor font deficit" },
            { "id": "Z-03", "name": "Okhla Industrial Area (Packaging Hub)", "risk": "HIGH", "violations": 64, "active_raids": 2, "top_defect": "Schedule II sub-size numerals" },
            { "id": "Z-04", "name": "Narela Industrial Area (Grain & Pulses)", "risk": "HIGH", "violations": 58, "active_raids": 1, "top_defect": "Net content deficit" },
            { "id": "Z-05", "name": "Central Delhi (Connaught Place / Trade)", "risk": "MEDIUM", "violations": 24, "active_raids": 0, "top_defect": "Missing importer MRP label" }
        ]
    }

@router.get("/watchlist")
def get_high_risk_watchlist():
    return [
        { "name": "Imported Confectionery & Chocolates", "risk_pct": 82, "issue": "Missing Indian Importer Sticker & Non-Metric Weight" },
        { "name": "Protein & Health Supplements", "risk_pct": 76, "issue": "Sub-size font height & missing consumer care hotline" },
        { "name": "Edible Oils in Pouches", "risk_pct": 48, "issue": "Absence of dual weight/volume declaration at 30°C" },
        { "name": "Packaged Dry Fruits & Nuts", "risk_pct": 44, "issue": "Net quantity tare weight discrepancy" }
    ]

@router.post("/deploy")
def deploy_inspection_squad(req: DeploySquadRequest):
    AuditService.log_event(
        inspector="INS-8842-DL (R. Varma)",
        action="DEPLOY_SQUADRON",
        case_id=f"RADAR-{req.zone_id}",
        commodity="Field Surveillance",
        notes=f"Dispatched {req.squad_name} to Zone {req.zone_id}."
    )
    return {
        "status": "success",
        "zone_id": req.zone_id,
        "squad": req.squad_name,
        "message": f"{req.squad_name} successfully dispatched to Zone {req.zone_id} with mobile OCR scanner kits."
    }
