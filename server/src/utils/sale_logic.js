const product = require('../models/productSchema');
const Customer = require('../models/mongoSchema'); // Added Mongo Customer model
const mysql = require('../config/db_mysql');

const processSale = async (customerId, productName) => {
    // Get a specific connection for the transaction
    const connection = await mysql.getConnection(); 
    try {
        await connection.beginTransaction();

        const [mysqlRows] = await connection.execute("SELECT * FROM customers WHERE id = ?", [customerId]);
        if (mysqlRows.length === 0) throw new Error("Customer not found");

        // Sync to Mongo if needed
        let mongoCust = await Customer.findOne({ mysqlId: customerId });
        if (!mongoCust) {
            mongoCust = new Customer({ customer: mysqlRows[0].customer_name, phone: mysqlRows[0].phone, mysqlId: customerId });
            await mongoCust.save();
        }

        const item = await product.findOne({ product_name: productName });
        if (!item || item.stock < 1) throw new Error("Item out of stock");

        // MySQL Write
        await connection.execute("INSERT INTO transactions (customer_id, item_name, amount) VALUES (?,?,?)", 
            [customerId, productName, item.product_price]);

        // MongoDB Write
        item.stock -= 1;
        await item.save();

        await connection.commit(); // Success: Save both
        return { message: "Sale Successful", remainingStock: item.stock };
    } catch (error) {
        await connection.rollback(); // Failure: Undo MySQL
        throw error;
    } finally {
        connection.release();
    }
};
module.exports = processSale;
/*
Step 1 Refinement: Atomic Transaction
To prevent a "Ghost Sale" (where a transaction is recorded in MySQL but the stock isn't reduced in Mongo), we use a MySQL transaction. If Mongo fails, we rollback MySQL.
Updated utils/sale_logic.js (Minimal Change):
*/
/*
const processSale = async (customerId, productName) => {
    // 1. Verify Customer exists in MySQL and get details
    const [mysqlRows] = await mysql.execute("SELECT * FROM customers WHERE id = ?", [customerId]);
    if (mysqlRows.length === 0) throw new Error("Customer does not exist in MySQL");
    const mysqlCust = mysqlRows[0];

    // 2. Ensure Customer exists in MongoDB (Sync/Cross-Reference)
    let mongoCust = await Customer.findOne({ mysqlId: customerId });
    if (!mongoCust) {
        console.log("Syncing customer to MongoDB...");
        mongoCust = new Customer({
            customer: mysqlCust.customer_name,
            phone: mysqlCust.phone,
            mysqlId: mysqlCust.id
        });
        await mongoCust.save();
    }

    // 3. Product & Stock Check
    const item = await product.findOne({ product_name: productName });
    if (!item || item.stock < 1) throw new Error("Item out of stock");

    try {
        // 4. Record Transaction in MySQL
        const sql = "INSERT INTO transactions (customer_id, item_name, amount) VALUES (?,?,?)";
        await mysql.execute(sql, [customerId, productName, item.product_price]);

        // 5. Decrement Stock in MongoDB
        item.stock -= 1;
        await item.save();

        return { 
            status: "Success", 
            customer: mongoCust.customer, 
            remainingStock: item.stock 
        };
    } catch (error) {
        console.error("Database Error", error.message);
        throw error;
    }
};
*/


/*
const product = require('../models/productSchema');
const mysql = require('../config/db_mysql');

const processSale = async (customerId, productName) => {

    console.log(`Starting Sale for Customer_ID: ${customerId}, Item: ${productName}`);

    const item = await product.findOne({product_name: productName});
    if(!item || item.stock <1){
        throw new Error("Item out of stock");
    }
    try {
        const sql = "INSERT INTO transactions (customer_id, item_name, amount) VALUES (?,?,?)";
        await mysql.execute(sql, [customerId, productName, item.product_price]);
        const verify = "SELECT id FROM transactions ORDER BY id DESC LIMIT 1"
        const [sqlRes] = await mysql.execute(verify);
        console.log(`MySQL saved new ID: `,sqlRes);

        item.stock -=1;
        await item.save();

        console.log(`Mongo Updated, New stock ${item.product_name}: ${item.stock}`);
        return {message: "Verified Sale", message: "Sale Successful", remainingStock: item.stock}
    } catch (error) {
        console.error("Database Error", error.message);
        throw error;
    }
};

module.exports = processSale;
*/