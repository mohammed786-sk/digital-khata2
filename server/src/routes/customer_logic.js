const router = require('express').Router();
const mysqlDB = require('../config/db_mysql');
const authenticateStaff = require('../middleware/auth_middleware');
const validatorCustomer = require('../utils/validator');
/*
router.post('/register', async (req,res) => {
    const message = validatorCustomer(req.body);
      if(message !=null){
        res.status(400).json({message:"Invalid Input", status:false, error:message});
    }
    try {
        const {customer_name, phone} = req.body;
        const sql = "INSERT INTO customers (customer_name, phone) VALUES (?, ?)";
        const[result] = await mysqlDB.execute(sql, [customer_name,phone]);
        res.status(201).json({message: "Customer Added successfully", result: result.insertId});
    } catch (error) {
        console.error("Customer could not be added error: ", error.message);
        res.status(500).json({error: "Could not save customer: ", details: error.message});
    }
});

router.get('/customer/:id', async(req, res) => {
    try{
        const sql = 'SELECT * FROM customers WHERE id= ?';
        const [rows] = await mysqlDB.execute(sql, [req.params.id]);
        res.status(200).json({customer :rows[0]});
    }catch(error){
        console.error("Internal server error: ", error.message);
        res.status(500).json({error: "Internal Server error", Message: error.Message});
    }
    
});

router.post('/products', authenticateStaff, (req,res)=>{
    res.json({message: "Staff can add products"});
});
*/



// Now protected: Only staff can register new customers
router.post('/register', async (req,res) => {
    const message = validatorCustomer(req.body);
      if(message !=null){
        return res.status(400).json({message:"Invalid Input", status:false, error:message});
    }
    try {
        const {customer_name, phone} = req.body;
        const sql = "INSERT INTO customers (customer_name, phone) VALUES (?, ?)";
        const[result] = await mysqlDB.execute(sql, [customer_name,phone]);
        res.status(201).json({message: "Customer Added successfully", result: result.insertId});
    } catch (error) {
        console.error("Customer could not be added error: ", error.message);
        return res.status(500).json({error: "Could not save customer: ", details: error.message});
    }
});
router.get('/customer/:id/history', async (req, res) => {
    try {
        const customerId = req.params.id;

        // 1. Get Transaction List
        const listSql = `
            SELECT item_name, amount, created_at 
            FROM transactions 
            WHERE customer_id = ? 
            ORDER BY created_at DESC`;
        const [history] = await mysqlDB.execute(listSql, [customerId]);

        // 2. Get Total Sum (Debt)
        const sumSql = "SELECT SUM(amount) AS totalDebt FROM transactions WHERE customer_id = ?";
        const [sumResult] = await mysqlDB.execute(sumSql, [customerId]);
        const totalDebt = sumResult[0].totalDebt || 0;

        res.status(200).json({
            history,
            totalDebt
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch history", details: error.message });
    }
});
/*
router.get('/customer/:id/history', async (req, res) => {
    try {
        const sql = `
            SELECT item_name, amount, created_at 
            FROM transactions 
            WHERE customer_id = ? 
            ORDER BY created_at DESC`;
        const [rows] = await mysqlDB.execute(sql, [req.params.id]);
        
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch history", details: error.message });
    }
});
*/
router.get('/search', async (req, res) => {
    const { q } = req.query; // e.g. /api/search?q=John
    try {
        let sql, params;
        if (!isNaN(q)&& q.trim() !== "") {
            sql = "SELECT * FROM customers WHERE id = ?";
            params = [q];
        } else {
            sql = "SELECT * FROM customers WHERE customer_name LIKE ? AND is_active = TRUE";
            params = [`%${q}%`];
        }
        const [rows] = await mysqlDB.execute(sql, params);
        return res.json(rows); // Frontend handles if rows.length > 1
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
// UPDATE Customer
router.put('/customer/:id', authenticateStaff, async (req, res) => {
    const { customer_name, phone } = req.body;
    try {
        const sql = "UPDATE customers SET customer_name = ?, phone = ? WHERE id = ?";
        await mysqlDB.execute(sql, [customer_name, phone, req.params.id]);
        res.json({ message: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// SOFT DELETE Customer
router.delete('/customer/:id', authenticateStaff, async (req, res) => {
    try {
        const sql = "UPDATE customers SET is_active = FALSE WHERE id = ?";
        await mysqlDB.execute(sql, [req.params.id]);
        res.json({ message: "Customer deactivated (Soft Deleted)" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// DELETE (Clear) Customer Debt
router.delete('/customer/:id/clear-debt', authenticateStaff, async (req, res) => {
    try {
        const customerId = req.params.id;
        
        // Delete all transactions for this customer
        const sql = "DELETE FROM transactions WHERE customer_id = ?";
        const [result] = await mysqlDB.execute(sql, [customerId]);

        res.status(200).json({ 
            message: "Debt settled and history cleared", 
            affectedRows: result.affectedRows 
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to clear debt", details: error.message });
    }
});

module.exports = router;
/*
6.2 Customer Update & Soft Delete (MySQL)
Update routes/customer_logic.js with these minimal routes.
*/

/*
Step 2: Dummy Data & Dashboard Logic
The Implementation Plan:
Seeding: A simple script seed.js to populate MySQL and MongoDB with related data.
Dashboard Logic: Update controllers/summaryController.js to perform the "Heavy Lifting" queries (Total Debt, Top Debtor, Latest Transaction).
Search Logic: Add a search endpoint that detects if the input is a Number (ID) or String (Name).
2.3 Search Functionality (routes/customer_logic.js)
Add this route to handle both ID and Name searches.
*/
/*
5.2 Update routes/customer_logic.js (MySQL Customer)
*/
