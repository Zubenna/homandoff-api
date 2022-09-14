const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyJWT, verifyTokenAndAdmin } = require('../middleware/verifyJWT');

router.route('/getAll').get(orderController.getAllOrders);
router.route('/getUserOrder').get(verifyJWT, orderController.getUserOrder);
router.route('/createOrder').post(orderController.createOrder);
router.route('/updateOrder/:id').patch(verifyJWT, orderController.updateOrder);
router.route('/deleteOrder/:id').delete(verifyJWT, orderController.deleteOrder);
router
  .route('/monthlyIncome')
  .get(orderController.monthlyIncome);

module.exports = router;
