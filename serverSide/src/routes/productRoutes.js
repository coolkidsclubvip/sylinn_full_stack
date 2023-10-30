// CENTRAL ROUTE FILE
// Import express and router
const express = require("express");
const router = express.Router();

// Import modules
const ProductController = require("../controllers/productController");
const fileServerUpload = require("../middleware/fileServerUpload");
const productPolicy = require("../policies/productPolicy");
const filePolicy = require("../policies/filePolicy");
const verifyAuth = require("../middleware/verifyAuth");
const productController = require("../controllers/productController");

// Setup routes within export function
module.exports = () => {
  // GET ALL Products
  router.get("/", ProductController.getAllProducts);

  // Delete Image from bucket by name, use Post to send image
  router.post("/deleteImage", productController.deleteProductImage);

  // Search Products by collection keywords////to be completed
  router.get("/search/:keyword", ProductController.getProductByKeyword);

  // Get ALL Collections under a certain category
  router.get("/:category", ProductController.getCollections);

  // GET a certain product collection under a certain category === AKA GET PRODUCT BY ID
  router.get("/:category/:collection", ProductController.getProduct);

  // GET onSALE Products

  // POST Product
  router.post(
    "/",

    [
      verifyAuth.auth,
      verifyAuth.admin,
      productPolicy.validateProduct, // this is Joi validation
      filePolicy.filePayloadExists,
      filePolicy.fileSizeLimiter,
      filePolicy.fileExtensionLimiter([
        ".png",
        ".jpg",
        ".jpeg",
        ".avif",
        ".gif",
        ".pdf",
      ]),
      fileServerUpload,
    ], // use[] array brackets ensures process order
    ProductController.postProduct
  );

  // UPDATE BY ID Product

  // DELETE BY ID Product
  router.delete(
    "/:category/:id",
    [verifyAuth.auth, verifyAuth.admin],
    ProductController.deleteProductById
  );

  return router;
};
