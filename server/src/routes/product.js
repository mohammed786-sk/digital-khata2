/*
Step 5: Staff-Only Product & Customer Addition
The Implementation Plan:
Protect Routes: Apply the authenticateStaff middleware to the POST routes for both products (MongoDB) and customers (MySQL).
5.1 Update routes/product.js (MongoDB Product)
*/
const pRouter = require('express').Router();
const {product_add, product_list} = require('../controllers/productController');
const authenticateStaff = require('../middleware/auth_middleware');
const product = require('../models/productSchema');

// Now protected: Only staff with API key can add products
pRouter.post('/add', authenticateStaff, product_add);
pRouter.get('/', product_list); 

// UPDATE Product
pRouter.put('/:id', authenticateStaff, async (req, res) => {
    try {
        const updatedProduct = await product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json({ message: "Product updated", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE Product
pRouter.delete('/:id', authenticateStaff, async (req, res) => {
    try {
        await product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product permanently removed from inventory" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/*
6.3 Product Update & Delete (MongoDB)
Update routes/product.js with these minimal routes.
*/
module.exports = pRouter;

/*
const pRouter = require('express').Router();
const product_add = require('../controllers/productController');

pRouter.post('/add', product_add);

module.exports = pRouter;
*/