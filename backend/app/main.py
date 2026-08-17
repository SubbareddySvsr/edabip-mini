from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="EDABIP Mini API",
    description="Mini Enterprise Data Analytics and Business Intelligence Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
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


@app.get("/api/dashboard")
def dashboard():
    return {
        "total_sales": 100000,
        "total_orders": 250,
        "active_users": 120
    }