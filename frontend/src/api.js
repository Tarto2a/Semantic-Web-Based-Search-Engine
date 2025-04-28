export async function fetchSearchResults(keyword) {
    try {
      const response = await fetch('http://localhost:3001/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }),
      });
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('API error:', err);
      return [];
    }
  }
  