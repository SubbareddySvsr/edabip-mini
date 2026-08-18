from fastapi import APIRouter

router = APIRouter(
    prefix="/api/stos",
    tags=["STO Management"]
)


@router.get("")
def get_stos():
    return {
        "total_stos": 4,
        "active_stos": 3,
        "completed_stos": 1,
        "stos": [
            {
                "sto_id": "STO-1001",
                "source": "Chennai Warehouse",
                "destination": "Bangalore Warehouse",
                "quantity": 120,
                "status": "In Transit"
            },
            {
                "sto_id": "STO-1002",
                "source": "Hyderabad Warehouse",
                "destination": "Mumbai Warehouse",
                "quantity": 80,
                "status": "Completed"
            },
            {
                "sto_id": "STO-1003",
                "source": "Delhi Warehouse",
                "destination": "Pune Warehouse",
                "quantity": 150,
                "status": "Processing"
            },
            {
                "sto_id": "STO-1004",
                "source": "Kolkata Warehouse",
                "destination": "Chennai Warehouse",
                "quantity": 95,
                "status": "In Transit"
            }
        ]
    }