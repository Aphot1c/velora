
from database import SessionLocal
from models import Product

products = [
    {
        "name": "Chestnut Leather Derby",
        "description": "Premium handcrafted leather shoes",
        "category": "Footwear",
        "price": 286,
        "stock": 15
    },
    {
        "name": "Chalk Court Sneaker",
        "description": "Minimal everyday leather sneakers",
        "category": "Footwear",
        "price": 178,
        "stock": 0
    },
    {
        "name": "Classic Cotton Shirt",
        "description": "Comfortable premium cotton shirt",
        "category": "Clothing",
        "price": 65,
        "stock": 25
    },
    {
        "name": "Essential Hoodie",
        "description": "Soft relaxed-fit everyday hoodie",
        "category": "Clothing",
        "price": 89,
        "stock": 18
    },
    {
        "name": "Leather Crossbody Bag",
        "description": "Elegant everyday leather bag",
        "category": "Accessories",
        "price": 120,
        "stock": 10
    },
    {
        "name": "Minimal Wrist Watch",
        "description": "Modern minimalist wristwatch",
        "category": "Accessories",
        "price": 150,
        "stock": 12
    },
    {
        "name": "Wireless Headphones",
        "description": "Wireless headphones with clear sound",
        "category": "Electronics",
        "price": 99,
        "stock": 20
    },
    {
        "name": "Smart Bluetooth Speaker",
        "description": "Portable Bluetooth speaker",
        "category": "Electronics",
        "price": 75,
        "stock": 8
    }
]

db = SessionLocal()

try:
    added = 0

    for item in products:
        existing = db.query(Product).filter(
            Product.name == item["name"]
        ).first()

        if not existing:
            db.add(Product(**item))
            added += 1

    db.commit()
    print(f"Successfully added {added} new products!")

except Exception as error:
    db.rollback()
    print("Error adding products:", error)

finally:
    db.close()
