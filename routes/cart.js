const Cart = require('../models/Cart');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/checkAuth');
const router = require('express').Router();

//CREATE
router.post('createCat/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).send('Error creating cart');
  }
});

//UPDATE
router.put('editCat/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).send('Error updating cart');
  }
});

//DELETE
router.delete(
  '/deleteCat/:id',
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).send('Cart has been deleted...');
    } catch (err) {
      res.status(500).json('Error deleting cart');
    }
  }
);

//GET USER CART
router.get(
  '/userCart/:userId',
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).send('Error getting cart');
    }
  }
);

//GET ALL CART
router.get('/allCart', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).send('Error getting carts');
  }
});

module.exports = router;
