from enum import Enum
from datetime import date, datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class BookingStatus(str, Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    CANCELLED = "CANCELLED"

class BookingBase(SQLModel):
    listing_id: int = Field(foreign_key="listings.id")
    check_in: date
    check_out: date
    total_guests: int = Field(default=1)
    total_price: float
    status: BookingStatus = Field(default=BookingStatus.PENDING)

class Booking(BookingBase, table=True):
    __tablename__ = "bookings"
    id: Optional[int] = Field(default=None, primary_key=True)
    guest_id: int = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BookingCreate(SQLModel):
    listing_id: int
    check_in: date
    check_out: date
    total_guests: int

class BookingResponse(BookingBase):
    id: int
    guest_id: int
    created_at: datetime