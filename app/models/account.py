from enum import Enum
from sqlalchemy import Column, String, Float, Enum as SQLEnum
from app.database import Base

class AccountType(str, Enum):
    CONSUMER = "consumer"
    MERCHANT = "merchant"

class Account(Base):
    __tablename__ = "accounts"

    id = Column(String, primary_key=True)
    owner_name = Column(String, nullable=False)
    account_type = Column(SQLEnum(AccountType), nullable=False)
    balance = Column(Float, default=0.0)