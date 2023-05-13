const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/templatedb");

module.exports = mongoose.connection;
