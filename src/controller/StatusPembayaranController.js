const StatusPembayaranModel = require('../models/StatusPembayaran');

const createData = async (req, res) => {
  const { body } = req;

  if (!body.nama) {
    return res.status(400).json({
      status: 400,
      message: 'Data tidak boleh kosong!',
      data: null,
    });
  }

  try {
    await StatusPembayaranModel.createData(body);

    res.status(200).json({
      status: 200,
      message: 'Data berhasil ditambahkan!',
      data: {
        nama: body.nama,
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

const getAllData = async (req, res) => {
  try {
    const data = await StatusPembayaranModel.getAllData();

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

const updateData = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await StatusPembayaranModel.updateData(body, id);

    res.status(200).json({
      status: 200,
      message: 'Data berhasil diperbarui!',
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error,
    });
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    await StatusPembayaranModel.deleteData(id);

    res.status(200).json({
      status: 200,
      message: 'Data berhasil dihapus!',
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error,
    });
  }
};

module.exports = {
  createData,
  getAllData,
  updateData,
  deleteData,
};
