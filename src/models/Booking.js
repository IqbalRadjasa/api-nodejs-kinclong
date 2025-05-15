const dbPool = require('../config/database');

const createBooking = async (body) => {
  const users_query = `
      INSERT INTO booking (user_id, produk_id, jenis_mobil_id, tanggal, metode_pembayaran_id, tagihan, status_berlaku_id, status_pembayaran_id) 
      VALUES (?, ?, ?, ?, ?, ?, 1, 2)
    `;
  const [result] = await dbPool.execute(users_query, [body.user_id, body.produk_id, body.jenis_mobil_id, body.tanggal, body.metode_pembayaran_id, body.tagihan]);

  return result;
};

const bookingHistory = async (body) => {
  const query = `
  SELECT 
    u.username AS nama_pengguna, 
    p.nama AS produk, 
    jm.nama AS jenis_mobil, 
    b.tanggal, 
    b.tagihan, 
    mp.nama as metode_pembayaran, 
    sb.nama AS status_berlaku, 
    sp.nama AS status_pembayaran, 
    b.no_antrian 
    FROM booking b
    RIGHT JOIN users u ON b.user_id = u.id
    LEFT JOIN produk p ON b.produk_id = p.id
    LEFT JOIN jenis_mobil jm ON b.jenis_mobil_id = jm.id
    LEFT JOIN metode_pembayaran mp ON b.metode_pembayaran_id = mp.id
    LEFT JOIN status_berlaku sb ON b.status_berlaku_id = sb.id
    LEFT JOIN status_pembayaran sp ON b.status_pembayaran_id = sp.id
    WHERE u.id = ?
      AND (
        (? IS NULL AND ? IS NULL) 
        OR (? IS NOT NULL AND ? IS NULL AND DATE(b.tanggal) >= ?) 
        OR (? IS NULL AND ? IS NOT NULL AND DATE(b.tanggal) <= ?) 
        OR (DATE(b.tanggal) BETWEEN ? AND ?)
      )
    ORDER BY b.tanggal DESC;
    `;

  const user_id = body.user_id;
  const start_date = body.start_date || null;
  const end_date = body.end_date || null;

  const [rows] = await dbPool.execute(query, [user_id, start_date, end_date, start_date, end_date, start_date, start_date, end_date, end_date, start_date, end_date]);

  return rows;
};

const bookingPayment = async (body) => {
  try {
    const last_queued_no_query = `
      SELECT no_antrian 
      FROM booking 
      WHERE status_berlaku_id = 1 
      AND status_pembayaran_id = 1
      AND DATE(tanggal) = ? 
      ORDER BY no_antrian DESC LIMIT 1
    `;
    const [rows] = await dbPool.execute(last_queued_no_query, [body.tanggal]);

    const last_queued_no = rows.length > 0 ? parseInt(rows[0].no_antrian) : 0;
    const new_queued_no = last_queued_no + 1;

    const payment_query = `
      UPDATE booking 
      SET status_pembayaran_id = ?, no_antrian = ? 
      WHERE id = ?
    `;
    const [exec] = await dbPool.execute(payment_query, [body.status_pembayaran_id, new_queued_no, body.booking_id]);

    return exec;
  } catch (error) {
    console.error('Error in bookingPayment:', error.message);
    throw error;
  }
};


module.exports = {
  createBooking,
  bookingHistory,
  bookingPayment,
};
