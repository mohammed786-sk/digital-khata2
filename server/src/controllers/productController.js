const product = require('../models/productSchema');

async function product_add(req, res){
    
    try {
    const {product_name, product_price, stock} = req.body;
    const newProduct = new product({product_name, product_price, stock});
    const savedProduct = await newProduct.save();
    res.status(201).json({message: "Product saved successfully", details: savedProduct});
    } catch (error) {
        console.error("Internal Database Error: ", error.message);
        res.status(500).json({error: "Internal Database Error", errorDetail: error.message});
    }
    
};

async function product_list(req, res) {
    try {
        const allProducts = await product.find({});
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
}

module.exports = { product_add, product_list }; // Note: export as object now
