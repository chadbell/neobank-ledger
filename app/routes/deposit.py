from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Event, Transaction
from app.models.account import Account
from app.models.event import EventType
from app.models.transaction import TransactionType, TransactionStatus

router = APIRouter()

class DepositRequest(BaseModel):
    account_id: str
    amount: float

class DepositResponse(BaseModel):
    id: str
    transaction_type: TransactionType
    status: TransactionStatus
    amount: float
    destination_account_id: str

@router.post("/deposit", response_model=DepositResponse)
def create_deposit(req: DepositRequest, db: Session = Depends(get_db)):
    account = db.get(Account, req.account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    transaction = Transaction(
        transaction_type=TransactionType.DEPOSIT,
        status=TransactionStatus.PENDING,
        amount=req.amount,
        source_account_id=None,
        destination_account_id=account.id,
    )
    db.add(transaction)
    db.flush()  # populate transaction.id before event creation

    event = Event(
        event_type=EventType.DEPOSIT,
        amount=req.amount,
        account_id=account.id,
        transaction_id=transaction.id,
    )
    db.add(event)

    account.balance += req.amount

    db.commit()
    db.refresh(transaction)
    return transaction