from enum import Enum
from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class UserRole(str, Enum):
    GUEST = "GUEST"
    HOST = "HOST"
    ADMIN = "ADMIN"

class UserBase(SQLModel):
    __annotations__ = {
        "name": str,
        "email": str,
        "phone_number": str,
        "role": UserRole,
        "is_active": bool,
    }
    name: str = Field()
    email: str = Field(unique=True, index=True)
    phone_number: str = Field(description="Primary contact / M-Pesa tracking number")
    role: UserRole = Field(default=UserRole.GUEST)
    is_active: bool = Field(default=True)

class User(UserBase, table=True):
    __tablename__ = "users"
    __annotations__ = {
        "id": Optional[int],
        "hashed_password": str,
        "created_at": datetime,
    }
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str = Field()
    created_at: datetime = Field(default_factory=datetime.utcnow)

# --- Schemas for Auth Requests & Responses ---

class UserCreate(UserBase):
    password: str

class UserResponse(SQLModel):
    id: int
    name: str
    email: str
    phone_number: str
    role: UserRole
    is_active: bool
    created_at: datetime

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"