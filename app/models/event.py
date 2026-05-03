import uuid
from enum import Enum
from sqlalchemy import Column, String, Float, DateTime, Enum as SQLEnum, ForeignKey
from datetime import datetime, timezone

from sqlalchemy.orm import relationship

from app.database import Base

class EventType(str, Enum):
    DEPOSIT = "deposit"
    WITHDRAWAL = "withdrawal"
    TRANSFER_IN = "transfer_in"
    TRANSFER_OUT = "transfer_out"

class Event(Base):
    __tablename__ = "events"

    id = Column(String, default=lambda: str(uuid.uuid4()), primary_key=True)
    event_type = Column(SQLEnum(EventType), nullable=False)
    amount = Column(Float, nullable=False)
    description = Column(String)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    account_id = Column(String, ForeignKey("accounts.id"), nullable=False)
    transaction_id = Column(String, ForeignKey("transactions.id"), nullable=False)
    account = relationship("Account", back_populates="events", foreign_keys=[account_id])
    transaction = relationship("Transaction", back_populates="events", foreign_keys=[transaction_id])


