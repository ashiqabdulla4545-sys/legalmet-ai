# ==============================================================================
# ROUTER 5: CASE WORKSTATION & DECISION ENGINE (/api/cases)
# ==============================================================================

from fastapi import APIRouter, HTTPException, Query
from backend.models import CaseResponse, CaseDetailResponse, FindingSchema, BoundingBox, OverrideRequest, DecisionRequest
from backend.database import get_connection
from backend.services.audit_service import AuditService
from typing import List, Optional
import json

router = APIRouter(prefix="/api/cases", tags=["Cases Workstation"])

@router.get("", response_model=List[CaseResponse])
def list_cases(status: Optional[str] = None):
    conn = get_connection()
    cursor = conn.cursor()

    if status:
        cursor.execute("SELECT * FROM cases WHERE status = ? ORDER BY risk_score DESC;", (status.upper(),))
    else:
        cursor.execute("SELECT * FROM cases ORDER BY risk_score DESC;")

    rows = cursor.fetchall()
    conn.close()

    return [
        CaseResponse(
            id=r["id"],
            title=r["title"],
            commodity=r["commodity"],
            manufacturer=r["manufacturer"],
            importer=r["importer"],
            packer_address=r["packer_address"],
            batch_no=r["batch_no"],
            mfg_date=r["mfg_date"],
            expiry_date=r["expiry_date"],
            declared_net_qty=r["declared_net_qty"],
            declared_mrp=r["declared_mrp"],
            unit_sale_price=r["unit_sale_price"],
            consumer_care=r["consumer_care"],
            status=r["status"],
            risk_score=r["risk_score"],
            priority=r["priority"],
            date_intake=r["date_intake"],
            intake_by=r["intake_by"],
            image=r["image"],
            summary=r["summary"]
        ) for r in rows
    ]

@router.get("/{case_id}", response_model=CaseDetailResponse)
def get_case_detail(case_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cases WHERE id = ? LIMIT 1;", (case_id,))
    c_row = cursor.fetchone()

    if not c_row:
        conn.close()
        raise HTTPException(status_code=404, detail=f"Case {case_id} not found.")

    cursor.execute("SELECT * FROM findings WHERE case_id = ?;", (case_id,))
    f_rows = cursor.fetchall()
    conn.close()

    findings_list = []
    for f in f_rows:
        bbox_obj = None
        if f["bbox_json"]:
            try:
                b = json.loads(f["bbox_json"])
                bbox_obj = BoundingBox(x=b["x"], y=b["y"], w=b["w"], h=b["h"])
            except Exception:
                pass

        findings_list.append(FindingSchema(
            id=f["id"],
            case_id=f["case_id"],
            rule_name=f["rule_name"],
            statute=f["statute"],
            section=f["section"],
            type=f["type"],
            confidence=f["confidence"],
            confidence_pct=f["confidence_pct"],
            title=f["title"],
            description=f["description"],
            bbox=bbox_obj,
            bounding_tag=f["bounding_tag"],
            evidence_note=f["evidence_note"]
        ))

    return CaseDetailResponse(
        id=c_row["id"],
        title=c_row["title"],
        commodity=c_row["commodity"],
        manufacturer=c_row["manufacturer"],
        importer=c_row["importer"],
        packer_address=c_row["packer_address"],
        batch_no=c_row["batch_no"],
        mfg_date=c_row["mfg_date"],
        expiry_date=c_row["expiry_date"],
        declared_net_qty=c_row["declared_net_qty"],
        declared_mrp=c_row["declared_mrp"],
        unit_sale_price=c_row["unit_sale_price"],
        consumer_care=c_row["consumer_care"],
        status=c_row["status"],
        risk_score=c_row["risk_score"],
        priority=c_row["priority"],
        date_intake=c_row["date_intake"],
        intake_by=c_row["intake_by"],
        image=c_row["image"],
        summary=c_row["summary"],
        findings=findings_list
    )

@router.post("/{case_id}/override")
def override_case_finding(case_id: str, req: OverrideRequest):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cases WHERE id = ? LIMIT 1;", (case_id,))
    row = cursor.fetchone()

    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail=f"Case {case_id} not found.")

    new_status = req.new_status or "COMPLIANT"
    new_risk = 10 if new_status == "COMPLIANT" else 90

    cursor.execute("UPDATE cases SET status = ?, risk_score = ? WHERE id = ?;", (new_status, new_risk, case_id))
    conn.commit()
    conn.close()

    # Log to cryptographic audit trail
    AuditService.log_event(
        inspector="INS-8842-DL (R. Varma)",
        action="MANUAL_OVERRIDE",
        case_id=case_id,
        commodity=row["title"],
        notes=f"Inspector override applied: {new_status}. Justification: {req.justification}"
    )

    return {
        "status": "success",
        "case_id": case_id,
        "new_status": new_status,
        "message": "Manual override recorded and sealed in audit ledger."
    }

@router.post("/{case_id}/decision")
def submit_inspector_decision(case_id: str, req: DecisionRequest):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cases WHERE id = ? LIMIT 1;", (case_id,))
    row = cursor.fetchone()

    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail=f"Case {case_id} not found.")

    if req.decision == "VIOLATION_NOTICE":
        final_status = "VIOLATION"
        action_name = "CONFIRM_VIOLATION"
        msg = f"Statutory Notice under Section 36(1) issued for {case_id}."
    else:
        final_status = "COMPLIANT"
        action_name = "CERTIFICATE_ISSUED"
        msg = f"Compliance verification certificate issued for {case_id}."

    cursor.execute("UPDATE cases SET status = ? WHERE id = ?;", (final_status, case_id))
    conn.commit()
    conn.close()

    AuditService.log_event(
        inspector="INS-8842-DL (R. Varma)",
        action=action_name,
        case_id=case_id,
        commodity=row["title"],
        notes=f"{msg} Notes: {req.notes}"
    )

    return {
        "status": "success",
        "case_id": case_id,
        "final_status": final_status,
        "message": msg
    }
