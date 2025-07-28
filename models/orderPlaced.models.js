const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
  },
  isAddedToWishlist: {
    type: Boolean,
    default: false,
  },
  isPayOnDeliveryAvailable: {
    type: Boolean,
    default: false,
  },
  isFreeDeliveryAvailable: {
    type: Boolean,
    default: false,
  },
  isSecurePayment: {
    type: Boolean,
    default: false,
  },
  numberOfReturnableDays: {
    type: Number,
    required: true,
  },
  description: {
    type: [String],
  },
});

const orderPlacedSchema = new mongoose.Schema(
  {
    products: [productSchema],
    address: {
      fullName: String,
      addressLine: String,
      landMark: String,
      phoneNumber: String,
      zipCode: String,
    },
    deliveryCharges: {
      type: Number,
      required: true,
    },
    totalCartValue: {
      type: Number,
      required: true,
    },
    totalItemDiscount: {
      type: Number,
      required: true,
    },
    totalItemPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderPlaced = mongoose.model("OrderPlaced", orderPlacedSchema);
module.exports = OrderPlaced;
