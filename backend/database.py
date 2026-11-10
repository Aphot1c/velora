
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
# Load environment variables from backend/.env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgres://",
        "postgresql+psycopg://",
        1
    )

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is missing from .env")

# Connect to PostgreSQL
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def test_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version()"))
            print("Connected to PostgreSQL successfully!")
            print(result.fetchone()[0])

    except Exception as error:
        print("Database connection failed!")
        print(error)


if __name__ == "__main__":
    test_connection()
