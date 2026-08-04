from typing import Optional
from sqlmodel import SQLModel, Field

class ListingBase(SQLModel):
    __annotations__ = {
        "title": str,
        "location": str,
        "description": str,
        "price_per_night": float,
        "rating": float,
        "reviews_count": int,
        "image_url": str,
        "is_mpesa_safe": bool,
        "has_ac": bool,
        "has_pool": bool,
    }
    title: str = Field(description="Property title")
    location: str = Field(description="Neighborhood e.g., Nyali, Bamburi, Shanzu")
    description: str = Field(default="")
    price_per_night: float = Field(description="Price per night in KSh")
    rating: float = Field(default=4.8)
    reviews_count: int = Field(default=0)
    image_url: str = Field(description="Cover image URL")
    is_mpesa_safe: bool = Field(default=True)
    has_ac: bool = Field(default=False)
    has_pool: bool = Field(default=False)

class Listing(ListingBase, table=True):
    __tablename__ = "listings"
    __annotations__ = {
        "id": Optional[int],
        "host_id": Optional[int],
    }
    id: Optional[int] = Field(default=None, primary_key=True)
    host_id: Optional[int] = Field(default=None, foreign_key="users.id")