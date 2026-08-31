# ==============================================================================
# ROUTER 12: NOTIFICATIONS & REGULATORY ALERTS (/api/notifications)
# ==============================================================================

from fastapi import APIRouter
from backend.models import NotificationItem, NotificationMarkReadRequest
from backend.database import get_connection
from typing import List

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])

@router.get("", response_model=List[NotificationItem])
def get_notifications():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM notifications ORDER BY ROWID ASC;")
    rows = cursor.fetchall()
    conn.close()

    return [
        NotificationItem(
            id=r["id"],
            type=r["type"],
            title=r["title"],
            message=r["message"],
            time=r["time"],
            read=bool(r["read"]),
            target_path=r["target_path"],
            case_id=r["case_id"]
        ) for r in rows
    ]

@router.post("/mark-read")
def mark_notifications_read(req: NotificationMarkReadRequest):
    conn = get_connection()
    cursor = conn.cursor()

    if req.mark_all:
        cursor.execute("UPDATE notifications SET read = 1;")
    elif req.notification_id:
        cursor.execute("UPDATE notifications SET read = 1 WHERE id = ?;", (req.notification_id,))

    conn.commit()
    conn.close()
    return {"status": "success", "message": "Notification state updated."}
