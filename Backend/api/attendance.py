from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import supabase
from datetime import date
import traceback

router = APIRouter()

class AttendanceRecord(BaseModel):
    student_id: str
    date: date
    status: str  # "present" or "absent"
    subject: str

@router.post("/mark")
def mark_attendance(record: AttendanceRecord):
    try:
        response = supabase.table("attendance").insert({
            "student_id": record.student_id,
            "date": str(record.date),
            "status": record.status,
            "subject": record.subject
        }).execute()
        return {"message": "Attendance marked successfully", "data": response.data}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/student/{student_id}")
def get_student_attendance(student_id: str):
    try:
        response = supabase.table("attendance").select("*").eq("student_id", student_id).execute()
        return {"data": response.data}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/report/{student_id}")
def get_attendance_report(student_id: str):
    try:
        response = supabase.table("attendance").select("*").eq("student_id", student_id).execute()
        records = response.data
        total = len(records)
        present = len([r for r in records if r["status"] == "present"])
        absent = total - present
        percentage = (present / total * 100) if total > 0 else 0
        shortage = percentage < 75
        return {
            "total_classes": total,
            "present": present,
            "absent": absent,
            "percentage": round(percentage, 2),
            "shortage_alert": shortage
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))