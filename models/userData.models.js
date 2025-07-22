const mongoose = require("mongoose");

const userData = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: [
    {
      fullName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      addressLine: {
        type: String,
        required: true,
      },
      landMark: {
        type: String,
      },
      zipCode: {
        type: Number,
        required: true,
      },
    },
  ],
});
