# ==============================================================================
# ROUTER 1: AUTHENTICATION & INSPECTOR SESSION (/api/auth)
# ==============================================================================

from fastapi import APIRouter, HTTPException, Depends
from backend.models import LoginRequest, BiometricLoginRequest, AuthResponse, InspectorProfile
from backend.database import get_connection
import uuid

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM inspectors WHERE badge = ? OR id = ? LIMIT 1;", (req.badge, req.badge))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=401, detail="Inspector badge identifier not found.")

    inspector = InspectorProfile(
        id=row["id"],
        name=row["name"],
        title=row["title"],
        jurisdiction=row["jurisdiction"],
        station=row["station"],
        badge=row["badge"],
        avatar=row["avatar"],
        status=row["status"],
        role=row["role"]
    )

    token = f"LM-JWT-{uuid.uuid4().hex[:16]}"
    return AuthResponse(access_token=token, inspector=inspector)

@router.post("/biometric", response_model=AuthResponse)
def biometric_login(req: BiometricLoginRequest):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM inspectors LIMIT 1;")
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="No registered inspector profile found.")

    inspector = InspectorProfile(
        id=row["id"],
        name=row["name"],
        title=row["title"],
        jurisdiction=row["jurisdiction"],
        station=row["station"],
        badge=row["badge"],
        avatar=row["avatar"],
        status=row["status"],
        role=row["role"]
    )

    token = f"LM-BIO-{uuid.uuid4().hex[:16]}"
    return AuthResponse(access_token=token, inspector=inspector)

@router.get("/me", response_model=InspectorProfile)
def get_current_inspector():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM inspectors LIMIT 1;")
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Inspector profile not found.")

    return InspectorProfile(
        id=row["id"],
        name=row["name"],
        title=row["title"],
        jurisdiction=row["jurisdiction"],
        station=row["station"],
        badge=row["badge"],
        avatar=row["avatar"],
        status=row["status"],
        role=row["role"]
    )
