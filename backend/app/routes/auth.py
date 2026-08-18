from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(request: LoginRequest):

    if request.email == "admin@example.com" and request.password == "admin123":
        return {
            "success": True,
            "message": "Login successful",
            "user": {
                "name": "Admin User",
                "email": request.email,
                "role": "Administrator"
            }
        }

    raise HTTPException(
        status_code=401,
        detail="Invalid email or password"
    )