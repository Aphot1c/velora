
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    DateTime
)
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()


# 1. Products table
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(String(500))
    category = Column(String(100))
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)

    # Additional storefront fields
    material = Column(String(150))
    origin = Column(String(150))
    image = Column(String(500))


# 2. Customers table
class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    email = Column(String(150), unique=True, nullable=False)


# 3. Carts table
class Cart(Base):
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )


# 4. Orders table
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )
    total_amount = Column(Float, nullable=False)
    status = Column(String(50), default="placed")
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
