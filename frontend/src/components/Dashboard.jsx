import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

function Dashboard({ results }) {
  const data = {
    labels: ['Scope 1 (Diesel)', 'Scope 2 (Electricity)'],
    datasets: [{
      data: [results.scope1, results.scope2],
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverOffset: 10
    }]
  };

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Emission Overview (kg CO2)</h2>
      <Doughnut data={data} />
      <p className="text-center mt-4 text-xl">Total Emissions: {results.total} kg CO2</p>
    </div>
  );
}

export default Dashboard;
