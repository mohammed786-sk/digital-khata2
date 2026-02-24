const express = require('express');
const cors = require('cors');
const mysql = require('./config/db_mysql');
const connectMongo = require('./config/db_mongo');
const router = require('./routes/customer_logic');
const pRouter = require('./routes/product');
const sRouter = require('./routes/sell');
const summary = require('./routes/summary');
const wRouter = require('./routes/weather');
const testRouter = require('./routes/test');

require('dotenv').config();
const app = express();
connectMongo();
app.use(cors());
app.use(express.json());

// Resource-based naming for predictable frontend calls
app.use('/api/customers', router); // All customer CRUD
app.use('/api/products', pRouter);  // All product CRUD
app.use('/api/sales', sRouter);     // Transactions
app.use('/api/analytics', summary); // Dashboard/Reports
app.use('/api/external', testRouter); // API Sync
app.use('/api/weather', wRouter);   // Weather
/*
Step 7: Streamline Endpoints for React
To make the frontend code cleaner, we will group the routes in app.js using consistent naming conventions.
Update app.js (Route Mapping section):
*/
/*
app.use('/products', pRouter);
app.use('/api', router);
app.use('/mongo-crud', mCrud);
app.use('/', sRouter);
app.use('/summary', summary);
app.use('/advice', wRouter);
app.use('/test', testRouter);
*/
app.get('/test', async (req,res) => {
    try {
        const[rows] = await mysql.query("SELECT 'MySQL is Ready' AS stat ");
        /*const[row1] = await mysql.query("SELECT 'Checking if this query will print' AS test");
        , mysql:row1[1].test*/
        res.json({
            mysql:rows[0].stat, mongodb: "connected"
        });
    } catch (error) {
        res.status(500).json({error:"Database Connection Error"});
    }
})
app.listen(process.env.PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});