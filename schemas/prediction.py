from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ScenarioInput(BaseModel):
    scenario_name: str
    education_choice: str
    career_path: str
    training_program: Optional[str] = None
    location_change: Optional[str] = None

class PredictionRequest(BaseModel):
    scenarios: List[ScenarioInput] = Field(..., min_items=1, max_items=5)

class ScenarioResult(BaseModel):
    scenario_name: str
    income_1_year: float
    income_3_years: float
    income_5_years: float
    employment_probability: float
    quality_of_life_score: float
    risk_score: float
    confidence_score: float

class PredictionResponse(BaseModel):
    simulation_id: str
    user_id: str
    created_at: datetime
    results: List[ScenarioResult]
    best_scenario: str
