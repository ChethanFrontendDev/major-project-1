const FeaturedCategoryList = require("./models/featuredCategoriesList.models");
const { initializeDatabse } = require("./db/db.connect");
const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions))


app.use(express.json());

initializeDatabse();

async function createFeaturedCategoryList(FeaturedCategoryData) {
  try {
    const newFeaturedCategoryList = new FeaturedCategoryList(
      FeaturedCategoryData
    );
    const saveFeaturedCategoryList = await newFeaturedCategoryList.save();
    return saveFeaturedCategoryList;
  } catch (error) {}
}

app.post("/featuredCategories", async (req, res) => {
  try {
    const savedFeaturedCategoryList = await createFeaturedCategoryList(
      req.body
    );

    if (savedFeaturedCategoryList.length !== 0) {
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
