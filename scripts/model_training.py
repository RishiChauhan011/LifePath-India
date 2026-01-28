import joblib
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import os

# Create directories if not exist
os.makedirs("data/models", exist_ok=True)
os.makedirs("data/processed", exist_ok=True)

# Generate synthetic data for training
print("Generating synthetic data...")
n_samples = 1000
data = {
    'age': np.random.randint(18, 60, n_samples),
    'education_level': np.random.choice(['10th', '12th', 'Bachelor', 'Master', 'PhD'], n_samples),
    'industry': np.random.choice(['IT', 'Finance', 'Healthcare', 'Education', 'Other'], n_samples),
    'location_type': np.random.choice(['Urban', 'Semi-urban', 'Rural'], n_samples),
    'years_experience': np.random.randint(0, 40, n_samples),
    'starting_salary': np.random.randint(200000, 2000000, n_samples),
    'skills_count': np.random.randint(0, 20, n_samples),
    'certifications': np.random.randint(0, 5, n_samples),
    'job_switches': np.random.randint(0, 5, n_samples)
}

df = pd.DataFrame(data)

# Target variables (simple linear relationships + noise)
df['income_1_year'] = df['starting_salary'] * 1.1 + np.random.normal(0, 50000, n_samples)
df['income_3_years'] = df['starting_salary'] * 1.3 + np.random.normal(0, 100000, n_samples)
df['income_5_years'] = df['starting_salary'] * 1.5 + np.random.normal(0, 150000, n_samples)

# Encoding
print("Encoding data...")
encoders = {}
cat_cols = ['education_level', 'industry', 'location_type']

for col in cat_cols:
    le = LabelEncoder()
    df[f'{col}_encoded'] = le.fit_transform(df[col])
    encoders[col] = le

# Save encoders
joblib.dump(encoders, "data/models/label_encoders.pkl")

# Features for training
features = ['age', 'education_level_encoded', 'industry_encoded', 'location_type_encoded', 
            'years_experience', 'starting_salary', 'skills_count', 'certifications', 'job_switches']

X = df[features]

# Train models
print("Training models...")
models = {}
targets = ['income_1_year', 'income_3_years', 'income_5_years']

for target in targets:
    y = df[target]
    model = RandomForestRegressor(n_estimators=10, random_state=42)
    model.fit(X, y)
    models[target] = model
    joblib.dump(model, f"data/models/income_after_{target.split('_')[1]}_years_model.pkl")

print("✅ Models trained and saved successfully.")
