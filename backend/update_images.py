
from database import SessionLocal
from models import Product

db = SessionLocal()

images = {
    "Chestnut Leather Derby": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80",
    "Chalk Court Sneaker": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    "Classic Cotton Shirt": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    "Essential Hoodie": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    "Leather Crossbody Bag": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    "Minimal Wrist Watch": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
    "Wireless Headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    "Smart Bluetooth Speaker": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80"
}

try:
    for name, image_url in images.items():
        product = db.query(Product).filter(Product.name == name).first()

        if product:
            product.image = image_url
            print(f"Updated image: {name}")
        else:
            print(f"Product not found: {name}")

    db.commit()
    print("All product images updated successfully!")

except Exception as error:
    db.rollback()
    print("Error:", error)

finally:
    db.close()
