import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import Results from './components/Results';
import GraphViewer from './components/GraphViewer';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error message
  const [noResults, setNoResults] = useState(false); // State for handling no results found

  const handleResults = (newResults) => {
    setResults(newResults);
    setLoading(false); // Hide loading screen once results are fetched
    setNoResults(newResults.length === 0); // Update noResults state
  };

  const handleSearch = async (query) => {
    setLoading(true); // Show loading screen when search starts
    setError(null); // Reset previous error
    setNoResults(false); // Reset noResults state

    try {
      // إرسال البحث إلى الخادم
      const response = await fetch('http://localhost:3001/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: query }),
      });

      if (response.ok) {
        const data = await response.json();
        handleResults(data);
      } else {
        throw new Error('Error fetching data from server');
      }
    } catch {
      setError('حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقًا.');
      setLoading(false); // Hide loading screen on error
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Semantic Web Search</h1>
      <SearchBox onSearch={handleSearch} />
      
      {/* Loading Screen */}
      {loading && (
        <div className="loading-screen flex flex-col items-center justify-center">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
  
      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
  
      {/* No Results Found */}
      {noResults && <p className="text-red-500">No results found</p>}
  
      <Results data={results} />
      <GraphViewer data={results} />
    </div>
  );  
}

export default App;
