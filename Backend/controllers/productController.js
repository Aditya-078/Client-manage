const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");


// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;
  
    //   Validation
    if (!name || !category || !quantity || !price || !description) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }



    // Create Product
const product = await Product.create({
    user:req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    
  });

  res.status(201).json(product);
});


 



module.exports = {
    createProduct,
}