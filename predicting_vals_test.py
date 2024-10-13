import pandas as pd
import joblib
import ast
import numpy as np

# Load new patient data
new_df = pd.read_csv('sample2.csv')

# Define the same feature engineering function
# def has_chronic_condition(conditions):
#     chronic_conditions = ['hypertension', 'preeclampsia', 'cancer', 'diabetes', 'asthma']
#     if pd.isna(conditions):
#         return False
#     cond_list = [cond.strip().lower() for cond in conditions.split(';') if isinstance(cond, str)]
#     return any(cond in chronic_conditions for cond in cond_list)
new_df['ALL_CONDITIONS'] = new_df['ALL_CONDITIONS'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

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

    #time.sleep(2)
    
    # Make sure conditions is a list and iterate through each condition
    if isinstance(conditions, list):
        for condition in conditions:
            # Check if any keyword from chronic_keywords is present in the condition (case-insensitive)
            if any(keyword in condition.lower() for keyword in chronic_conditions):
                count += 1

    # If the patient has more than 2 chronic conditions, return True
    # print(count)
    return count

def determine_complexity(row):
    has_chronic = has_chronic_condition(row['ALL_CONDITIONS'])
    #print(has_chronic)
    return has_chronic


# Apply the function row-wise to calculate the count of chronic conditions for each patient
new_df['Has_Chronic'] = new_df.apply(determine_complexity, axis=1)

features_to_scale = ['Has_Chronic']

for feature in features_to_scale:
    if feature in new_df.columns:
        new_df[feature] = new_df[feature].apply(sigmoid)

# Define features
feature_columns = ['Has_Chronic']
X_new = new_df[feature_columns]

# Handle missing values if any
X_new.fillna(0, inplace=True)

# Load the trained model
rf = joblib.load('random_forest_model.joblib')

# Make predictions
y_new_pred = rf.predict(X_new)
y_new_proba = rf.predict_proba(X_new)[:,1]

# Add predictions to the DataFrame
new_df['Predicted_Flagged_Complex'] = y_new_pred
new_df['Predicted_Probability'] = y_new_proba

counts = new_df['Predicted_Flagged_Complex'].value_counts()
print(counts)

# Save predictions to a new CSV
new_df.to_csv('sample1_output.csv', index=False)
final_output = pd.read_csv("sample1_output.csv")

json_str = final_output.to_json(orient='records', indent=4)
print(json_str)

# Display the predictions
# print(new_df[['Has_Chronic', 'Predicted_Flagged_Complex', 'Predicted_Probability']].head())
