const cron = require('node-cron');
const dbPool = require('../config/database');
const moment = require('moment');

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
