const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  fullName: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  landmark: {
    type: String,
  },
  colony: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: [addressSchema],
      default: [],
    },
    name: {
      type: String,
    },
    googleId: String,
    facebookId: String,
    appleId: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
