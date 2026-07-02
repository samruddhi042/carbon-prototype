import React, { useState } from 'react';
import axios from 'axios';

function DataForm({ setResults }) {
  const [formData, setFormData] = useState({
    diesel: '',
    electricity: '',
    coal: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/calculate', formData);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="number" name="diesel" placeholder="Diesel (liters)" onChange={handleChange} 
             className="p-2 rounded-md text-black" />
      <input type="number" name="electricity" placeholder="Electricity (kWh)" onChange={handleChange} 
             className="p-2 rounded-md text-black" />
      <input type="number" name="coal" placeholder="Coal Output (tons)" onChange={handleChange} 
             className="p-2 rounded-md text-black" />
      <button type="submit" className="bg-green-500 hover:bg-green-600 p-2 rounded-md font-bold">
        Calculate Emissions
      </button>
    </form>
  );
}

export default DataForm;
