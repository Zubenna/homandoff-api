// const router = require('express').Router();
// const Product = require('../models/Product');
// const verifyRoles = require('../middleware/verifyRoles');
// const ROLES_LIST = require('../config/role_list');
// const verifyJWT = require('../middleware/verifyJWT');
// const { verifyTokenAndAdmin } = require('../middleware/checkAuth');

// use later verifyTokenAndAdmin
// router.post(
//   '/createProduct',
//   verifyRoles(ROLES_LIST.isAdmin),
//   async (req, res) => {
//     const {
//       name,
//       description,
//       price,
//       category,
//       subCategory,
//       countInStock,
//       brand,
//       type,
//       rating,
//       modelNo,
//       skuNo,
//       image,
//     } = req.body;
//     console.log('Inside Creating product');
    // console.log(name);
    // console.log(description);
    // console.log(price);
    // console.log(category);
    // console.log(subCategory);
    // console.log(countInStock);
    // console.log(brand);
    // console.log(type);
    // console.log(rating);
    // console.log(modelNo);
    // console.log(skuNo);
    // console.log(image);
//     try {
//       await Product.create({
//         name,
//         description,
//         price,
//         category,
//         subCategory,
//         countInStock,
//         brand,
//         type,
//         rating,
//         modelNo,
//         skuNo,
//         image,
//       });

//       res.status(200).send('Product created successfully');
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   }
// );

// router.patch(
//   '/editProduct/:id',
//   verifyRoles(ROLES_LIST.isAdmin),
//   async (req, res) => {
//     console.log(req.body);
//     try {
//       await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).send('Product updated successfully');
//     } catch (error) {
//       res.status(500).send('Error updating product');
//     }
//   }
// );

// router.delete(
//   '/deleteProduct/:id',
//   verifyRoles(ROLES_LIST.isAdmin),
//   async (req, res) => {
//     console.log('In delete');
//     try {
//       const prod = await Product.findByIdAndDelete(req.params.id);
//       // const prod = await Product.deleteMany({});

//       if (!prod) res.status(404).send('No Product found');
//       res.status(200).send('Product deleted successfully');
//     } catch (error) {
//       res.status(500).send('Error deleting product');
//     }
//   }
// );
// // verifyTokenAndAdmin
// router.get('/getProducts', async (req, res) => {
//   const prod = await Product.find({});
//   try {
//     res.send(prod);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.get('/getProducts/catquery', async (req, res) => {
//   try {
//     const cat = req.query;
//     const deCat = Object.entries(cat);
//     const valOne = deCat[0][1];
//     const prod = await Product.find({ category: valOne });
//     res.send(prod);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.get('/getProducts/subcatquery', async (req, res) => {
//   try {
//     const subCat = req.query;
//     const deSubCat = Object.entries(subCat);
//     const valOne = deSubCat[0][1];
//     if (valOne === 'Camera Systems') {
//       const prod = await Product.find({ category: valOne });
//       res.send(prod);
//     } else {
//       const prod = await Product.find({ subCategory: valOne });
//       res.send(prod);
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// module.exports = router;
