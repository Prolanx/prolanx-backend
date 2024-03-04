const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    // role: {  type: String, required: true },
    verified: { type: Boolean, default: false },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("accounts", schema);
module.exports = { Account };
