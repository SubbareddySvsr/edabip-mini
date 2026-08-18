from fastapi import APIRouter

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


@router.get("")
def get_users():
    return {
        "total_users": 5,
        "active_users": 4,
        "inactive_users": 1,
        "users": [
            {
                "user_id": "USR-1001",
                "name": "Rahul Sharma",
                "email": "rahul.sharma@example.com",
                "role": "Administrator",
                "status": "Active"
            },
            {
                "user_id": "USR-1002",
                "name": "Priya Kumar",
                "email": "priya.kumar@example.com",
                "role": "Business Analyst",
                "status": "Active"
            },
            {
                "user_id": "USR-1003",
                "name": "Arun Reddy",
                "email": "arun.reddy@example.com",
                "role": "Data Analyst",
                "status": "Active"
            },
            {
                "user_id": "USR-1004",
                "name": "Sneha Patel",
                "email": "sneha.patel@example.com",
                "role": "Manager",
                "status": "Active"
            },
            {
                "user_id": "USR-1005",
                "name": "Vikram Singh",
                "email": "vikram.singh@example.com",
                "role": "Viewer",
                "status": "Inactive"
            }
        ]
    }