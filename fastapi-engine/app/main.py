from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.db import init_db
from app.models.user import User  # Registers user table metadata
from app.models.listing import Listing  # Registers listing table metadata
from app.models.booking import Booking  # Registers booking table metadata
from app.api.v1.users import router as users_router
from app.api.v1.auth import router as auth_router
from app.api.v1.listings import router as listings_router
from app.api.v1.bookings import router as bookings_router

app = FastAPI(title="PwanyStay API Engine")

# 1. Enable CORS for Next.js frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    print("Initializing PwanyStay Database Connection...")
    init_db()
    print("PostgreSQL Tables verified and compiled successfully!")

# 2. Register modular API routers
app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(listings_router, prefix="/api/v1/listings", tags=["Listings"])
app.include_router(bookings_router, prefix="/api/v1/bookings", tags=["Bookings"])

@app.get("/")
def read_root():
    return {"status": "PwanyStay Engine Operational"}