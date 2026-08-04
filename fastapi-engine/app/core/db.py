import os
from sqlmodel import SQLModel, create_engine, Session

# Added +psycopg to force SQLAlchemy to use Psycopg v3
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql+psycopg://postgres:suby2020@localhost:5432/pwanystay_db"
)

# Active relational connection pool engine
engine = create_engine(DATABASE_URL, echo=True)

# Dependency helper to feed database sessions cleanly to your API endpoints
def get_db_session():
    with Session(engine) as session:
        yield session

# Reads Python SQLModel code registries and physically builds the tables in Postgres
def init_db():
    SQLModel.metadata.create_all(engine)