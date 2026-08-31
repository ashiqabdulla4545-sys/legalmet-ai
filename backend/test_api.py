import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from backend.main import app
from backend.database import init_db

def run_tests():
    init_db()
    with TestClient(app) as client:
        print("==================================================")
        print("   LEGALMET AI FASTAPI BACKEND TEST SUITE")
        print("==================================================")
        passed = 0
        failed = 0

    def assert_eq(test_name, condition, details=""):
        nonlocal passed, failed
        if condition:
            print(f"  + [PASS] {test_name}")
            passed += 1
        else:
            print(f"  ! [FAIL] {test_name}: {details}")
            failed += 1

    # 1. Health check & Root
    r = client.get("/health")
    assert_eq("Health Check", r.status_code == 200 and r.json().get("status") == "healthy")

    # 2. Auth router (/api/auth)
    r = client.post("/api/auth/login", json={"badge": "INS-8842-DL", "pin": "12345678"})
    assert_eq("Auth Login (PIN)", r.status_code == 200 and "access_token" in r.json())

    r = client.post("/api/auth/biometric", json={"badge": "INS-8842-DL", "biometric_token": "TEST-MATCH"})
    assert_eq("Auth Biometric Login", r.status_code == 200 and r.json()["inspector"]["name"] == "Rajeshwar Varma")

    r = client.get("/api/auth/me")
    assert_eq("Auth Current Inspector", r.status_code == 200 and r.json()["badge"] == "DL-MET-2026-904")

    # 3. Dashboard router (/api/dashboard)
    r = client.get("/api/dashboard/kpis")
    assert_eq("Dashboard KPIs", r.status_code == 200 and r.json()["overall_compliance"] > 0)

    r = client.get("/api/dashboard/queue")
    assert_eq("Dashboard Queue", r.status_code == 200 and len(r.json()) > 0)

    r = client.get("/api/dashboard/perception-health")
    assert_eq("Dashboard Perception Health", r.status_code == 200 and r.json()["ocr_confidence"] == 98.2)

    # 4. Intake router (/api/intake)
    r = client.get("/api/intake/presets")
    assert_eq("Intake Presets", r.status_code == 200 and len(r.json()) >= 4)

    r = client.post("/api/intake/create", json={
        "title": "Automated Test Sugar Bag (1 kg)",
        "commodity": "FMCG_SUGAR",
        "manufacturer": "National Sugar Refinery Ltd",
        "packer_address": "Sugar Mill Road, Meerut, UP 250001",
        "batch_no": "TEST-B01",
        "mfg_date": "08/2026",
        "declared_net_qty": "1 kg",
        "declared_mrp": "₹ 48.00"
    })
    created_case_id = r.json().get("id") if r.status_code == 200 else None
    assert_eq("Intake Create Consignment", r.status_code == 200 and created_case_id is not None)

    # 5. Pipeline router (/api/pipeline)
    r = client.post("/api/pipeline/analyze", json={"case_id": "LM-2026-8841"})
    assert_eq("AI Pipeline Analysis", r.status_code == 200 and len(r.json()["steps"]) == 5)

    r = client.get("/api/pipeline/logs/LM-2026-8841")
    assert_eq("AI Pipeline Logs", r.status_code == 200 and len(r.json()["logs"]) > 0)

    # 6. Cases router (/api/cases)
    r = client.get("/api/cases")
    assert_eq("List Cases", r.status_code == 200 and len(r.json()) >= 5)

    r = client.get("/api/cases/LM-2026-8841")
    assert_eq("Get Case Detail & Findings", r.status_code == 200 and len(r.json()["findings"]) >= 4)

    r = client.post("/api/cases/LM-2026-8841/override", json={"justification": "Field testing override", "new_status": "REVIEW"})
    assert_eq("Case Inspector Override", r.status_code == 200 and r.json()["status"] == "success")

    r = client.post("/api/cases/LM-2026-8841/decision", json={"decision": "VIOLATION_NOTICE", "notes": "Dual MRP confirmed"})
    assert_eq("Case Decision Submission", r.status_code == 200 and r.json()["final_status"] == "VIOLATION")

    # 7. XAI router (/api/xai)
    r = client.get("/api/xai/provenance/LM-2026-8841")
    assert_eq("XAI Provenance Graph", r.status_code == 200 and len(r.json()["provenance_chain"]) == 5)

    r = client.get("/api/xai/penalty-matrix")
    assert_eq("XAI Section 36(1) Penalty Matrix", r.status_code == 200 and len(r.json()["offences"]) == 3)

    # 8. Reports & Certificates router (/api/reports)
    r = client.get("/api/reports/batch-analytics")
    assert_eq("Batch Analytics", r.status_code == 200 and len(r.json()["categories"]) >= 5)

    r = client.get("/api/reports/certificates/LM-2026-8841")
    assert_eq("Certificate Generator", r.status_code == 200 and "certificate_id" in r.json())

    # 9. Audit router (/api/audit)
    r = client.get("/api/audit/ledger")
    assert_eq("Audit Ledger Listing", r.status_code == 200 and len(r.json()) > 0)

    r = client.post("/api/audit/verify")
    assert_eq("Audit Cryptographic SHA-256 Verification", r.status_code == 200 and r.json()["is_valid"] is True)

    # 10. Statutes router (/api/statutes, /api/calculator)
    r = client.get("/api/statutes?q=mrp")
    assert_eq("Statutes Clause Search", r.status_code == 200 and len(r.json()) > 0)

    r = client.post("/api/calculator/font-height", json={"area_sq_cm": 150.0, "packaging_type": "printed"})
    assert_eq("Schedule II Font Height Calculator", r.status_code == 200 and r.json()["min_height_mm"] == 2.0)

    # 11. Radar router (/api/radar)
    r = client.get("/api/radar/hotspots")
    assert_eq("Radar Hotspot Zones", r.status_code == 200 and len(r.json()["zones"]) == 5)

    r = client.post("/api/radar/deploy", json={"zone_id": "Z-01", "squad_name": "Unit 01"})
    assert_eq("Radar Squad Deployment", r.status_code == 200 and r.json()["status"] == "success")

    # 12. Search router (/api/search)
    r = client.get("/api/search?q=tea")
    assert_eq("Global Multi-Entity Search", r.status_code == 200 and r.json()["total_matches"] > 0)

    # 13. Notifications router (/api/notifications)
    r = client.get("/api/notifications")
    assert_eq("Notifications Feed", r.status_code == 200 and len(r.json()) >= 4)

    r = client.post("/api/notifications/mark-read", json={"mark_all": True})
    assert_eq("Notifications Mark Read", r.status_code == 200 and r.json()["status"] == "success")

    # 14. System router (/api/system)
    r = client.get("/api/system/health")
    assert_eq("System Telemetry Health", r.status_code == 200 and r.json()["ocr_latency_ms"] == 138)

    r = client.post("/api/system/diagnostics")
    assert_eq("System Diagnostics Suite", r.status_code == 200 and r.json()["overall_health"] == "PASSED")

    print("==================================================")
    print(f"   SUMMARY: {passed} PASSED, {failed} FAILED")
    print("==================================================")
    if failed > 0:
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
