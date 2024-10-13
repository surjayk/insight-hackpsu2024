import pandas as pd
import joblib
import ast
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def has_chronic_condition(conditions):
    chronic_conditions = [
        'hypertension', 'diabetes', 'COPD', 'asthma',
        'heart failure', 'hyperlipidemia', 'rheumatoid', 'arthritis',
        'coronary artery', 'obesity', 'bipolar', 'schizophrenia', 'parkinson',
        'cancer', 'cirrhosis', 'chronic'
    ]
    count = 0
    
    if isinstance(conditions, list):
        for condition in conditions:
            if any(keyword in condition.lower() for keyword in chronic_conditions):
                count += 1
    return count

def determine_complexity(row):
    has_chronic = has_chronic_condition(row['ALL_CONDITIONS'])
    return has_chronic

# Function to process CSV and return complexity prediction
def process_complexity_csv(filepath):
    try:
        # Load patient data from CSV
        new_df = pd.read_csv(filepath)

        # Ensure ALL_CONDITIONS column is properly formatted
        new_df['ALL_CONDITIONS'] = new_df['ALL_CONDITIONS'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

        # Apply feature engineering
        new_df['Has_Chronic'] = new_df.apply(determine_complexity, axis=1)
        new_df['Has_Chronic'] = new_df['Has_Chronic'].apply(sigmoid)

        # Load the trained model
        rf = joblib.load('random_forest_model.joblib')

        # Define features
        feature_columns = ['Has_Chronic']
        X_new = new_df[feature_columns]
        X_new.fillna(0, inplace=True)

        # Make predictions
        y_new_pred = rf.predict(X_new)
        y_new_proba = rf.predict_proba(X_new)[:,1]

        # Add predictions to the DataFrame
        new_df['Predicted_Flagged_Complex'] = y_new_pred
        new_df['Predicted_Probability'] = y_new_proba

        # Convert result to JSON
        final_output = new_df[['Has_Chronic', 'Predicted_Flagged_Complex', 'Predicted_Probability']]
        result_json = final_output.to_json(orient='records', indent=4)
        
        return result_json
    except Exception as e:
        return {'error': str(e)}
