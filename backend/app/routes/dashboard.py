from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, Invoice, Transaction

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
)


@router.get("")
def dashboard(db: Session = Depends(get_db)):
    total_sales = (
        db.query(func.coalesce(func.sum(Invoice.amount), 0))
        .scalar()
    )

    total_orders = (
        db.query(func.count(Transaction.id))
        .scalar()
    )

    active_users = (
        db.query(func.count(User.id))
        .filter(User.status == "active")
        .scalar()
    )

    return {
        "total_sales": float(total_sales),
        "total_orders": total_orders,
        "active_users": active_users,
    }