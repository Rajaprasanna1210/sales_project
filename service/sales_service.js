// service/sales_service.js
const fs = require('fs');
const csv = require('csv-parser');

async function loadCSV(filePath, db) {
  const records = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', row => records.push(row))
      .on('end', async () => {
        try {
          for (const row of records) {
            await db.query(
              `INSERT IGNORE INTO customers (customer_id, name, email, address) VALUES (?, ?, ?, ?)`,
              [row['Customer ID'], row['Customer Name'], row['Customer Email'], row['Customer Address']]
            );

            await db.query(
              `INSERT IGNORE INTO products (product_id, name, category, unit_price) VALUES (?, ?, ?, ?)`,
              [row['Product ID'], row['Product Name'], row['Category'], row['Unit Price']]
            );

            await db.query(
              `INSERT IGNORE INTO orders (
                order_id, customer_id, product_id, date_of_sale,
                quantity, discount, shipping_cost, payment_method, region
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                row['Order ID'], row['Customer ID'], row['Product ID'],
                row['Date of Sale'], row['Quantity Sold'], row['Discount'],
                row['Shipping Cost'], row['Payment Method'], row['Region']
              ]
            );
          }

          resolve('CSV data loaded successfully');
        } catch (err) {
          reject(err);
        }
      });
  });
}

async function calculateTotalRevenue(start, end, db) {
  const [rows] = await db.query(`
    SELECT 
      SUM(quantity * unit_price * (1 - discount) + shipping_cost) AS total_revenue
    FROM orders 
    JOIN products ON orders.product_id = products.product_id
    WHERE date_of_sale BETWEEN ? AND ?
  `, [start, end]);

  return rows[0].total_revenue || 0;
}
// 📊 Total Revenue by Category
async function getRevenueByCategory(start, end) {
  const [rows] = await db.query(`
    SELECT 
      products.category,
      SUM(orders.quantity * products.unit_price * (1 - orders.discount) + orders.shipping_cost) AS revenue
    FROM orders
    JOIN products ON orders.product_id = products.product_id
    WHERE orders.date_of_sale BETWEEN ? AND ?
    GROUP BY products.category
    ORDER BY revenue DESC
  `, [start, end]);

  return rows;
}


module.exports = {
  loadCSV,
  calculateTotalRevenue,
  getRevenueByCategory 
};
