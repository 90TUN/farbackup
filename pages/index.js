import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [fname, setFname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/query', { fname }, { responseType: 'blob' });

      // Create a download link for the CSV file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fname}_results.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error fetching Dune data:', error);
      setError(error.response?.data?.message || 'An error occurred while fetching data');
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Fname Query Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          placeholder="Enter fname"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Results'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Home;
