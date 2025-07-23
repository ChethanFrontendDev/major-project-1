const FeaturedCategoryList = require("./models/featuredCategoriesList.models");
const ProductsData = require("./models/productsData.models");
const { initializeDatabse } = require("./db/db.connect");
const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

initializeDatabse();

async function createFeaturedCategoryList(FeaturedCategoryData) {
  try {
    const newFeaturedCategoryList = new FeaturedCategoryList(
      FeaturedCategoryData
    );
    const saveFeaturedCategoryList = await newFeaturedCategoryList.save();
    return saveFeaturedCategoryList;
  } catch (error) {
    throw error;
  }
}

app.post("/featuredCategories", async (req, res) => {
  try {
    const savedFeaturedCategoryList = await createFeaturedCategoryList(
      req.body
    );

    if (savedFeaturedCategoryList) {
      res.status(200).json({
        message: "Featured Category Added Successfully",
        featuredCategories: savedFeaturedCategoryList,
      });
    } else {
      res.status(400).json({ error: "Featured Category Not Found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add Featured Categories." });
  }
});

async function readAllFeaturedCategory() {
  try {
    const featuredCategoryList = await FeaturedCategoryList.find();
    return featuredCategoryList;
  } catch (error) {
    throw error;
  }
}

app.get("/featuredCategories", async (req, res) => {
  try {
    const readFeaturedCategoryList = await readAllFeaturedCategory();

    if (readFeaturedCategoryList.length !== 0) {
      res.json(readFeaturedCategoryList);
    } else {
      res.status(404).json({ error: "featured category not found. " });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch featured category. " });
  }
});

async function createProductList(productsData) {
  try {
    const newProductList = new ProductsData(productsData);
    const saveProductsData = await newProductList.save();
    return saveProductsData;
  } catch (error) {
    throw error;
  }
}

app.post("/featuredCategories/products/", async (req, res) => {
  try {
    const savedProductsData = await createProductList(req.body);

    if (savedProductsData) {
      res.status(200).json({
        message: "product added successfully.",
        products: savedProductsData,
      });
    } else {
      res.status(404).json({ error: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add products." });
  }
});

async function readProductsByName(featuredCategoryName) {
  try {
    const products = await ProductsData.find({
      featuredCategory: featuredCategoryName,
    });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get(
  "/featuredCategories/products/:featuredCategoryName",
  async (req, res) => {
    try {
      const readProducts = await readProductsByName(
        req.params.featuredCategoryName
      );

      if (readProducts && readProducts.length > 0) {
        res.json(readProducts);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products." });
    }
  }
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
