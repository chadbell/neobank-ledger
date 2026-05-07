import uuid
from enum import Enum

from sqlalchemy import Column, String, Float, DateTime, Enum as SQLEnum, ForeignKey
from datetime import datetime, timezone

from sqlalchemy.orm import relationship

from app.database import Base

class TransactionType(str, Enum):
    DEPOSIT = "deposit"
    WITHDRAWAL = "withdrawal"
    TRANSFER = "transfer"

class TransactionStatus(str, Enum):
    PENDING = "pending"            # transaction created, not yet verified. Fraud check and balance check haven't run yet.
    AUTHORIZED = "authorized"      # funds reserved. The money is earmarked but hasn't moved. Card networks hold it here for 1-3 days.
    SETTLED = "settled"            # money actually moved. Funds transferred from source to destination.
    RECONCILED = "reconciled"      # both sides of the ledger match. Accounting is clean.
    FAILED = "failed"              # A transaction can fail at any stage — fraud check, insufficient funds, network timeout.

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, default=lambda: str(uuid.uuid4()), primary_key=True)
    status = Column(SQLEnum(TransactionStatus), nullable=False, default=TransactionStatus.PENDING)
    transaction_type = Column(SQLEnum(TransactionType), nullable=False)
    amount = Column(Float, nullable=False)
    description = Column(String)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    source_account_id = Column(String, ForeignKey("accounts.id"), nullable=True)      # null for deposits
    destination_account_id = Column(String, ForeignKey("accounts.id"), nullable=True)  # null for withdrawals
    source_account = relationship("Account", back_populates="source_transactions", foreign_keys=[source_account_id])
    destination_account = relationship("Account", back_populates="destination_transactions", foreign_keys=[destination_account_id])
    events = relationship("Event", back_populates="transaction")


