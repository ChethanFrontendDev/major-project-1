const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profilePictureUrl: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
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
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
module.exports = UserDetails;
