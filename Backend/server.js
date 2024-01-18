// my-search-api/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csvParser = require('csv-parser');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Change the path to your CSV file
const csvFilePath = './data/Medlr_Full_Stack_Sample_Data.csv';

const readCSV = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

app.get('/search', async (req, res) => {
  const { query, filter, sort } = req.query;

  try {
    const sampleData = await readCSV();
    let results = [...sampleData];

    // Implement filtering based on the filter parameter (if provided)
    if (filter) {
      results = results.filter(item => item.source === filter || item.manufacturer === filter);
    }

    // Implement sorting based on the sort parameter (if provided)
    if (sort) {
      results.sort((a, b) => {
        if (sort === 'price') {
          return a[sort] - b[sort];
        } else {
          return a[sort].localeCompare(b[sort]);
        }
      });
    }

    res.json(results);
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle the root path with a simple response
app.get('/', (req, res) => {
  res.send('Welcome to the search API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
