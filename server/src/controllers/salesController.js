const processSale = require('../utils/sale_logic');

async function sales (req, res){
    const {customerId, productName} = req.body;
    try {
        const result = await processSale(customerId, productName);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:"Sale failed", status: false, error:error.message});
    }
};

module.exports = sales;