// config/db.js
const mysql = require('mysql2/promise');

const initDB = async () => {
  try {
    // Step 1: Create base connection (no db)
    const pool = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      multipleStatements: true
    });

    // Step 2: Create database if not exists
    await pool.query(`CREATE DATABASE IF NOT EXISTS salesdb`);

    // Step 3: Connect to the specific DB
    const db = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'salesdb',
      multipleStatements: true
    });

    // Step 4: Create tables if not exist
    const tableQueries = `
      CREATE TABLE IF NOT EXISTS customers (
        customer_id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        address TEXT
      );

      CREATE TABLE IF NOT EXISTS products (
        product_id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(100),
        category VARCHAR(100),
        unit_price DECIMAL(10,2)
      );

      CREATE TABLE IF NOT EXISTS orders (
        order_id VARCHAR(10) PRIMARY KEY,
        customer_id VARCHAR(10),
        product_id VARCHAR(10),
        date_of_sale DATE,
        quantity INT,
        discount DECIMAL(5,2),
        shipping_cost DECIMAL(10,2),
        payment_method VARCHAR(50),
        region VARCHAR(50),
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
      );
    `;

    await db.query(tableQueries);
    console.log('✅ Database and tables are ready.');

    return db;
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

module.exports = initDB;
