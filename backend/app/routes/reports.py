from fastapi import APIRouter

router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"]
)


@router.get("")
def get_reports():
    return {
        "sales_report": {
            "total_sales": 100000,
            "monthly_sales": [
                {
                    "month": "January",
                    "sales": 15000
                },
                {
                    "month": "February",
                    "sales": 18000
                },
                {
                    "month": "March",
                    "sales": 22000
                },
                {
                    "month": "April",
                    "sales": 20000
                },
                {
                    "month": "May",
                    "sales": 25000
                }
            ]
        },
        "orders_report": {
            "total_orders": 250,
            "completed_orders": 210,
            "pending_orders": 25,
            "cancelled_orders": 15
        },
        "user_report": {
            "total_users": 120,
            "active_users": 95,
            "inactive_users": 25
        },
        "summary": {
            "sales_growth": "12.5%",
            "order_growth": "8.2%",
            "user_growth": "15.4%"
        }
    }