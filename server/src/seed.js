const mysql = require('./config/db_mysql');
const connectMongo = require('./config/db_mongo');
const Product = require('./models/productSchema');
const Customer = require('./models/mongoSchema');

const seed = async () => {
    try {
        await connectMongo();
        console.log("Starting Demo Seeding...");

        // 1. Clear existing data (Careful! This resets the demo)
        await Product.deleteMany({});
        await Customer.deleteMany({});
        await mysql.execute("SET FOREIGN_KEY_CHECKS = 0");
        await mysql.execute("TRUNCATE TABLE transactions");
        await mysql.execute("TRUNCATE TABLE customers");
        await mysql.execute("SET FOREIGN_KEY_CHECKS = 1");

        // 2. Insert 10 Products into MongoDB
        const products = [
            { name: 'Milk', price: 25, stock: 100 },
            { name: 'Wheat Flour 10kg', price: 450, stock: 40 },
            { name: 'Cooking Oil 1L', price: 180, stock: 60 },
            { name: 'Sugar 1kg', price: 45, stock: 200 },
            { name: 'Tea Powder 250g', price: 120, stock: 80 },
            { name: 'Soap Bar', price: 35, stock: 150 },
            { name: 'Rice 5kg', price: 300, stock: 50 },
            { name: 'Lentils 1kg', price: 140, stock: 90 },
            { name: 'Biscuits Pack', price: 20, stock: 300 },
            { name: 'Salt 1kg', price: 20, stock: 100 }
        ];
        
        const createdProducts = await Product.insertMany(
            products.map(p => ({ product_name: p.name, product_price: p.price, stock: p.stock }))
        );
        console.log("✅ 10 Products seeded in MongoDB");

        // 3. Insert 50 Customers into MySQL & MongoDB (Cross-Referenced)
        for (let i = 1; i <= 50; i++) {
            const name = `Customer ${i}`;
            const phone = `98450${i.toString().padStart(5, '0')}`;
            
            // Insert into MySQL
            const [res] = await mysql.execute(
                "INSERT INTO customers (customer_name, phone) VALUES (?, ?)", 
                [name, phone]
            );
            const mysqlId = res.insertId;

            // Mirror into MongoDB (The Cross-Reference)
            await Customer.create({
                customer: name,
                phone: phone,
                mysqlId: mysqlId
            });
        }
        console.log("✅ 50 Customers seeded and Cross-Referenced");

        // 4. Insert 500 Random Transactions into MySQL
        console.log("Generating 500 transactions... please wait.");
        const transactionValues = [];
        for (let i = 0; i < 500; i++) {
            const randomCustId = Math.floor(Math.random() * 50) + 1;
            const randomProd = createdProducts[Math.floor(Math.random() * 10)];
            
            // Format: [item_name, amount, customer_id]
            transactionValues.push([randomProd.product_name, randomProd.product_price, randomCustId]);
        }

        const sql = "INSERT INTO transactions (item_name, amount, customer_id) VALUES ?";
        await mysql.query(sql, [transactionValues]);
        
        console.log("✅ 500 Transactions seeded in MySQL");
        console.log("\nDEMO DATA READY!");
        process.exit();

    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seed();
/*
const mysql = require('./config/db_mysql');
const product = require('./models/productSchema');
const connectMongo = require('./config/db_mongo');

const seed = async () => {
    await connectMongo();
    // 1. Clear & Seed Mongo Products
    await product.deleteMany({});
    await product.insertMany([
        { product_name: 'Milk', product_price: 25, stock: 50 },
        { product_name: 'Bread', product_price: 40, stock: 15 },
        { product_name: 'Eggs', product_price: 6, stock: 100 }
    ]);

    // 2. Seed MySQL Customers & Transactions
    await mysql.execute("INSERT INTO customers (id, customer_name, phone) VALUES (1, 'John Doe', '1234567890') ON DUPLICATE KEY UPDATE id=id");
    await mysql.execute("INSERT INTO transactions (customer_id, item_name, amount) VALUES (1, 'Bread', 40.00)");
    
    console.log("Seeding Complete. Press Ctrl+C to exit.");
};
seed();
*/
/*
2.1 Seed Script (seed.js - Root Folder)
Run this once to see the dashboard in action.
*/
/*
Run this SQL command to add the is_active column to your database:
ALTER TABLE customers ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
*/