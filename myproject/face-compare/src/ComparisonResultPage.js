import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ComparisonResultPage() {
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post('http://localhost:8000/compare-image/');
      console.log(res);
      setFeatures(res.data.features);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Comparison Result</h1>
      {features ? (
        <div>
          <h2>Features:</h2>
          <pre>{JSON.stringify(features, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ComparisonResultPage;
