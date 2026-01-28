from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfile(BaseModel):
    age: int = Field(..., ge=18, le=100)
    education_level: str
    field_of_study: Optional[str] = None
    current_status: str
    industry: Optional[str] = None
    location_type: str
    state: str
    years_experience: int = Field(default=0, ge=0)
    current_income: Optional[int] = Field(default=0, ge=0)
    skills: List[str] = []
    certifications: int = Field(default=0, ge=0)

class Token(BaseModel):
    access_token: str
    token_type: str
