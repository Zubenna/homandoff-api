const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyJWT, verifyTokenAndAdmin } = require('../middleware/verifyJWT');

router.route('/getAll').get(verifyJWT, cartController.getAllCartItems);
router.route('/getUserCart').get(cartController.getUserCart);
router.route('/createCart').post(verifyJWT, cartController.createCart);
router.route('/updateCart/:id').patch(verifyJWT, cartController.updateCart);
router.route('/deleteCart/:id').delete(verifyJWT, cartController.deleteCart);

module.exports = router;
