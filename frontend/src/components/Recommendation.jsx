import React from 'react';

function Recommendation({ recommendations }) {
  return (
    <div className="mt-6 bg-gray-700 p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-2">Recommendations:</h2>
      <ul className="list-disc list-inside">
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendation;
