import { useState, useEffect } from 'react';

function useFetch(url,topicsChanged) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);        
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally{
        setLoading(false);
      }
    }

    fetchData();
  }, [url,topicsChanged]);

  return { data, loading, error };
}

export default useFetch;
