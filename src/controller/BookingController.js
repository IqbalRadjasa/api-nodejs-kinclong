const BookingModel = require('../models/Booking');

const createBooking = async (req, res) => {
  const { body } = req;

  if ((!body.user_id, !body.produk_id, !body.jenis_mobil_id, !body.tanggal, !body.metode_pembayaran_id, !body.tagihan)) {
    return res.status(400).json({
      status: 400,
      message: 'Data tidak boleh kosong!',
      data: null,
    });
  }

  try {
    await BookingModel.createBooking(body);

    res.status(200).json({
      status: 200,
      message: 'Berhasil melakukan Booking, silahkan melanjutkan pembayaran melalui metode pembayaran yang anda pilih.',
      data: {
        user_id: body.user_id,
        produk_id: body.produk_id,
        jenis_mobil: body.jenis_mobil_id,
        tanggal: body.tanggal,
        metode_pembayaran: body.metode_pembayaran_id,
        tagihan: body.tagihan,
        // status_berlaku: body.status_berlaku_id,
        // status_pembayaran: body.status_pembayaran_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error.message,
    });
  }
};

const bookingPayment = async (req, res) => {
  const { body } = req;

  if ((!body.booking_id, !body.status_pembayaran_id, !body.tanggal)) {
    return res.status(400).json({
      status: 400,
      message: 'Data tidak boleh kosong!',
      data: null,
    });
  }

  try {
    await BookingModel.bookingPayment(body);

    res.status(200).json({
      status: 200,
      message: 'Pembayaran berhasil!',
      data: {
        booking_id: body.booking_id,
        status_pembayaran_id: body.status_pembayaran_id,
        tanggal: body.tanggal
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error.message,
    });
  }
};

const bookingHistory = async (req, res) => {
  const { body } = req;

  try {
    const data = await BookingModel.bookingHistory(body);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'Tidak ada data yang tidak ditemukan.',
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Data berhasil ditemukan!',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error.message,
    });
  }
};

module.exports = {
  createBooking,
  bookingHistory,
  bookingPayment,
};
