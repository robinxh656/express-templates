const mongoose = require('mongoose');

const connectDB = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl).then((data) => {
      console.log(`Database connection with ${data.connection.host}`);
    });
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

module.exports = {
  connectDB,
};
