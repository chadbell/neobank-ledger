from enum import Enum
from sqlalchemy import Column, String, Float, DateTime, Enum as SQLEnum
from datetime import datetime, timezone
from app.database import Base

class EventType(str, Enum):
    DEPOSIT = "deposit"
    WITHDRAWAL = "withdrawal"
    TRANSFER_IN = "transfer_in"
    TRANSFER_OUT = "transfer_out"

class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True)
    account_id = Column(String, nullable=False)
    transaction_id = Column(String, nullable=False)
    event_type = Column(SQLEnum(EventType), nullable=False)
    amount = Column(Float, nullable=False)
    description = Column(String)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

