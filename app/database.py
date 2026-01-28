from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DATABASE_NAME = os.getenv("DATABASE_NAME", "parallel_life_db")

client = AsyncIOMotorClient(MONGODB_URI)
database = client[DATABASE_NAME]

users_collection = database.get_collection("users")
simulations_collection = database.get_collection("simulations")
feedback_collection = database.get_collection("feedback")

async def create_indexes():
    """Create database indexes"""
    await users_collection.create_index("email", unique=True)
    await simulations_collection.create_index("user_id")
    await feedback_collection.create_index("simulation_id")
    print("✅ Database indexes created")
