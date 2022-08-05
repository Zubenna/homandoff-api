const express = require('express');
const connectDB = require('./config/db');
// const session = require("express-session");
// const path = require("path");
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config('.env');
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config(".env");
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(express.static("uploads"));
// app.use(cors());
// app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options('*', cors());
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/auth', authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

app.get('/', (req, res) => {
  res.send('Testing my API ');
  // res.redirect('/api/auth/createUser');
});

// app.get('/user', (req, res) => {
//   // res.send('Testing my API ');
//   res.redirect('/api/user');
// });

// app.get('/product', (req, res) => {
//   // res.send('Testing my API ');
//   res.redirect('/api/product');
// });

// app.get('/cart', (req, res) => {
//   // res.send('Testing my API ');
//   res.redirect('/api/cart');
// });

// app.get('/order', (req, res) => {
//   // res.send('Testing my API ');
//   res.redirect('/api/order');
// });

// app.get('/url', (req, res) => {
//   res.json(['Tony', 'Lisa', 'Michael', 'Ginger', 'Food']);
// });

// app.get('/', (req, res) => {
//   res.redirect('/url');
// });

// app.listen(process.env.PORT, () => {
//   console.log(`app is listening on port ${process.env.PORT}`);
//   // console.log(`app is listening on port 6050}`);
// });

module.exports = app;
