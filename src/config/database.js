// require('dotenv').config();
// const mysql = require('mysql2');

// const dbPool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// module.exports = dbPool.promise();

require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Error handling for pool
pool.on('error', (err) => {
  console.error('MySQL Pool Error:', err);
});

module.exports = pool;
