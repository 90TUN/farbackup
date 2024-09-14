import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { fname } = req.body;
  const duneQueryId = '4057248'; 
  const duneApiKey = process.env.DUNE_API_KEY;

  if (!fname) {
    return res.status(400).json({ error: 'Fname is required' });
  }

  try {
    //  Execute the query with the fname parameter
    const executeResponse = await axios.post(
      `https://api.dune.com/api/v1/query/${duneQueryId}/execute`,
      { query_parameters: { user_input_fname_t6c1ea: fname } }, 
      { headers: { 'x-dune-api-key': duneApiKey, 'Content-Type': 'application/json' } }
    );

    if (executeResponse.status !== 200) {
      throw new Error('Error executing Dune query');
    }

    const executionId = executeResponse.data.execution_id;

    // Poll for query execution status
    let queryStatus = 'PENDING';
    const maxAttempts = 10; 
    let attempts = 0;

    while (queryStatus !== 'COMPLETED' && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const statusResponse = await axios.get(
        `https://api.dune.com/api/v1/execution/${executionId}/status`,
        { headers: { 'x-dune-api-key': duneApiKey } }
      );

      queryStatus = statusResponse.data.state;
      attempts++;

      if (queryStatus === 'FAILED') {
        return res.status(500).json({ error: 'Query execution failed' });
      }
    }

    if (queryStatus !== 'COMPLETED') {
      return res.status(500).json({ error: 'Query execution took too long' });
    }

    // Fetch the query results once the query is completed
    const resultsResponse = await axios.get(
      `https://api.dune.com/api/v1/query/${duneQueryId}/results?limit=1000`,
      { headers: { 'x-dune-api-key': duneApiKey } }
    );

    const queryResults = resultsResponse.data.result.rows;

    if (!queryResults.length) {
      return res.status(404).json({ error: 'No data found' });
    }

    // Convert query results to CSV format
    const csv = [
      Object.keys(queryResults[0]).join(','), // CSV header row
      ...queryResults.map((row) => Object.values(row).join(',')), 
    ].join('\n');

    // Return the CSV file as an attachment
    res.setHeader('Content-Disposition', `attachment; filename="${fname}_results.csv"`);
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(csv);

  } catch (error) {
    console.error('Error querying Dune API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
