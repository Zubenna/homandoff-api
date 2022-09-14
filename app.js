require('dotenv').config('.env');
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
// const session = require("express-session");
// const authRoute = require('./routes/auth');
// const userRoute = require('./routes/user');
// const productRoute = require('./routes/products');
// const cartRoute = require('./routes/cart');
// const orderRoute = require('./routes/order');
// const refreshRoute = require('./routes/refreshToken');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
// const dotenv = require('dotenv');

// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config(".env");
const app = express();
connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));

// app.use(express.static("public"));
// app.use(express.static("uploads"));
// app.use(cors());
app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: true,
//   })
// );
// app.options('*', cors());
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/cart', require('./routes/cartRoutes'));
app.use('/order', require('./routes/orderRoutes'));
// app.use('/api/user', userRoute);
// app.use('/api/product', productRoute);
// app.use('/api/auth', authRoute);
// app.use('/api/cart', cartRoute);
// app.use('/api/token', refreshRoute);
// app.use('/api/order', orderRoute);

app.get('/', (req, res) => {
  res.send('Testing my API ');
  // res.redirect('/api/auth/createUser');
});

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

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
