from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, or_, and_
from typing import List

from app.core.db import engine
from app.models.booking import Booking, BookingCreate, BookingResponse, BookingStatus
from app.models.listing import Listing
from app.models.user import User
from app.api.deps import get_current_user

router = APIRouter()

def get_db():
    with Session(engine) as session:
        yield session

@router.post("/", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(
    booking_in: BookingCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 1. Verify listing exists
    listing = db.get(Listing, booking_in.listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    # 2. Check for overlapping confirmed or pending bookings
    overlap_query = select(Booking).where(
        Booking.listing_id == booking_in.listing_id,
        Booking.status != BookingStatus.CANCELLED,
        and_(
            Booking.check_in < booking_in.check_out,
            Booking.check_out > booking_in.check_in
        )
    )
    existing_booking = db.exec(overlap_query).first()
    if existing_booking:
        raise HTTPException(
            status_code=400,
            detail="The selected property is not available for these dates."
        )

    # 3. Calculate total price
    nights = (booking_in.check_out - booking_in.check_in).days
    if nights <= 0:
        raise HTTPException(status_code=400, detail="Check-out date must be after check-in date.")

    calculated_total = nights * listing.price_per_night

    # 4. Save reservation
    db_booking = Booking(
        listing_id=booking_in.listing_id,
        guest_id=current_user.id,
        check_in=booking_in.check_in,
        check_out=booking_in.check_out,
        total_guests=booking_in.total_guests,
        total_price=calculated_total,
        status=BookingStatus.PENDING
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.get("/me", response_model=List[BookingResponse])
def get_user_bookings(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    statement = select(Booking).where(Booking.guest_id == current_user.id)
    return db.exec(statement).all()