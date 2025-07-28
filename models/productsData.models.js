const mongoose = require("mongoose");

const ProductsDataSchema = new mongoose.Schema(
  {
    featuredCategory: {
      type: String,
    },
    productName: {
      type: String,
      required: true,
    },
    productUrl: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountRate: {
      type: Number,
      required: true,
    },
    selectedSize: {
      type: String,
      enum: ["S", "M", "XL", "XXL"],
      default: "M",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    isAddedToCart: {
      type: Boolean,
      default: false,
      required: true,
    },
    isAddedToWishlist: {
      type: Boolean,
      default: false,
      required: true,

    },
    isPayOnDeliveryAvailable: {
      type: Boolean,
      default: false,
      required: true,

    },
    isFreeDeliveryAvailable: {
      type: Boolean,
      default: false,
      required: true,

    },
    isSecurePayment: {
      type: Boolean,
      default: false,
      required: true,

    },
    numberOfReturnableDays: {
      type: Number,
      required: true,
    },
    description: {
      type: [String],
    },
  },
  { timestamps: true }
);

const ProductsData = mongoose.model("ProductsData", ProductsDataSchema);
module.exports = ProductsData;
