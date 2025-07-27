const FeaturedCategoryList = require("./models/featuredCategoriesList.models");
const ProductsData = require("./models/productsData.models");
const UserDetails = require("./models/userDetails.models");
const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

initializeDatabase();

// !Featured Categories

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

// !Products Data

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

async function readAllProductsData() {
  try {
    const readAllProducts = await ProductsData.find();
    return readAllProducts;
  } catch (error) {
    throw error;
  }
}

app.get("/featuredCategories/products/", async (req, res) => {
  try {
    const readallProducts = await readAllProductsData();
    if (readallProducts && readallProducts.length > 0) {
      res.json(readallProducts);
    } else {
      res.status(404).json({ error: "Product does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get all products" });
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

const normalizeText = (text) => text.replace(/’/g, "'"); // convert curly to straight apostrophe

app.get(
  "/featuredCategories/products/:featuredCategoryName",
  async (req, res) => {
    try {
      const rawParam = req.params.featuredCategoryName;
      const featuredCategoryName = normalizeText(rawParam);

      const readProducts = await readProductsByName(featuredCategoryName);

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

async function readProductsById(productId) {
  try {
    const readProducts = await ProductsData.findById(productId);
    return readProducts;
  } catch (error) {
    throw error;
  }
}

app.get(
  "/featuredCategories/products/:featuredCategoryName/:productId",
  async (req, res) => {
    try {
      const readProducts = await readProductsById(req.params.productId);
      if (readProducts) {
        res.json(readProducts);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed fetch products by id." });
    }
  }
);

async function updateProductById(productId, dataToUpdate) {
  try {
    const updateProduct = await ProductsData.findByIdAndUpdate(
      productId,
      dataToUpdate,
      { new: true }
    );
    return updateProduct;
  } catch (error) {
    throw error;
  }
}

app.post(
  "/featuredCategories/products/:featuredCategoryName/:productId",
  async (req, res) => {
    try {
      const updatedProduct = await updateProductById(
        req.params.productId,
        req.body
      );
      if (updatedProduct) {
        res.status(200).json({
          message: "Product updated successfully.",
          product: updatedProduct,
        });
      } else {
        res.status(404).json({ error: "Product does not exist." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update add to cart status." });
    }
  }
);

// !User Details

async function createUser(userData) {
  try {
    const newUser = new UserDetails(userData);
    const saveUser = await newUser.save();
    return saveUser;
  } catch (error) {
    throw error;
  }
}

app.post("/profile", async (req, res) => {
  try {
    const saveUserData = await createUser(req.body);

    if (saveUserData) {
      res
        .status(200)
        .json({ message: "User added successfully.", user: saveUserData });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add user data" });
  }
});

async function readUserDetails() {
  try {
    const readUser = await UserDetails.find();
    return readUser;
  } catch (error) {
    throw error;
  }
}

app.get("/profile", async (req, res) => {
  try {
    const readUserInfo = await readUserDetails();

    if (readUserInfo) {
      res.json(readUserInfo);
    } else {
      res.status(404).json({ error: "User does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get user data." });
  }
});

async function updateUserAddress(userId, addressId, dataToUpdate) {
  try {
    const updateAddress = await UserDetails.findOneAndUpdate(
      { _id: userId, "address._id": addressId },
      {
        $set: {
          "address.$.fullName": dataToUpdate.fullName,
          "address.$.phoneNumber": dataToUpdate.phoneNumber,
          "address.$.addressLine": dataToUpdate.addressLine,
          "address.$.landMark": dataToUpdate.landMark,
          "address.$.zipCode": dataToUpdate.zipCode,
        },
      },
      { new: true }
    );
    return updateAddress;
  } catch (error) {
    throw error;
  }
}

app.post("/profile/user/:userId/address/:addressId", async (req, res) => {
  try {
    const updatedAddress = await updateUserAddress(
      req.params.userId,
      req.params.addressId,
      req.body
    );

    if (updatedAddress) {
      res.status(200).json({
        message: "user address updated successfully.",
        userAddress: updatedAddress,
      });
    } else {
      res.status(404).json({ error: "user does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user address." });
  }
});

async function appendUserAddress(userId, newAddress) {
  try {
    const appendAddress = await UserDetails.findByIdAndUpdate(
      userId,
      { $push: { address: newAddress } },
      { new: true }
    );
    return appendAddress;
  } catch (error) {
    throw error;
  }
}

app.post("/profile/user/:userId/address", async (req, res) => {
  try {
    const appendAddress = await appendUserAddress(req.params.userId, req.body)
    
    if(appendAddress){
      res.status(200).json({message: "Address added successfully.", address: appendAddress})
    } else {
      res.status(404).json({error: "address not found."})
    }
  } catch (error) {
    res.status(500).json({error: "Failed to append user address."})
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
