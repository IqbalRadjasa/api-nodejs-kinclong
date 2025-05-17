const cron = require('node-cron');
const dbPool = require('../config/database');
const moment = require('moment');

// Pengecekan Booking setiap 30 Menit
cron.schedule('*/30 * * * *', async () => {
  console.log('Menjalankan pengecekan durasi waktu pembayaran booking...');

  try {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const query = `
      UPDATE booking 
      SET status_berlaku_id = 2, status_pembayaran_id = 3 
      WHERE status_pembayaran_id = 2 
      AND TIMESTAMPDIFF(MINUTE, tanggal, NOW()) >= 30
    `;

    const [result] = await dbPool.execute(query, [now]);
    console.log(`Expired Bookings: ${result.affectedRows}`);
  } catch (error) {
    console.error('Error in scheduled task:', error.message);
  }
});

// Pengecekan Kode OTP setiap 10 Menit
cron.schedule('*/10 * * * *', async () => {
  console.log('Menjalankan pengecekan dan penghapusan OTP kadaluarsa...');

  try {
    const query = `
      DELETE FROM temp_otp 
      WHERE TIMESTAMPDIFF(MINUTE, created_at, NOW()) >= 15
    `;

    const [result] = await dbPool.execute(query);
    console.log(`Deleted Expired OTPs: ${result.affectedRows}`);
  } catch (error) {
    console.error('Error in scheduled task (OTP Deletion):', error.message);
  }
});
