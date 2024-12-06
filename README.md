# Loan Predictor

Loan Predictor is a machine learning-based web application that predicts loan eligibility for users based on various input factors.

It is based on [Applicant-Details](https://www.kaggle.com/code/yaminh/loan-risk-prediction-using-ml-etc-93/input) Dataset

## Features

- **Frontend**: Built using React.js with modular components and services for maintainability.
- **Backend**: A Python-based backend integrated with a loan prediction machine learning model.

---

<!-- ## Project Structure -->

<!-- ### Frontend Structure
```
loan-predictor-frontend/
├── public/
│   ├── index.html             # Main HTML template
│   └── assets/                # Static assets (images, styles, etc.)
├── src/
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Page components
│   ├── services/              # API service utilities
│   ├── utils/                 # Utility functions
│   ├── App.js                 # Main application component
│   └── index.js               # Entry point
├── package.json               # Node.js dependencies and scripts
└── README.md                  # Frontend-specific documentation
``` -->

## Backend Structure
```
loan-predictor-backend/
├── Lib/                       # Python virtual environment libraries (ignored)
├── Include/                   # Virtual environment includes (ignored)
├── Scripts/                   # Virtual environment scripts (ignored)
└── pyvenv.cfg                 # Python virtual environment configuration (ignored)
```

---

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (for frontend)
- [Python 3.8+](https://www.python.org/) (for backend)


### Steps to Run Locally

#### 1. Clone the Repository
```bash
git clone https://github.com/poojan-solanki/Loan-Predictor.git
cd Loan-Predictor
```

#### 2. Set Up the Backend

1. Create a virtual environment:
   ```bash
   python -m venv loan-predictor-backend
   ```
2. Activate the virtual environment:
   - Windows:
     ```bash
     .\loan-predictor-backend\Scripts\activate
     ```
   - macOS/Linux:
   python -m venv loan-predictor-backend
     ```bash
     source loan-predictor-backend/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r .\loan-predictor-backend\requirments.txt
   ```
4. Run the backend server:
   ```bash
   cd .\loan-predictor-backend\backend\
   python .\loan-predictor-backend\backend\app.py
   ```

### Now open another window/tab of terminal:
#### 3. Set Up the Frontend in root project directory
1. Navigate to the frontend directory:
   ```bash
   cd /loan-predictor-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

#### 4. Access the Application
- Frontend will run on: [http://localhost:3000](http://localhost:3000)
- Backend will run on: [http://localhost:5000](http://localhost:5000)

---

## Usage

1. Open the web application rinning on: [http://localhost:5000](http://localhost:5000).
2. Fill in the required loan application details.
3. Submit the form to get loan eligibility predictions.

---


## Acknowledgments

- **React.js** for the frontend framework.
- **Python** for backend development and machine learning integration.

---
