const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://Admin:Tamuno2020@homandoffcluster.kjgqg.mongodb.net/testDB?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo DB conected: ${conn.connection.host}`);
  } catch (err) {
    console.log('database connection failed. exiting now...');
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
