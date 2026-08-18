from sqlalchemy import Column, Integer, String, Numeric

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(50), unique=True, nullable=False)
    name = Column(String(150), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    role = Column(String(100), nullable=False)
    status = Column(String(30), nullable=False)


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    invoice_id = Column(String(50), unique=True, nullable=False)
    customer = Column(String(150), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    status = Column(String(30), nullable=False)


class STO(Base):
    __tablename__ = "stos"

    id = Column(Integer, primary_key=True, index=True)
    sto_id = Column(String(50), unique=True, nullable=False)
    source = Column(String(150), nullable=False)
    destination = Column(String(150), nullable=False)
    quantity = Column(Integer, nullable=False)
    status = Column(String(50), nullable=False)


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(String(50), unique=True, nullable=False)
    customer = Column(String(150), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    type = Column(String(50), nullable=False)
    status = Column(String(30), nullable=False)