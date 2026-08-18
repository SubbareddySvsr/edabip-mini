from .database import Base, engine
from .models import User, Invoice, STO, Transaction


def initialize_database():
    Base.metadata.create_all(bind=engine)

    print("EDABIP database tables created successfully.")


if __name__ == "__main__":
    initialize_database()