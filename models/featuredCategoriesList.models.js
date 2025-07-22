const mongoose = require("mongoose");

const featuredCategoryListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FeaturedCategoryList = mongoose.model(
  "FeaturedCategoryList",
  featuredCategoryListSchema
);
module.exports = FeaturedCategoryList;
