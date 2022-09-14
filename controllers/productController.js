const Product = require('../models/Product');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    subCategory,
    countInStock,
    brand,
    type,
    rating,
    modelNo,
    skuNo,
    image,
  } = req.body;
  // console.log('Inside Creating product');

  const product = await Product.create({
    name,
    description,
    price,
    category,
    subCategory,
    countInStock,
    brand,
    type,
    rating,
    modelNo,
    skuNo,
    image,
  });
  if (product) {
    return res.status(201).json({ msg: 'Product created successfully' });
  } else {
    return res
      .status(400)
      .json({ msg: 'Error occured during product creation' });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (product) {
    return res.status(201).json({ msg: 'Product updated successfully' });
  } else {
    return res
      .status(400)
      .json({ msg: 'Error occured dunring product update' });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  console.log('In delete');

  const prod = await Product.findByIdAndDelete(req.params.id);
  // const prod = await Product.deleteMany({});

  if (!prod) return res.status(404).json({ msg: 'No Product found' });

  res.status(201).json({ msg: 'Product deleted successfully' });
});

const getProducts = asyncHandler(async (req, res) => {
  const prod = await Product.find({});

  if (prod) return res.status(201).json(prod);

  return res.status(400).json({ msg: 'Error occured getting products' });
});

const getByCategory = asyncHandler(async (req, res) => {
  const cat = req.query;
  const deCat = Object.entries(cat);
  const valOne = deCat[0][1];
  const prod = await Product.find({ category: valOne });
  if (prod) return res.status(201).json(prod);

  return res
    .status(400)
    .json({ msg: 'Error occured getting products by category' });
});

const getBySubCategory = asyncHandler(async (req, res) => {
  const subCat = req.query;
  const deSubCat = Object.entries(subCat);
  const valOne = deSubCat[0][1];
  if (valOne === 'Camera Systems') {
    const prod = await Product.find({ category: valOne });
    return res.status(201).json(prod);
  }
  if (valOne !== 'Camera Systems') {
    const prod = await Product.find({ subCategory: valOne });
    return res.status(201).json(prod);
  }
  return res
    .status(400)
    .json({ msg: 'Error occured getting products by subcategory' });
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getByCategory,
  getBySubCategory,
};
