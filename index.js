require('dotenv').config();
require('./src/utils/cronJobs');
const express = require('express');

const app = express();

// Middleware
const middlewareLogRequest = require('./src/middleware/logs');
app.use(middlewareLogRequest);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Active PORT
const envPort = process.env.PORT || 5000;
app.listen(envPort, () => {
  console.log(`🚀 Server running on PORT ${envPort}`);
});

// Routes
const userRoutes = require('./src/routes/UsersRoutes');
const produkRoutes = require('./src/routes/ProdukRoutes ');
const jenisMobilRoutes = require('./src/routes/JenisMobilRoutes');
const metodePembayaranRoutes = require('./src/routes/MetodePembayaranRoutes');
const statusBerlakuRoutes = require('./src/routes/StatusBerlakuRoutes');
const bookingRoutes = require('./src/routes/BookingRoutes');

// Active Routes
app.use('/users', userRoutes);
app.use('/produk', produkRoutes);
app.use('/jenisMobil', jenisMobilRoutes);
app.use('/metodePembayaran', metodePembayaranRoutes);
app.use('/statusBerlaku', statusBerlakuRoutes);
app.use('/booking', bookingRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route tidak ditemukan!',
  });
});
