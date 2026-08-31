# ==============================================================================
# ROUTER 4: AI PERCEPTION & RULE VERIFICATION PIPELINE (/api/pipeline)
# ==============================================================================

from fastapi import APIRouter, HTTPException
from backend.models import PipelineRunRequest, PipelineRunResponse
from backend.database import get_connection
from backend.services.perception_engine import PerceptionEngine
from backend.services.audit_service import AuditService

router = APIRouter(prefix="/api/pipeline", tags=["AI Pipeline"])

@router.post("/analyze", response_model=PipelineRunResponse)
def analyze_consignment(req: PipelineRunRequest):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cases WHERE id = ? LIMIT 1;", (req.case_id,))
    row = cursor.fetchone()

    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail=f"Case {req.case_id} not found.")

    case_dict = dict(row)
    analysis_result = PerceptionEngine.run_pipeline(case_dict)

    # Update case status in database
    new_status = analysis_result["detected_status"]
    new_risk = analysis_result["risk_score"]

    cursor.execute("""
    UPDATE cases SET status = ?, risk_score = ? WHERE id = ?;
    """, (new_status, new_risk, req.case_id))
    conn.commit()
    conn.close()

    # Log to audit trail
    AuditService.log_event(
        inspector="AI_INFERENCE_ENGINE",
        action="AI_PIPELINE_EVALUATION",
        case_id=req.case_id,
        commodity=case_dict["title"],
        notes=f"6-stage AI perception completed. Status: {new_status}, Risk: {new_risk}/100."
    )

    return PipelineRunResponse(
        case_id=analysis_result["case_id"],
        status=analysis_result["status"],
        progress_pct=analysis_result["progress_pct"],
        steps=analysis_result["steps"],
        logs=analysis_result["logs"],
        detected_status=analysis_result["detected_status"],
        risk_score=analysis_result["risk_score"]
    )

@router.get("/logs/{case_id}")
def get_pipeline_logs(case_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cases WHERE id = ? LIMIT 1;", (case_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail=f"Case {case_id} not found.")

    res = PerceptionEngine.run_pipeline(dict(row))
    return {"case_id": case_id, "logs": res["logs"]}
