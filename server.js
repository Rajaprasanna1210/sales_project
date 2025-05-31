
const express = require('express');
const initDB = require('./config/db');
const salesRoutes = require('./routes/sales_routes')
const { loadCSV, calculateTotalRevenue } = require('./service/sales_service');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/sales', salesRoutes);
(async () => {
  const db = await initDB();

  // Pass db to services that need it
  app.get('/api/revenue', async (req, res) => {
    const { start, end } = req.query;
    try {
      const revenue = await calculateTotalRevenue(start, end, db);
      res.json({ totalRevenue: revenue });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch revenue' });
    }
  });

  app.post('/api/load-sales', async (req, res) => {
    try {
      const result = await loadCSV('./uploads/sales.csv', db); // replace with actual file path
      res.json({ message: result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to load CSV data' });
    }
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();
