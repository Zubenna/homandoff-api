// const Order = require('../models/Order');
// const router = require('express').Router();
// // CREATE
// router.post('/createOrder', async (req, res) => {
//   console.log('In creatng order');
//   const { products, address, amount, userId, userName, isPaid } = req.body;
//   try {
//     await Order.create({
//       products,
//       address,
//       amount,
//       userId,
//       userName,
//       isPaid,
//     });
//     res.status(201).send('New Order Created');
//   } catch (err) {
//     res.status(500).send('Error creating Order');
//   }
// });

// //UPDATE
// router.put('/editOrder/:id', async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedOrder);
//   } catch (err) {
//     res.status(500).send('Error Updating Order');
//   }
// });

// //DELETE
// router.delete('/deleteOrder/:id', async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).send('Order has been deleted...');
//   } catch (err) {
//     res.status(500).send('Error deleting Order');
//   }
// });

// //GET USER ORDERS
// router.get('/getUserOrder/:userId', async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).send('Error getting user Order');
//   }
// });

// //GET ALL verifyTokenAndAdmin
// router.get('/getAllOrders', async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).send(orders);
//   } catch (err) {
//     res.status(500).send('Error getting all Orders');
//   }
// });

// // GET MONTHLY INCOME
// router.get('/monthlyIncome', async (req, res) => {
//   const productId = req.query.pid;
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
//   try {
//     const income = await Order.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: previousMonth },
//           ...(productId && {
//             products: { $elemMatch: { productId } },
//           }),
//         },
//       },
//       {
//         $project: {
//           month: { $month: '$createdAt' },
//           sales: '$amount',
//         },
//       },
//       {
//         $group: {
//           _id: '$month',
//           total: { $sum: '$sales' },
//         },
//       },
//     ]);
//     res.status(200).json(income);
//   } catch (err) {
//     res.status(500).send('Error getting monthly income');
//   }
// });

// module.exports = router;
