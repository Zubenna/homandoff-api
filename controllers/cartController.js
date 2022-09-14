const Cart = require('../models/Cart');
const asyncHandler = require('express-async-handler');

//CREATE
const createCart = asyncHandler(async (req, res) => {
  const newCart = new Cart(req.body);

  const savedCart = await newCart.save();
  if (savedCart) return res.status(201).json(savedCart);

  return res.status(400).json({ msg: 'Error creating cart' });
});

//UPDATE
const updateCart = asyncHandler(async (req, res) => {
  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (updatedCart) return res.status(201).json(updatedCart);

  return res.status(400).json({ msg: 'Error updating cart' });
});

//DELETE
const deleteCart = asyncHandler(async (req, res) => {
  const deletedCart = await Cart.findByIdAndDelete(req.params.id);
  if (deletedCart)
    return res
      .status(201)
      .json({ msg: `Cart item with id ${req.params.id} has been deleted` });

  return res.status(400).json({ msg: 'Error deleting cart item' });
});

//GET USER CART
const getUserCart = asyncHandler(async (req, res) => {
  const userCart = await Cart.findOne({ userId: req.params.userId });
  if (userCart) return res.status(201).json(userCart);

  return res.status(400).json({ msg: 'Error getting cart' });
});

//GET ALL CART ITEMS
const getAllCartItems = asyncHandler(async (req, res) => {
  const carts = await Cart.find();
  if (carts) return res.status(201).json(carts);

  return res.status(400).json({ msg: 'Error getting carts' });
});

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCartItems,
};
