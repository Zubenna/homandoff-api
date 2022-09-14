const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const { verifyJWT, verifyTokenAndAdmin } = require('../middleware/verifyJWT');

router.route('/getAll').get(verifyJWT, productsController.getProducts);
router.route('/getByCat').get(verifyJWT, productsController.getByCategory);
router
  .route('/getBySubCat')
  .get(verifyJWT, productsController.getBySubCategory);
router.route('/createProduct').post(productsController.createProduct);
router.route('/updateProduct/:id').patch(productsController.updateProduct);
router.route('/deleteProduct/:id').delete(productsController.deleteProduct);

module.exports = router;
