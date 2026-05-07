from fastapi import FastAPI
from app.database import engine, Base
from app.routes.accounts import router as accounts_router
from app.routes.deposit import router as deposit_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Neobank Ledger")
app.include_router(accounts_router)
app.include_router(deposit_router)


@app.get("/health")
def health():
    return {"status": "ok"}
