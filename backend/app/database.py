import json
import os

import boto3
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")

SECRET_ARN = os.getenv(
    "RDS_SECRET_ARN",
    "arn:aws:secretsmanager:ap-south-1:312920516006:secret:rds!db-8eb13df2-5d5d-467f-b28c-5c1cab606a06-bKUjnr",
)

DB_HOST = os.getenv(
    "DB_HOST",
    "edabip-mysql-prod.cv4gyseu2kdd.ap-south-1.rds.amazonaws.com",
)

DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "edabip")


def get_database_credentials():
    client = boto3.client(
        "secretsmanager",
        region_name=AWS_REGION,
    )

    response = client.get_secret_value(
        SecretId=SECRET_ARN
    )

    secret_string = response["SecretString"]

    return json.loads(secret_string)


credentials = get_database_credentials()

DB_USER = credentials["username"]
DB_PASSWORD = credentials["password"]

DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=1800,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()