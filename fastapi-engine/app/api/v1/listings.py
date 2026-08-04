from typing import Optional, List
from fastapi import APIRouter, Depends, Query, status
from sqlmodel import Session, select
from app.core.db import engine
from app.models.listing import Listing, ListingBase

router = APIRouter()

def get_db():
    with Session(engine) as session:
        yield session

@router.post("/", response_model=Listing, status_code=status.HTTP_201_CREATED)
def create_listing(listing_data: ListingBase, db: Session = Depends(get_db)):
    new_listing = Listing.model_validate(listing_data)
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    return new_listing

@router.get("/", response_model=List[Listing])
def list_listings(
    location: Optional[str] = Query(None, description="Filter by neighborhood"),
    min_price: Optional[float] = Query(None, description="Minimum price per night"),
    max_price: Optional[float] = Query(None, description="Maximum price per night"),
    has_ac: Optional[bool] = Query(None, description="Filter by AC requirement"),
    has_pool: Optional[bool] = Query(None, description="Filter by Pool requirement"),
    db: Session = Depends(get_db)
):
    query = select(Listing)
    if location:
        query = query.where(Listing.location.ilike(f"%{location}%"))
    if min_price is not None:
        query = query.where(Listing.price_per_night >= min_price)
    if max_price is not None:
        query = query.where(Listing.price_per_night <= max_price)
    if has_ac is not None:
        query = query.where(Listing.has_ac == has_ac)
    if has_pool is not None:
        query = query.where(Listing.has_pool == has_pool)
        
    return db.exec(query).all()