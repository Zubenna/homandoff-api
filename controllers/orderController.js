const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

// CREATE
const createOrder = asyncHandler(async (req, res) => {
  //   console.log('In creatng order');
  const { products, address, amount, userId, userName, isPaid } = req.body;

  const order = await Order.create({
    products,
    address,
    amount,
    userId,
    userName,
    isPaid,
  });

  if (order) return res.status(201).json({ msg: 'New Order Created' });

  return res.status(400).json({ msg: 'Error creating Order' });
});

//UPDATE
const updateOrder = asyncHandler(async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (updatedOrder) return res.status(201).json(updatedOrder);

  return res.status(400).json({ msg: 'Error Updating Order' });
});

//DELETE
const deleteOrder = asyncHandler(async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  if (deletedOrder)
    return res
      .status(201)
      .json({ msg: `Order with id ${req.params.id} has been deleted` });
  return res.status(400).json({ msg: 'Error deleting Order' });
});

//GET USER ORDERS
const getUserOrder = asyncHandler(async (req, res) => {
  const userOrder = await Order.find({ userId: req.params.userId });
  if (userOrder) return res.status(201).json(userOrder);
  return res.status(400).json({ msg: 'Error getting user Order' });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  if (orders) return res.status(201).json(orders);
  return res.status(400).json({ msg: 'Error getting all orders' });
});

// GET MONTHLY INCOME
const monthlyIncome = asyncHandler(async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonth },
        ...(productId && {
          products: { $elemMatch: { productId } },
        }),
      },
    },
    {
      $project: {
        month: { $month: '$createdAt' },
        sales: '$amount',
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: '$sales' },
      },
    },
  ]);

  if (income) return res.status(201).json(income);

  return res.status(400).json({ msg: 'Error getting monthly income' });
});

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
  monthlyIncome,
};
