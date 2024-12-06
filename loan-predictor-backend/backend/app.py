from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
import pandas as pd
import pickle
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the model and encoders
try:
    model = pickle.load(open('random_forest_model.pkl', 'rb'))
    encoders = pickle.load(open('label_encoder.pkl', 'rb'))
except Exception as e:
    print("Error loading model or encoders:", str(e))
    raise



@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the data from request
        data = request.json
        print("Received data:", data)  # Debug print

        # Create DataFrame with exact column names
        input_data = pd.DataFrame({
            'Annual_Income': [int(data['Annual_Income'])],  # Convert to float
            'Applicant_Age': [int(data['Applicant_Age'])],
            'Work_Experience': [int(data['Work_Experience'])],
            'Marital_Status': [str(data['Marital_Status'])],
            'House_Ownership': [str(data['House_Ownership'])],
            'Vehicle_Ownership(car)': [str(data['Vehicle_Ownership(car)'])],
            'Occupation': [str(data['Occupation'])],
            'Residence_State': [str(data['Residence_State'])],
            'Years_in_Current_Employment': [int(data['Years_in_Current_Employment'])],
            'Years_in_Current_Residence': [int(data['Years_in_Current_Residence'])]
        })
        
        print("Created DataFrame:", input_data)  # Debug print

        # Encode categorical variables
        categorical_columns = ['Marital_Status', 'House_Ownership', 'Vehicle_Ownership(car)', 
                             'Occupation', 'Residence_State']
        
        for column in categorical_columns:
            print(f"Encoding {column}", input_data[column])  # Debug print
            input_data[column] = encoders[column].transform(input_data[column])
        
        print("Encoded DataFrame:", input_data)  # Debug print

        # Make prediction
        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1]

        print("Prediction = ", prediction)
        print("Probability",probability)
        
        # Return result
        result = probability
        return jsonify({
            'result': result,
            'probability': float(probability)  # Convert numpy float to Python float
        })
    
    except Exception as e:
        print("Error occurred:", str(e))
        print("Traceback:", traceback.format_exc())  # Print full traceback
        return jsonify({
            'error': str(e),
            'traceback': traceback.format_exc()
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)