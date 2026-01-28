from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.database import users_collection
from app.auth import get_password_hash, verify_password, create_access_token, get_current_user
from schemas.user import UserCreate, UserLogin, UserProfile, Token
from datetime import datetime
from pymongo.errors import DuplicateKeyError

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    user_dict = user.dict()
    user_dict["hashed_password"] = get_password_hash(user_dict.pop("password"))
    user_dict["created_at"] = datetime.utcnow()
    user_dict["updated_at"] = datetime.utcnow()
    
    try:
        await users_collection.insert_one(user_dict)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await users_collection.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    user = current_user.copy()
    user["id"] = str(user["_id"])
    del user["_id"]
    del user["hashed_password"]
    return user

@router.post("/profile")
async def update_profile(
    profile: UserProfile,
    current_user: dict = Depends(get_current_user)
):
    await users_collection.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"profile": profile.dict(), "updated_at": datetime.utcnow()}}
    )
    return {"message": "Profile updated successfully"}
