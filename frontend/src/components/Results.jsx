import React from 'react';

function Results({ data }) {
  if (!data.length) return null;

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2 text-center">Results</h2>
      <div className="flex justify-center items-center flex-wrap gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md w-64">
            <a href={item.id} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {item.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
