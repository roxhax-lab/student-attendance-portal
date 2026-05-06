from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import supabase
from datetime import date
import traceback

router = APIRouter()

class LeaveRequest(BaseModel):
    student_id: str
    from_date: date
    to_date: date
    reason: str

class LeaveApproval(BaseModel):
    status: str  # "approved" or "rejected"

@router.post("/apply")
def apply_leave(request: LeaveRequest):
    try:
        response = supabase.table("leave_requests").insert({
            "student_id": request.student_id,
            "from_date": str(request.from_date),
            "to_date": str(request.to_date),
            "reason": request.reason,
            "status": "pending"
        }).execute()
        return {"message": "Leave request submitted", "data": response.data}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all")
def get_all_leaves():
    try:
        response = supabase.table("leave_requests").select("*").execute()
        return {"data": response.data}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/student/{student_id}")
def get_student_leaves(student_id: str):
    try:
        response = supabase.table("leave_requests").select("*").eq("student_id", student_id).execute()
        return {"data": response.data}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/approve/{leave_id}")
def approve_leave(leave_id: str, approval: LeaveApproval):
    try:
        response = supabase.table("leave_requests").update({
            "status": approval.status
        }).eq("id", leave_id).execute()
        return {"message": f"Leave {approval.status}", "data": response.data}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))