
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base
from fastapi import Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Product

app = FastAPI(title="Velora API")

# Allow our React frontend to communicate with Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Velora API!",
        "status": "running"
    }

@app.get("/health")
def health():
    try:
        with engine.connect() as connection:
            return {
                "status": "healthy",
                "database": "connected"
            }
    except Exception:
        return {
            "status": "unhealthy",
            "database": "disconnected"
        }

# Database session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



# Get all products from PostgreSQL
@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()

    return [
        {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "price": product.price,
            "stock": product.stock,
            "material": product.material or "Quality materials",
            "origin": product.origin or "Velora Collection",
            "image": product.image or ""
        }
        for product in products
    ]
