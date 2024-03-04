const mongoose = require("mongoose");
let connection = null;
async function connectDb() {
  if (connection) {
    console.log("mongodb is already connected ");
    return connection;
  }

  try {
    connection = await mongoose.connect(process.env.DB_LIVE, {
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB ");

    return connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

module.exports = {
  connectDb: connectDb,
};
