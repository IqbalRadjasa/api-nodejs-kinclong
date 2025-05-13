const BookingModel = require('../models/Booking');

const createBooking = async (req, res) => {
  const { body } = req;

  if ((!body.user_id, !body.produk_id, !body.jenis_mobil, !body.tanggal, !body.metode_pembayaran, !body.tagihan, !body.status_berlaku, !body.status_pembayaran)) {
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
        jenis_mobil: body.jenis_mobil,
        tanggal: body.tanggal,
        metode_pembayaran: body.metode_pembayaran,
        tagihan: body.tagihan,
        status_berlaku: body.status_berlaku,
        status_pembayaran: body.status_pembayaran,
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

module.exports = {
  createBooking,
};
