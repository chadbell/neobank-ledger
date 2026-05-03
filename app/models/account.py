import uuid
from enum import Enum
from sqlalchemy import Column, String, Float, Enum as SQLEnum
from sqlalchemy.orm import relationship

from app.database import Base

class AccountType(str, Enum):
    CONSUMER = "consumer"
    MERCHANT = "merchant"
    EXTERNAL = "external"

class Account(Base):
    __tablename__ = "accounts"

    id = Column(String, default=lambda: str(uuid.uuid4()), primary_key=True)
    owner_name = Column(String, nullable=False)
    account_type = Column(SQLEnum(AccountType), nullable=False)
    balance = Column(Float, default=0.0)
    events = relationship("Event", back_populates="account")
    source_transactions = relationship("Transaction", back_populates="source_account", foreign_keys="Transaction.source_account_id")
    destination_transactions = relationship("Transaction", back_populates="destination_account", foreign_keys="Transaction.destination_account_id")