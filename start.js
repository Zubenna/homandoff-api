const mongoose = require('mongoose');
const { logEvents } = require('./middleware/logger');
const app = require('./app');
require('dotenv').config('.env');
// const app = require("./app");
// app.listen(process.env.PORT || 8080, () => {
//     console.log(`app is listening on port ${process.env.PORT}`)
// })

mongoose.connection.once('open', () => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`app is listening on port ${process.env.PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log'
  );
});
