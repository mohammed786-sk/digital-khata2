const express = require('express');
const app = express();
app.use(express.json());
// 1. DUMMY DATА
const customers = [
{ id: 1, name: 'Suresh' },
{ id: 2, name: 'Mahesh' }
];

app.get('/customers', (req, res) => {
res.json(customers);
});

app.get('/customers/:id', (req, res) => {
const id = req.params.id;
res.send(`Loking for ID ${id}`);
});

app.post('/customers', (req, res) => {
    const newCustomer = req.body; 
    console.log("New Customer Received:", newCustomer);
    res.status(201).json({ message: "Customer Saved!", data: newCustomer });
});

app.post('/calculate-bill', (req, res) => {
    const { item, price, quantity } = req.body; 

    if (!item || !price || !quantity || quantity <2) {
        return res.status(400).json({ 
            error: "Incomplete slip! Please provide item, price, and quantity." 
        });
    }

    const totalAmount = price * quantity;
    console.log(req.body);
    res.json({
        message: "Order received by Ramesh Kaka",
        item: item,
        total: `${totalAmount}`,
        status: "Ready for Billing"
    });
});


app.listen(3001, ()=>{
    console.log("Server started on port 3001")
});