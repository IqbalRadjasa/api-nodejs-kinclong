const ProdukModel = require('../models/Produk');

const creatProduk = async (req, res) => {
  const { body } = req;

  if (!body.nama) {
    return res.status(400).json({
      status: 400,
      message: 'Data tidak boleh kosong!',
      data: null,
    });
  }

  try {
    await ProdukModel.createProduk(body);

    res.status(200).json({
      status: 200,
      message: 'Produk created successfully',
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
    const [result] = await ProdukModel.getAllData();

    if (!result) {
      return res.status(404).json({
        status: 404,
        message: 'No data has been found.',
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Get all data successfull!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error.message,
    });
  }
};

const updateProduk = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await ProdukModel.updateProduk(body, id);

    res.status(200).json({
      status: 200,
      message: 'Product updated successfully',
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

const deleteProduk = async (req, res) => {
  const { id } = req.params;

  try {
    await ProdukModel.deleteProduk(id);

    res.status(200).json({
      status: 200,
      message: 'Product deleted successfully',
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
  creatProduk,
  getAllData,
  updateProduk,
  deleteProduk,
};
