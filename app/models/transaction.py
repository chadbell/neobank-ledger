from enum import Enum

from sqlalchemy import Column, String, Float, DateTime, Enum as SQLEnum
from datetime import datetime, timezone
from app.database import Base

class TransactionType(str, Enum):
    DEPOSIT = "deposit"
    WITHDRAWAL = "withdrawal"
    TRANSFER = "transfer"

class TransactionStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True)
    source_account_id = Column(String, nullable=True)       # null for deposits
    destination_account_id = Column(String, nullable=True)   # null for withdrawals
    status = Column(SQLEnum(TransactionStatus), nullable=False, default=TransactionStatus.PENDING)
    transaction_type = Column(SQLEnum(TransactionType), nullable=False)
    amount = Column(Float, nullable=False)
    description = Column(String)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))


