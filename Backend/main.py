from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import auth, attendance, leave

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])
app.include_router(leave.router, prefix="/leave", tags=["Leave"])

@app.get("/")
def root():
    return {"message": "Student Attendance Portal API is running!"}