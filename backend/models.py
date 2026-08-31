# ==============================================================================
# LEGALMET AI - PYDANTIC DATA MODELS & DOMAIN SCHEMAS
# ==============================================================================

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# ------------------------------------------------------------------------------
# 1. Authentication & Inspector Models
# ------------------------------------------------------------------------------
class LoginRequest(BaseModel):
    badge: str = Field(default="INS-8842-DL", description="Inspector badge identifier")
    pin: str = Field(default="12345678", description="Security clearance PIN")
    jurisdiction: Optional[str] = Field(default="DELHI_NCT_1", description="Regulatory jurisdiction code")

class BiometricLoginRequest(BaseModel):
    badge: str = Field(default="INS-8842-DL")
    biometric_token: str = Field(default="UIDAI-HMAC-SHA256-MATCH-VERIFIED")

class InspectorProfile(BaseModel):
    id: str
    name: str
    title: str
    jurisdiction: str
    station: str
    badge: str
    avatar: str
    status: str
    role: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    inspector: InspectorProfile

# ------------------------------------------------------------------------------
# 2. Findings & Inspection Case Models
# ------------------------------------------------------------------------------
class BoundingBox(BaseModel):
    x: float
    y: float
    w: float
    h: float

class FindingSchema(BaseModel):
    id: str
    case_id: str
    rule_name: str
    statute: str
    section: str
    type: str # VIOLATION, COMPLIANT, REVIEW
    confidence: int # 1 to 4
    confidence_pct: int
    title: str
    description: str
    bbox: Optional[BoundingBox] = None
    bounding_tag: Optional[str] = None
    evidence_note: Optional[str] = None

class CaseCreateRequest(BaseModel):
    title: str
    commodity: str
    manufacturer: str
    importer: Optional[str] = "N/A"
    packer_address: str
    batch_no: str
    mfg_date: str
    expiry_date: Optional[str] = "N/A"
    declared_net_qty: str
    declared_mrp: str
    unit_sale_price: Optional[str] = "N/A"
    consumer_care: Optional[str] = "N/A"
    image_path: Optional[str] = "assets/tea_sample_evidence.svg"
    summary: Optional[str] = ""

class CaseResponse(BaseModel):
    id: str
    title: str
    commodity: str
    manufacturer: str
    importer: Optional[str] = "N/A"
    packer_address: str
    batch_no: str
    mfg_date: str
    expiry_date: Optional[str] = "N/A"
    declared_net_qty: str
    declared_mrp: str
    unit_sale_price: Optional[str] = "N/A"
    consumer_care: Optional[str] = "N/A"
    status: str # VIOLATION, COMPLIANT, REVIEW
    risk_score: int
    priority: str # CRITICAL, HIGH, MEDIUM, LOW
    date_intake: str
    intake_by: str
    image: str
    summary: str

class CaseDetailResponse(CaseResponse):
    findings: List[FindingSchema] = []

class OverrideRequest(BaseModel):
    justification: str
    new_status: Optional[str] = "COMPLIANT"

class DecisionRequest(BaseModel):
    decision: str # PASS, VIOLATION_NOTICE, ESCALATE
    notes: Optional[str] = ""

# ------------------------------------------------------------------------------
# 3. AI Pipeline Models
# ------------------------------------------------------------------------------
class PipelineRunRequest(BaseModel):
    case_id: str
    force_reanalysis: Optional[bool] = False

class PipelineStepResult(BaseModel):
    step_number: int
    name: str
    status: str # COMPLETED, FAILED, RUNNING
    details: str
    confidence: Optional[str] = None

class PipelineRunResponse(BaseModel):
    case_id: str
    status: str
    progress_pct: int
    steps: List[PipelineStepResult]
    logs: List[str]
    detected_status: str
    risk_score: int

# ------------------------------------------------------------------------------
# 4. Regulatory & Calculator Models
# ------------------------------------------------------------------------------
class FontCalculatorRequest(BaseModel):
    area_sq_cm: float
    packaging_type: str = "printed" # printed, blown, embossed

class FontCalculatorResponse(BaseModel):
    area_sq_cm: float
    packaging_type: str
    min_height_mm: float
    schedule_reference: str
    description: str

class StatuteSection(BaseModel):
    sec: str
    title: str
    summary: str

class Statute(BaseModel):
    id: str
    name: str
    act_no: str
    enacted: str
    sections: List[StatuteSection]

# ------------------------------------------------------------------------------
# 5. Audit & Certificate Models
# ------------------------------------------------------------------------------
class AuditLogEntry(BaseModel):
    id: str
    timestamp: str
    inspector: str
    action: str
    case_id: str
    commodity: str
    hash: str
    notes: str

class AuditVerifyResponse(BaseModel):
    is_valid: bool
    total_blocks_checked: int
    chain_head_hash: str
    node_id: str
    message: str

class CertificateResponse(BaseModel):
    certificate_id: str
    case_id: str
    date_issued: str
    is_compliant: bool
    html_rendered: str
    state_hash: str
    inspector_signature: str

# ------------------------------------------------------------------------------
# 6. Notifications & Dashboard Models
# ------------------------------------------------------------------------------
class NotificationItem(BaseModel):
    id: str
    type: str # VIOLATION, RADAR, STATUTE, AUDIT
    title: str
    message: str
    time: str
    read: bool
    target_path: Optional[str] = None
    case_id: Optional[str] = None

class NotificationMarkReadRequest(BaseModel):
    notification_id: Optional[str] = None
    mark_all: Optional[bool] = False

class DashboardKPIs(BaseModel):
    overall_compliance: float
    inspected_today: int
    active_queue: int
    violations_pending: int
    notices_issued: int
    system_perception_health: float

class SystemHealthResponse(BaseModel):
    ocr_latency_ms: int
    ocr_model_version: str
    vision_transformer_status: str
    rule_engine_hash: str
    synced_statutes_count: int
    offline_sync_pending: int
    storage_quota_used: str
    active_node: str
