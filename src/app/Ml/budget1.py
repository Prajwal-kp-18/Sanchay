
from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pandas as pd
import numpy as np
from flask_cors import  CORS

app = Flask(__name__)
CORS(app)

# Load the dataset and prepare the model (this part is unchanged)
data = pd.read_csv("C:\\Users\\Lenovo\\Desktop\\SIH_SurakshaSanchay\\src\\app\\Ml\\budgetval.csv")

X = data.drop(columns=["Total Buy Price", "Total Maintenance Cost", "Total Price", "Annual Budget"])
y_buy_price = data["Total Buy Price"]
y_maintenance_cost = data["Total Maintenance Cost"]

preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), ["Year"]),
        ("cat", OneHotEncoder(), ["Category"])
    ]
)

model_buy_price = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(random_state=42))
])

model_maintenance_cost = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(random_state=42))
])

X_train, X_test, y_train_buy, y_test_buy, y_train_maintenance, y_test_maintenance = train_test_split(
    X, y_buy_price, y_maintenance_cost, test_size=0.2, random_state=42
)

model_buy_price.fit(X_train, y_train_buy)
model_maintenance_cost.fit(X_train, y_train_maintenance)


# Calculate and print MSE for debugging
mse_buy_price = mean_squared_error(y_test_buy, model_buy_price.predict(X_test))
mse_maintenance_cost = mean_squared_error(y_test_maintenance, model_maintenance_cost.predict(X_test))
print(f'Mean Squared Error for Buy Price: {mse_buy_price}')
print(f'Mean Squared Error for Maintenance Cost: {mse_maintenance_cost}')

# Flask route to handle predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input from the frontend
        data = request.get_json()
        year_input = data['year']
        category_input = data['category']

        # Create DataFrame for the user input
        sample_input = pd.DataFrame({
            "Year": [year_input],
            "Category": [category_input]
        })

        # Make predictions
        sample_buy = model_buy_price.predict(sample_input)
        sample_maintenance = model_maintenance_cost.predict(sample_input)
        sample_total_price = sample_buy + sample_maintenance
        sample_annual_budget = sample_total_price * 1.2

        # Ensure no negative predictions
        sample_total_price = max(sample_total_price[0], 0)
        sample_annual_budget = max(sample_annual_budget[0], 0)

        # Return the predictions as JSON
        return jsonify({
            'buy_price': sample_buy[0],
            'maintenance_cost': sample_maintenance[0],
            'total_price': sample_total_price,
            'annual_budget': sample_annual_budget
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
