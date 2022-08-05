const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true,
      uppercase: true,
      trim: true,
      maxLength: [15, 'Name too long'],
    },
    last_name: {
      type: String,
      require: true,
      uppercase: true,
      trim: true,
      maxLength: [15, 'Name too long'],
    },
    username: {
      type: String,
      uppercase: true,
      trim: true,
      maxLength: [15, 'Name too long'],
      minLenght: [6, 'username too short'],
      unique: [true, 'Username already exist'],
    },
    email: {
      type: String,
      require: true,
      uppercase: true,
      trim: true,
      maxLength: [25, 'Email too long'],
      unique: [true, 'Email already exist'],
    },
    address: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      maxLength: [100, 'Address too long'],
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    token: {
      type: String,
      default: null,
    },

    phone_number: {
      type: String,
      required: [true, 'Please enter your mobile number'],
      unique: [true, 'Number already in use'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
