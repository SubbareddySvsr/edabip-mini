from fastapi import APIRouter

router = APIRouter(
    prefix="/api/billing",
    tags=["Billing"]
)


@router.get("")
def get_billing():
    return {
        "total_billed": 250000,
        "paid_amount": 180000,
        "pending_amount": 70000,
        "currency": "INR",
        "invoices": [
            {
                "invoice_id": "INV-1001",
                "customer": "ABC Corporation",
                "amount": 50000,
                "status": "Paid"
            },
            {
                "invoice_id": "INV-1002",
                "customer": "XYZ Technologies",
                "amount": 70000,
                "status": "Pending"
            },
            {
                "invoice_id": "INV-1003",
                "customer": "Global Analytics Ltd",
                "amount": 60000,
                "status": "Paid"
            },
            {
                "invoice_id": "INV-1004",
                "customer": "Enterprise Solutions",
                "amount": 70000,
                "status": "Pending"
            }
        ]
    }