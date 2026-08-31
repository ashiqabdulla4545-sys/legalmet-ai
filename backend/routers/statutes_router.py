# ==============================================================================
# ROUTER 9: REGULATORY LIBRARY & FONT CALCULATOR (/api/statutes, /api/calculator)
# ==============================================================================

from fastapi import APIRouter, Query
from backend.models import Statute, StatuteSection, FontCalculatorRequest, FontCalculatorResponse
from backend.database import get_connection
from typing import List, Optional

router = APIRouter(tags=["Regulatory Library & Calculator"])

@router.get("/api/statutes", response_model=List[Statute])
def get_statutes(q: Optional[str] = None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM statutes;")
    stat_rows = cursor.fetchall()

    result = []
    for s in stat_rows:
        cursor.execute("SELECT sec, title, summary FROM statute_sections WHERE statute_id = ?;", (s["id"],))
        sec_rows = cursor.fetchall()
        
        sections = []
        for sec in sec_rows:
            if q:
                query_low = q.lower()
                if (query_low in sec["sec"].lower() or 
                    query_low in sec["title"].lower() or 
                    query_low in sec["summary"].lower()):
                    sections.append(StatuteSection(sec=sec["sec"], title=sec["title"], summary=sec["summary"]))
            else:
                sections.append(StatuteSection(sec=sec["sec"], title=sec["title"], summary=sec["summary"]))

        if sections or not q:
            result.append(Statute(
                id=s["id"],
                name=s["name"],
                act_no=s["act_no"],
                enacted=s["enacted"],
                sections=sections
            ))

    conn.close()
    return result

@router.post("/api/calculator/font-height", response_model=FontCalculatorResponse)
def calculate_schedule_ii_font_height(req: FontCalculatorRequest):
    area = req.area_sq_cm
    ptype = req.packaging_type.lower()

    if area <= 50:
        min_mm = 1.0 if ptype == "printed" else 2.0
    elif area <= 200:
        min_mm = 2.0 if ptype == "printed" else 4.0
    elif area <= 1000:
        min_mm = 4.0 if ptype == "printed" else 6.0
    else:
        min_mm = 6.0

    return FontCalculatorResponse(
        area_sq_cm=area,
        packaging_type=ptype,
        min_height_mm=min_mm,
        schedule_reference="Schedule II, Table 1 - Legal Metrology (Packaged Commodities) Rules, 2011",
        description=f"Mandatory minimum numeral/letter height is {min_mm:.1f} mm for Principal Display Panel area {area} cm²."
    )
