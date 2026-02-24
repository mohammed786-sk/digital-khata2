const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customer: { type: String },
    phone: { type: String },
    mysqlId: { type: Number, unique: true, sparse: true } // Cross-reference key
});

const Customer = mongoose.model("newcustomer", customerSchema);
module.exports = Customer;
/*
The Implementation Plan:
Schema Update: Add a mysqlId field to mongoSchema.js. This creates a hard link between the two databases.
Logic Update in sale_logic.js:
Before processing the sale, query MySQL to get the customer's details (name/phone).
Check if that customer exists in MongoDB using the mysqlId.
If they don't exist in Mongo, create them on the fly using the data retrieved from MySQL.
Only once the "Cross-Reference" is confirmed does the transaction proceed.
Step 1: Code Changes
1.1 Update models/mongoSchema.js
We add mysqlId to store the MySQL Primary Key.
*/

/*
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customer: {
        type: String
    },
    phone: {
        type: String
    }
});

const Customer = mongoose.model("newcustomer", customerSchema);

module.exports = Customer;
*/