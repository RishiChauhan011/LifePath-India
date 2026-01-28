import joblib
import pandas as pd
import numpy as np
from pathlib import Path

class MLPredictor:
    def __init__(self):
        # Adjust path to be relative to the app execution context or absolute
        # Assuming app is run from root (c:/vs/Backend)
        self.models_path = Path("data/models/")
        self.load_models()
        self.load_encoders()
    
    def load_models(self):
        """Load pre-trained scikit-learn models"""
        try:
            self.models = {
                'income_1_year': joblib.load(self.models_path / 'income_after_1_year_model.pkl'),
                'income_3_years': joblib.load(self.models_path / 'income_after_3_years_model.pkl'),
                'income_5_years': joblib.load(self.models_path / 'income_after_5_years_model.pkl')
            }
        except Exception as e:
            print(f"Warning: Could not load models. Ensure they are trained. Error: {e}")
            self.models = {}

    def load_encoders(self):
        try:
            self.encoders = joblib.load(self.models_path / 'label_encoders.pkl')
        except Exception as e:
            print(f"Warning: Could not load encoders. Error: {e}")
            self.encoders = {}

    def prepare_features(self, user_profile, scenario):
        """
        Convert user input + scenario into model features
        """
        # Handling missing encoders for robustness if models aren't trained yet
        if not self.encoders:
            # Return dummy features or raise error
            return {
                'age': user_profile['age'],
                'education_level_encoded': 0,
                'industry_encoded': 0,
                'location_type_encoded': 0,
                'years_experience': user_profile.get('years_experience', 0),
                'starting_salary': user_profile.get('current_income', 0),
                'skills_count': len(user_profile.get('skills', [])),
                'certifications': user_profile.get('certifications', 0),
                'job_switches': 0
            }

        education = scenario['education_choice']
        if education == 'current':
            education = user_profile['education_level']
        
        industry = scenario['career_path']
        if industry == 'current_job':
            industry = user_profile.get('industry', 'IT')
        
        # Helper to safely encode
        def safe_transform(encoder_name, value):
            if encoder_name not in self.encoders:
                return 0
            encoder = self.encoders[encoder_name]
            try:
                return encoder.transform([value])[0]
            except ValueError:
                # Handle unseen labels by assigning a default or "other" category if possible
                # For now, just return 0 (assuming 0 is a valid class)
                return 0

        education_encoded = safe_transform('education_level', education)
        industry_encoded = safe_transform('industry', industry)
        location_encoded = safe_transform('location_type', user_profile['location_type'])
        
        # Calculate derived features
        starting_salary = user_profile.get('current_income', 400000)
        if scenario['education_choice'] == 'master':
            starting_salary = int(starting_salary * 1.3)
        
        skills_count = len(user_profile.get('skills', []))
        if scenario.get('training_program'):
            skills_count += 3
        
        return {
            'age': user_profile['age'],
            'education_level_encoded': education_encoded,
            'industry_encoded': industry_encoded,
            'location_type_encoded': location_encoded,
            'years_experience': user_profile.get('years_experience', 0),
            'starting_salary': starting_salary,
            'skills_count': skills_count,
            'certifications': user_profile.get('certifications', 0),
            'job_switches': 0
        }

    def predict_scenario(self, user_profile, scenario):
        """Predict outcomes for a single scenario"""
        
        features = self.prepare_features(user_profile, scenario)
        features_df = pd.DataFrame([features])
        
        # Predict income
        predictions = {}
        if self.models:
            for period, model in self.models.items():
                try:
                    predictions[period] = max(0, model.predict(features_df)[0])
                except:
                    predictions[period] = 0
        else:
             predictions = {'income_1_year': 0, 'income_3_years': 0, 'income_5_years': 0}
        
        # Calculate additional metrics
        employment_prob = self.calculate_employment_probability(features)
        quality_of_life = self.calculate_quality_of_life(predictions, features)
        risk_score = self.calculate_risk_score(scenario, features)
        confidence = self.calculate_confidence_score(features)
        
        return {
            'scenario_name': scenario['scenario_name'],
            'income_1_year': round(predictions.get('income_1_year', 0), 2),
            'income_3_years': round(predictions.get('income_3_years', 0), 2),
            'income_5_years': round(predictions.get('income_5_years', 0), 2),
            'employment_probability': round(employment_prob, 2),
            'quality_of_life_score': round(quality_of_life, 2),
            'risk_score': round(risk_score, 2),
            'confidence_score': round(confidence, 2)
        }

    def calculate_employment_probability(self, features):
        base_prob = 0.75
        if features['education_level_encoded'] >= 3:
            base_prob += 0.15
        base_prob += min(features['skills_count'] * 0.02, 0.1)
        if features['industry_encoded'] == 0:  # IT
            base_prob += 0.05
        return min(base_prob, 0.99)

    def calculate_quality_of_life(self, predictions, features):
        inc_5 = predictions.get('income_5_years', 0)
        start_sal = features['starting_salary']
        if start_sal > 0:
            income_growth = (inc_5 - start_sal) / start_sal
        else:
            income_growth = 0
        
        qol = 5.0
        qol += min(income_growth * 2, 3)
        qol += min(features['skills_count'] * 0.1, 1)
        qol += 0.5 if features['education_level_encoded'] >= 3 else 0
        return min(qol, 10.0)

    def calculate_risk_score(self, scenario, features):
        risk = 3.0
        if 'switch' in scenario.get('career_path', '') or scenario.get('career_path') != 'current_job':
             # Simple heuristic check if path indicates a switch
             pass

        if features['years_experience'] < 2:
            risk += 1.5
        if features['skills_count'] < 3:
            risk += 1.0
        return min(risk, 10.0)

    def calculate_confidence_score(self, features):
        confidence = 0.7
        confidence += min(features['years_experience'] * 0.02, 0.15)
        confidence += min(features['skills_count'] * 0.01, 0.1)
        return min(confidence, 0.95)

    def predict_multiple_scenarios(self, user_profile, scenarios):
        results = []
        for scenario in scenarios:
            # scenario is a dict from Pydantic model
            result = self.predict_scenario(user_profile, scenario)
            results.append(result)
        
        if not results:
             return [], ""

        # Determine best scenario
        best = max(results, key=lambda x: x['income_5_years'] - (x['risk_score'] * 50000))
        return results, best['scenario_name']
