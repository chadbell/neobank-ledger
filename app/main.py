from fastapi import FastAPI
from app.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Neobank Ledger")


@app.get("/health")
def health():
    return {"status": "ok"}
