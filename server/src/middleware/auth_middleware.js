require('dotenv').config();

const authenticateStaff = (req, res, next) => {
    const staffKey = req.headers['x-api-key'];
    const validKey = process.env.API_KEY;

    if (staffKey && staffKey === validKey) {
        console.log("Staff Access Granted");
        return next(); // Proceed to the controller
    } else {
        console.log("Unauthorized Access Attempt");
        return res.status(401).json({ 
            success: false, 
            error: "Unauthorized: Invalid or missing Staff API Key" 
        });
    }
};

module.exports = authenticateStaff;
/*
Step 4: Staff Authentication via .env
The Implementation Plan:
Strict Middleware: Update middleware/auth_middleware.js to ensure it stops the request if the key is missing or wrong (handling the "hanging request" bug in your original code).
Env Validation: Use process.env.API_KEY for a direct comparison.
4.1 Updated middleware/auth_middleware.js
*/