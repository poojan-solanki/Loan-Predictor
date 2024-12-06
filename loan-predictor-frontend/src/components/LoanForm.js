import React, { useState, useEffect } from 'react';


const STATES = [
  'Punjab', 'West Bengal', 'Madhya Pradesh', 'Andhra Pradesh',
  'Assam', 'Bihar', 'Rajasthan', 'Uttar Pradesh', 'Chandigarh',
  'Karnataka', 'Delhi', 'Haryana', 'Gujarat', 'Maharashtra',
  'Chhattisgarh', 'Kerala', 'Tripura', 'Tamil Nadu', 'Sikkim',
  'Mizoram', 'Jharkhand', 'Uttar Pradesh[5]', 'Odisha', 'Telangana',
  'Jammu and Kashmir', 'Himachal Pradesh', 'Uttarakhand',
  'Puducherry', 'Manipur'
];

const OCCUPATIONS = [
  'Psychologist', 'Petroleum Engineer', 'Drafter',
  'Chartered Accountant', 'Air traffic controller',
  'Biomedical Engineer', 'Fashion Designer', 'Magistrate',
  'Technology specialist', 'Lawyer', 'Civil servant', 'Physician',
  'Financial Analyst', 'Design Engineer', 'Hotel Manager',
  'Engineer', 'Computer hardware engineer', 'Flight attendant',
  'Comedian', 'Scientist', 'Mechanical engineer', 'Geologist',
  'Aviator', 'Web designer', 'Designer', 'Architect', 'Statistician',
  'Graphic Designer', 'Dentist', 'Consultant', 'Secretary',
  'Economist', 'Official', 'Chemical engineer', 'Politician',
  'Army officer', 'Microbiologist', 'Librarian',
  'Software Developer', 'Civil engineer', 'Technical writer', 'Chef',
  'Artist', 'Firefighter', 'Computer operator', 'Surgeon',
  'Industrial Engineer', 'Police officer', 'Analyst', 'Technician',
  'Surveyor'
];


const LoanForm = () => {
  const [formData, setFormData] = useState(() => {
    // Try to get saved data from localStorage, otherwise use default values
    const savedData = localStorage.getItem('loanFormData');
    return savedData ? JSON.parse(savedData) : {
      Annual_Income: '',
      Applicant_Age: '',
      Work_Experience: '',
      Marital_Status: 'single',
      House_Ownership: 'rented',
      'Vehicle_Ownership(car)': 'no',
      Occupation: '',
      Residence_State: '',
      Years_in_Current_Employment: '',
      Years_in_Current_Residence: ''
    };
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

   // Save form data to localStorage whenever it changes
   useEffect(() => {
    localStorage.setItem('loanFormData', JSON.stringify(formData));
  }, [formData]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);


    
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data);
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 text-base";
  const selectClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-3 text-base";

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Loan Default Risk Predictor</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (₹)</label>
          <input
            type="number"
            name="Annual_Income"
            value={formData.Annual_Income}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            name="Applicant_Age"
            value={formData.Applicant_Age}
            onChange={handleChange}
            min="18"
            max="100"
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Experience (years)</label>
          <input
            type="number"
            name="Work_Experience"
            value={formData.Work_Experience}
            onChange={handleChange}
            min="0"
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
          <select
            name="Marital_Status"
            value={formData.Marital_Status}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">House Ownership</label>
          <select
            name="House_Ownership"
            value={formData.House_Ownership}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="rented">Rented</option>
            <option value="owned">Owned</option>
            <option value="norent_noown">Neither</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Ownership (car)</label>
          <select
            name="Vehicle_Ownership(car)"
            value={formData['Vehicle_Ownership(car)']}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
          <select
            name="Occupation"
            value={formData.Occupation}
            onChange={handleChange}
            className={selectClasses}
            required
          >
            <option value="">Select Occupation</option>
            {OCCUPATIONS.map(occupation => (
              <option key={occupation} value={occupation}>{occupation}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select
            name="Residence_State"
            value={formData.Residence_State}
            onChange={handleChange}
            className={selectClasses}
            required
          >
            <option value="">Select State</option>
            {STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Years in Current Employment</label>
          <input
            type="number"
            name="Years_in_Current_Employment"
            value={formData.Years_in_Current_Employment}
            onChange={handleChange}
            min="0"
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Years in Current Residence</label>
          <input
            type="number"
            name="Years_in_Current_Residence"
            value={formData.Years_in_Current_Residence}
            onChange={handleChange}
            min="0"
            className={inputClasses}
            required
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-lg font-medium"
          >
            Predict Risk
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {prediction && (
        <div className={`mt-4 p-4 rounded ${
          prediction.result === 'Low Risk' 
            ? 'bg-green-100 border-green-400 text-green-700' 
            : 'bg-red-100 border-red-400 text-red-700'
        }`}>
          <h3 className="font-bold text-lg">Prediction Result</h3>
          <p>Risk Level: {prediction.result}</p>
          <p>Probability: {(prediction.probability * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default LoanForm;