const Customer = require('../models/mongoSchema');
const sqlDB = require('../config/db_mysql');
const sRouter = require('../routes/sell');

async function write (req, res) {
    try {
        const {customer, phone} = req.body;
        const newCustomer = new Customer({customer,phone});
        const registeredCustomer = await newCustomer.save();
        res.status(201).json({message: "customer successffully saved", details: registeredCustomer});
    } catch (error) {
        console.error("Error saving customer: ", error.message);
        res.status(500).json({error: "Could not save customer", details: error.message});
    }
};

module.exports = write;