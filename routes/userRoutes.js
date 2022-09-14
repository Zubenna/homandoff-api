const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const { verifyJWT, verifyTokenAndAdmin } = require('../middleware/verifyJWT');

router.route('/getAll').get(usersController.getAllUsers);
router.route('/getOne/:id').get(usersController.getUser);
router.route('/getStats').get(usersController.getStats);
router.route('/createUser').post(usersController.createUser);
router.route('/updateUser/:id').patch(usersController.updateUser);
router.route('/deleteUser/:id').delete(usersController.deleteUser);

module.exports = router;
