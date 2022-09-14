const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const createUser = asyncHandler(async (req, res) => {
  // Get user details
  // console.log('Tracking Register Error');

  let {
    first_name,
    last_name,
    username,
    email,
    address,
    password,
    confirm_password,
    phone_number,
  } = req.body;

  // Vallidate number of phone digits
  let myRegex = /^[0-9]{11}$/;
  if (!phone_number.match(myRegex)) {
    res.status(400).json({ msg: 'Phone number must be 11 digits only' });
    return;
  }

  // Check required fields
  if (
    !first_name ||
    !last_name ||
    !email ||
    !address ||
    !password ||
    !confirm_password ||
    !phone_number
  ) {
    res.status(400).json({ msg: 'Required fields must not be empty' });
    return;
  }

  // Check dupllicate email
  const existingEmail = await User.findOne({ email }).lean().exec();
  if (existingEmail) {
    res.status(409).json({ msg: 'Email already exist' });
    return;
  }

  // Check dupllicate username
  const existingUname = await User.findOne({ username }).lean().exec();
  if (existingUname) {
    res.status(400).json({ msg: 'Username already exist' });
    return;
  }

  // Check username length
  const nameLength = username.length;
  if (!(nameLength >= 6 && nameLength < 16)) {
    res
      .status(400)
      .json({ msg: 'Username must be in the range 6 - 15 characters' });
    return;
  }

  // Check dupllicate phone number
  const existingNumber = await User.findOne({ phone_number }).lean().exec();
  if (existingNumber) {
    res.status(400).json({ msg: 'Phone Number already exist' });
    return;
  }
  // Confirm and Encrypt password
  if (password === confirm_password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  } else {
    res.status(400).json({ msg: 'Password must match' });
    return;
  }
  // console.log("Tracking Befor Create")
  // Create user
  const user = await User.create({
    first_name,
    last_name,
    username,
    email,
    address,
    password,
    phone_number,
  });

  if (user) {
    return res.status(201).json({ msg: 'Account created successfully' });
  } else {
    return res.status(400).json({ msg: 'Error occurred during registration' });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const query = req.query.new;
  // Get all users from MongoDB
  const users = query
    ? await User.find().select('-password').lean().sort({ _id: -1 }).limit(5)
    : await User.find().select('-password').lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' });
  }

  res.json(users);
});

//GET USER
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { password, ...otherInfo } = user._doc;
  if (!user) {
    res.status(400).json({ msg: 'User not found' });
  } else {
    res.status(200).json(otherInfo);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  let {
    // first_name,
    // last_name,
    username,
    email,
    // address,
    password,
    phone_number,
    // isAdmin,
  } = req.body;
  const id = req.params.id;
  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  // Check for duplicate username
  const duplicateUname = await User.findOne({ username }).lean().exec();
  const duplicateEmail = await User.findOne({ email }).lean().exec();
  const duplicatePhone = await User.findOne({ phone_number }).lean().exec();

  // Allow updates to the original user
  if (duplicateUname && duplicateUname?._id.toString() !== id) {
    return res.status(409).json({ msg: 'Duplicate username' });
  }

  if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
    return res.status(409).json({ msg: 'Duplicate Email' });
  }

  if (duplicatePhone && duplicatePhone?._id.toString() !== id) {
    return res.status(409).json({ msg: 'Duplicate Phone Number' });
  }

  // user.username = username;
  // user.first_name = first_name;
  // user.last_name = last_name;
  // user.email = email;
  // user.address = address;
  // user.phone_number = phone_number;
  // user.isAdmin = isAdmin;
  await User.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  // const updatedUser = await user.save();

  res.json({ msg: 'User updated successfully' });
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Confirm data
  if (!id) {
    return res.status(400).json({ msg: 'User ID Required' });
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  const result = await user.deleteOne();

  const reply = `User with username ${result.username} and ${result._id} deleted`;
  console.log('deleting user completed');
  res.json(reply);
});

const getStats = asyncHandler(async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ]);
  if (!data) {
    return res.status(500).json({ msg: 'Error getting users statistics' });
  } else {
    return res.status(200).json(data);
  }
});

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getStats,
};
