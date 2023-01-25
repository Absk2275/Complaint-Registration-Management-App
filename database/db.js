const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Admin:kUQChDm8OGq2EZHG@complaintmgmt.ik1bh.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
