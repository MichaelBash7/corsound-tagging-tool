import uvicorn
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import os

SQLALCHEMY_DATABASE_URL = f"postgresql://{os.environ.get('POSTGRES_USER')}:{os.environ.get('POSTGRES_PASSWORD')}@{os.environ.get('POSTGRES_HOST')}/{os.environ.get('POSTGRES_DB')}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)


Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app = FastAPI()


class UserSchema(BaseModel):
    name: str = None
    email: str
    password: str

    class Config:
        orm_mode = True


@app.post("/user/", response_model=UserSchema)
async def create_user(user: UserSchema, db: Session = Depends(get_db)):
    _user = UserModel(
        name=user.name, email=user.email, password=user.password
    )
    db.add(_user)
    db.commit()
    db.refresh(_user)
    return _user


@app.get("/user/", response_model=UserSchema)
async def get_user(email: str, db: Session = Depends(get_db)):
    _user = db.query(UserModel).filter_by(email=email).first()
    return _user


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
