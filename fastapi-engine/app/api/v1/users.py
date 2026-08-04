from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.core.db import engine
from app.models.user import User

router = APIRouter()

# Dependency to yield a database session safely per request
def get_db():
    with Session(engine) as session:
        yield session

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user_data: dict, db: Session = Depends(get_db)):
    # 1. Check if the user already exists
    email = user_data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
        
    existing_user = db.exec(select(User).where(User.email == email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # 2. Build the database record (Using a mock placeholder password hashing approach for raw testing)
    new_user = User(
        name=user_data.get("name"),
        email=email,
        phone_number=user_data.get("phone_number"),
        hashed_password=f"hashed_{user_data.get('password', '1234')}"
    )
    
    # 3. Commit changes to PostgreSQL
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully", "user_id": new_user.id}

@router.get("/")
def list_users(db: Session = Depends(get_db)):
    users = db.exec(select(User)).all()
    # Safely unpack the data attributes dynamically to display them
    return [{"id": u.id, "name": u.name, "email": u.email, "phone_number": u.phone_number} for u in users]