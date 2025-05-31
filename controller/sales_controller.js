const salesService = require('../service/sales_service.js')

// Revenue endpoint
exports.getTotalRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const revenue = await salesService.calculateTotalRevenue(startDate, endDate);
    res.json({ totalRevenue: revenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate revenue' });
  }
};

// CSV Upload Trigger endpoint
exports.uploadCSV = async (req, res) => {
  try {
    const result = await salesService.loadCSV('./uploads/sales.csv'); // Or use req.file.path if using multer
    res.json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load CSV' });
  }
};

exports.getRevenueByCategory = async (req, res) => {
  const { start, end } = req.query;
  try {
    const data = await salesService.getRevenueByCategory(start, end);
    res.json({ revenue_by_category: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch revenue by category' });
  }
};
