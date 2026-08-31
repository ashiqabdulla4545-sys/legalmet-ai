# ==============================================================================
# ROUTER 11: GLOBAL INTELLIGENCE SEARCH (/api/search)
# ==============================================================================

from fastapi import APIRouter, Query
from backend.models import CaseResponse
from backend.database import get_connection
from typing import List, Optional, Dict, Any

router = APIRouter(prefix="/api/search", tags=["Global Search"])

@router.get("")
def search_global_entities(
    q: Optional[str] = Query(default="", description="Search query string"),
    filter_type: Optional[str] = Query(default="all", description="Filter category")
):
    conn = get_connection()
    cursor = conn.cursor()

    query_str = f"%{q}%"
    cursor.execute("""
    SELECT * FROM cases 
    WHERE (id LIKE ? OR title LIKE ? OR manufacturer LIKE ? OR summary LIKE ? OR commodity LIKE ? OR batch_no LIKE ?)
    ORDER BY risk_score DESC;
    """, (query_str, query_str, query_str, query_str, query_str, query_str))
    
    rows = cursor.fetchall()
    conn.close()

    results = []
    for r in rows:
        c_status = r["status"]
        if filter_type == "violations" and c_status != "VIOLATION":
            continue

        results.append({
            "id": r["id"],
            "title": r["title"],
            "commodity": r["commodity"],
            "manufacturer": r["manufacturer"],
            "batch_no": r["batch_no"],
            "declared_net_qty": r["declared_net_qty"],
            "declared_mrp": r["declared_mrp"],
            "unit_sale_price": r["unit_sale_price"],
            "status": c_status,
            "risk_score": r["risk_score"],
            "summary": r["summary"],
            "image": r["image"],
            "date_intake": r["date_intake"]
        })

    return {
        "query": q,
        "filter": filter_type,
        "total_matches": len(results),
        "results": results
    }
