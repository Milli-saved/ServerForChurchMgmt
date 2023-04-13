const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/churchmgmtsystem",
      { useNewUrlParser: true, useUnifiedTopology: true, family: 4 }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectToDB;
