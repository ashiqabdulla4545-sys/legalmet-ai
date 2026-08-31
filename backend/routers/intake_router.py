# ==============================================================================
# ROUTER 3: CONSIGNMENT INTAKE & PRESETS (/api/intake)
# ==============================================================================

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from backend.models import CaseCreateRequest, CaseResponse
from backend.database import get_connection
from backend.services.audit_service import AuditService
import os
import time
import uuid

router = APIRouter(prefix="/api/intake", tags=["Intake"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/create", response_model=CaseResponse)
def create_consignment_intake(req: CaseCreateRequest):
    conn = get_connection()
    cursor = conn.cursor()

    case_id = f"LM-2026-{int(time.time() * 1000) % 10000}"
    date_now = time.strftime('%Y-%m-%d %I:%M %p')
    intake_by = "Officer R. Varma"
    status = "REVIEW"
    risk_score = 50
    priority = "MEDIUM"

    cursor.execute("""
    INSERT INTO cases (id, title, commodity, manufacturer, importer, packer_address, batch_no, mfg_date, expiry_date, declared_net_qty, declared_mrp, unit_sale_price, consumer_care, status, risk_score, priority, date_intake, intake_by, image, summary)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        case_id, req.title, req.commodity, req.manufacturer, req.importer, req.packer_address,
        req.batch_no, req.mfg_date, req.expiry_date, req.declared_net_qty, req.declared_mrp,
        req.unit_sale_price, req.consumer_care, status, risk_score, priority,
        date_now, intake_by, req.image_path, req.summary or f"New consignment intake registered for {req.title}."
    ))

    conn.commit()
    conn.close()

    # Log to audit trail
    AuditService.log_event(
        inspector="INS-8842-DL (R. Varma)",
        action="CONSIGNMENT_INTAKE",
        case_id=case_id,
        commodity=req.title,
        notes=f"New pre-packaged article registered under Legal Metrology Section 18: {req.declared_net_qty}, {req.declared_mrp}."
    )

    return CaseResponse(
        id=case_id,
        title=req.title,
        commodity=req.commodity,
        manufacturer=req.manufacturer,
        importer=req.importer,
        packer_address=req.packer_address,
        batch_no=req.batch_no,
        mfg_date=req.mfg_date,
        expiry_date=req.expiry_date,
        declared_net_qty=req.declared_net_qty,
        declared_mrp=req.declared_mrp,
        unit_sale_price=req.unit_sale_price,
        consumer_care=req.consumer_care,
        status=status,
        risk_score=risk_score,
        priority=priority,
        date_intake=date_now,
        intake_by=intake_by,
        image=req.image_path or "assets/tea_sample_evidence.svg",
        summary=req.summary or "New consignment intake registered."
    )

@router.post("/upload")
async def upload_packaging_evidence(file: UploadFile = File(...)):
    filename = f"{uuid.uuid4().hex[:8]}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)

    return {
        "status": "success",
        "filename": filename,
        "file_path": f"uploads/{filename}",
        "size_bytes": len(contents)
    }

@router.get("/presets")
def get_sample_presets():
    return [
        {
            "id": "tea",
            "title": "Darjeeling Royal Gold Tea (500 g)",
            "commodity": "FMCG_TEA",
            "manufacturer": "Himalayan Brews & Tea Estates Ltd.",
            "packer_address": "Plot 14, Siliguri Tea Hub, WB - 734001",
            "declared_net_qty": "500 g",
            "declared_mrp": "₹ 420.00",
            "unit_sale_price": "₹ 0.84 per g",
            "batch_no": "HB-2026-B09",
            "mfg_date": "02/2026",
            "image": "assets/tea_sample_evidence.svg",
            "sample_anomaly": "Dual MRP Sticker Overprint (Rule 6(1)(e))"
        },
        {
            "id": "oil",
            "title": "Kisan Pure Mustard Oil (1 L)",
            "commodity": "EDIBLE_OIL",
            "manufacturer": "Bharat Agro Foods Pvt Ltd",
            "packer_address": "Industrial Estate Phase-II, Alwar, Rajasthan 301001",
            "declared_net_qty": "1 L (910 g at 30°C)",
            "declared_mrp": "₹ 165.00",
            "unit_sale_price": "₹ 165.00 per L",
            "batch_no": "BAF-2026-08M",
            "mfg_date": "08/2026",
            "image": "assets/oil_sample_evidence.svg",
            "sample_anomaly": "Compliant Dual Net Quantity Declaration"
        },
        {
            "id": "protein",
            "title": "Apex Hydro Protein Bar (75 g)",
            "commodity": "NUTRITION",
            "manufacturer": "Apex Health Nutrition India Ltd",
            "packer_address": "Okhla Industrial Area Phase-III, New Delhi 110020",
            "declared_net_qty": "75 g",
            "declared_mrp": "₹ 120.00",
            "unit_sale_price": "₹ 1.60 per g",
            "batch_no": "APX-PRO-774",
            "mfg_date": "07/2026",
            "image": "assets/protein_sample_evidence.svg",
            "sample_anomaly": "1.2mm Numeral Font Defect (Schedule II)"
        },
        {
            "id": "cosmetics",
            "title": "GlowEssence Radiance Serum (30 ml)",
            "commodity": "COSMETICS",
            "manufacturer": "Luxe Botanicals Pvt Ltd",
            "packer_address": "Baddi Industrial Corridor, Solan, HP 173205",
            "declared_net_qty": "30 ml",
            "declared_mrp": "₹ 899.00",
            "unit_sale_price": "₹ 29.96 per ml",
            "batch_no": "LB-SER-902",
            "mfg_date": "06/2026",
            "image": "assets/cosmetics_sample_evidence.svg",
            "sample_anomaly": "Missing Consumer Grievance Email/Phone (Rule 6(1)(n))"
        }
    ]
