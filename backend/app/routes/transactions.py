from fastapi import APIRouter

router = APIRouter(
    prefix="/api/transactions",
    tags=["Transactions"]
)


@router.get("")
def get_transactions():
    return {
        "total_transactions": 5,
        "successful_transactions": 4,
        "failed_transactions": 1,
        "total_transaction_value": 185000,
        "currency": "INR",
        "transactions": [
            {
                "transaction_id": "TXN-1001",
                "customer": "ABC Corporation",
                "amount": 45000,
                "type": "Purchase",
                "status": "Success"
            },
            {
                "transaction_id": "TXN-1002",
                "customer": "XYZ Technologies",
                "amount": 30000,
                "type": "Payment",
                "status": "Success"
            },
            {
                "transaction_id": "TXN-1003",
                "customer": "Global Analytics Ltd",
                "amount": 55000,
                "type": "Purchase",
                "status": "Success"
            },
            {
                "transaction_id": "TXN-1004",
                "customer": "Enterprise Solutions",
                "amount": 25000,
                "type": "Payment",
                "status": "Failed"
            },
            {
                "transaction_id": "TXN-1005",
                "customer": "ABC Corporation",
                "amount": 30000,
                "type": "Refund",
                "status": "Success"
            }
        ]
    }