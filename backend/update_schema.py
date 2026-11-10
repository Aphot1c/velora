
from database import engine
from sqlalchemy import text

with engine.begin() as connection:
    connection.execute(text("""
        ALTER TABLE products
        ADD COLUMN IF NOT EXISTS material VARCHAR(150)
    """))

    connection.execute(text("""
        ALTER TABLE products
        ADD COLUMN IF NOT EXISTS origin VARCHAR(150)
    """))

    connection.execute(text("""
        ALTER TABLE products
        ADD COLUMN IF NOT EXISTS image VARCHAR(500)
    """))

print("Product table updated successfully!")
