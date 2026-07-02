import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./index.css";

function App() {
  const [diesel, setDiesel] = useState("");
  const [electricity, setElectricity] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/calculate", {
        diesel: Number(diesel),
        electricity: Number(electricity),
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const data = {
    labels: ["Scope 1", "Scope 2"],
    datasets: [
      {
        label: "Emissions (kg CO2 eq)",
        data: result ? [result.scope1, result.scope2] : [0, 0],
        backgroundColor: ["orange", "blue"],
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Coal Mine Carbon Calculator</h1>
      <form className="mb-6" onSubmit={handleSubmit}>
        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Diesel (liters)"
          value={diesel}
          onChange={(e) => setDiesel(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Electricity (kWh)"
          value={electricity}
          onChange={(e) => setElectricity(e.target.value)}
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Calculate
        </button>
      </form>

      {result && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <p>Scope 1: {result.scope1} kg CO₂ eq</p>
          <p>Scope 2: {result.scope2} kg CO₂ eq</p>
          <p>Total: {result.total} kg CO₂ eq</p>
          <p>Recommendations:</p>
          <ul className="list-disc ml-6">
            {result.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>

          <div className="mt-6 w-96">
            <Line data={data} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
