from fastapi import APIRouter, Depends, HTTPException, status
from app.database import simulations_collection, feedback_collection, users_collection
from app.auth import get_current_user
from schemas.prediction import PredictionRequest, PredictionResponse
from utils.ml_predictor import MLPredictor
from datetime import datetime
import uuid

router = APIRouter(
    prefix="/api/predictions",
    tags=["Predictions"]
)

# Initialize predictor singleton (or dependency)
predictor = MLPredictor()

@router.post("/simulate", response_model=PredictionResponse)
async def run_simulation(
    request: PredictionRequest,
    current_user: dict = Depends(get_current_user)
):
    if "profile" not in current_user:
        raise HTTPException(status_code=400, detail="User profile not set. Please update profile first.")
    
    user_profile = current_user["profile"]
    
    try:
        results, best_scenario = predictor.predict_multiple_scenarios(user_profile, [s.dict() for s in request.scenarios])
    except Exception as e:
        print(f"Prediction Error: {e}")
        raise HTTPException(status_code=500, detail="Prediction failed")

    simulation_data = {
        "user_id": str(current_user["_id"]),
        "created_at": datetime.utcnow(),
        "user_profile": user_profile,
        "scenarios": [s.dict() for s in request.scenarios],
        "results": results,
        "best_scenario": best_scenario,
        "simulation_id": str(uuid.uuid4())
    }
    
    await simulations_collection.insert_one(simulation_data)
    
    # Clean up for response
    response_data = simulation_data.copy()
    del response_data["_id"]
    return response_data

@router.get("/history")
async def get_history(
    limit: int = 20,
    offset: int = 0,
    current_user: dict = Depends(get_current_user)
):
    cursor = simulations_collection.find({"user_id": str(current_user["_id"])}).sort("created_at", -1).skip(offset).limit(limit)
    history = []
    async for doc in cursor:
        doc["simulation_id"] = doc.get("simulation_id", str(doc["_id"])) # Fallback if missing
        doc["scenarios_count"] = len(doc.get("scenarios", []))
        # Minimal data for list view
        history.append({
            "simulation_id": doc["simulation_id"],
            "created_at": doc["created_at"],
            "scenarios_count": doc["scenarios_count"],
            "best_scenario": doc.get("best_scenario")
        })
    return history

@router.get("/{simulation_id}")
async def get_simulation(
    simulation_id: str,
    current_user: dict = Depends(get_current_user)
):
    sim = await simulations_collection.find_one({
        "simulation_id": simulation_id,
        "user_id": str(current_user["_id"])
    })
    
    if not sim:
        # Try searching by ObjectId just in case
        try:
            from bson import ObjectId
            sim = await simulations_collection.find_one({
                "_id": ObjectId(simulation_id),
                "user_id": str(current_user["_id"])
            })
        except:
            pass
            
    if not sim:
        raise HTTPException(status_code=404, detail="Simulation not found")
        
    sim["simulation_id"] = sim.get("simulation_id", str(sim.get("_id")))
    if "_id" in sim: del sim["_id"]
    return sim

@router.post("/feedback")
async def submit_feedback(
    feedback: dict,
    current_user: dict = Depends(get_current_user)
):
    feedback_entry = {
        "user_id": str(current_user["_id"]),
        "simulation_id": feedback.get("simulation_id"),
        "actual_outcome": feedback.get("actual_outcome"),
        "submitted_at": datetime.utcnow()
    }
    await feedback_collection.insert_one(feedback_entry)
    return {"message": "Feedback submitted successfully"}
