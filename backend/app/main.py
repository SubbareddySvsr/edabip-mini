from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, billing, dashboard, stos, transactions, reports, users

app = FastAPI(
    title="EDABIP Mini API",
    description="Mini Enterprise Data Analytics and Business Intelligence Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://15.206.178.116",
        "http://43.205.99.104",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Welcome to EDABIP Mini Project"
    }


@app.get("/health")
def health():
    return {
        "status": "UP"
    }


app.include_router(auth.router)
app.include_router(billing.router)
app.include_router(dashboard.router)
app.include_router(stos.router)
app.include_router(transactions.router)
app.include_router(reports.router)
app.include_router(users.router)