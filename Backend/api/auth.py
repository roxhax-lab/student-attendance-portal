from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import supabase
from passlib.context import CryptContext
import traceback

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class RegisterUser(BaseModel):
    name: str
    email: str
    password: str
    role: str

class LoginUser(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(user: RegisterUser):
    try:
        hashed_password = pwd_context.hash(user.password)
        response = supabase.table("users").insert({
            "name": user.name,
            "email": user.email,
            "password": hashed_password,
            "role": user.role
        }).execute()
        return {"message": "User registered successfully", "data": response.data}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
def login(user: LoginUser):
    try:
        response = supabase.table("users").select("*").eq("email", user.email).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found")
        db_user = response.data[0]
        if not pwd_context.verify(user.password, db_user["password"]):
            raise HTTPException(status_code=401, detail="Invalid password")
        return {"message": "Login successful", "role": db_user["role"], "name": db_user["name"], "id": db_user["id"]}
    except HTTPException:
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/students")
def get_students():
    try:
        response = supabase.table("users").select("*").eq("role", "student").execute()
        return {"data": response.data}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))