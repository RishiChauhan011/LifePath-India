from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_indexes
from routes import auth, prediction, users
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Parallel Life Simulator API",
    description="API for simulating multiple life scenarios",
    version="1.0.0"
)

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(prediction.router)
app.include_router(users.router)

@app.on_event("startup")
async def startup_event():
    await create_indexes()
    print("✅ API server started")

@app.get("/")
async def root():
    return {
        "message": "Parallel Life Simulator API",
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
