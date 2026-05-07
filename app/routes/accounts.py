from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.account import Account, AccountType

router = APIRouter()


class CreateAccountRequest(BaseModel):
    owner_name: str
    account_type: AccountType

class UpdateAccountRequest(BaseModel):
    id: str
    owner_name: str
    account_type: AccountType
    balance: float

class AccountResponse(BaseModel):
    id: str
    owner_name: str
    account_type: AccountType
    balance: float


@router.post("/accounts", response_model=AccountResponse)
def create_account(req: CreateAccountRequest, db: Session = Depends(get_db)):
    account = Account(
        owner_name=req.owner_name,
        account_type=req.account_type,
    )
    db.add(account)
    db.commit()
    db.refresh(account)
    return account

@router.get("/accounts/{account_id}", response_model=AccountResponse)
def get_account(account_id: str, db: Session = Depends(get_db)):
    account = db.get(Account, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    return account

@router.put("/accounts", response_model=AccountResponse)
def update_account(req: UpdateAccountRequest, db: Session = Depends(get_db)):
    account = db.get(Account, req.id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    account.owner_name = req.owner_name
    account.account_type = req.account_type
    account.balance = req.balance

    db.commit()
    db.refresh(account)
    return account

