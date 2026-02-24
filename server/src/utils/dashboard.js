const router = require("express").Router();
const mysqlDB = require("../config/db_mysql");
const product = require("../models/productSchema");

router.get("/dashboard/:id", async (req, res) => {
  try {
    const custId = req.params.id;
    const debtSql =
      "SELECT customers.customer_name, SUM(transactions.amount) AS totaldebt FROM customers LEFT JOIN transactions ON customers.id = transactions.customer_id WHERE customers.id = ?";
    const lastItemSql =
      "SELECT item_name FROM transactions WHERE id = ? ORDER BY id DESC LIMIT 1";
    const [debtQuery] = await mysqlDB.execute(debtSql, [custId]);
    if (debtQuery.length == 0) {
      res.status(404).json({ error: "Customer not found" });
    }
    const [lastDebtItem] = await mysqlDB.execute(lastItemSql, [custId]);
    const lastItemName = lastDebtItem[0].item;
  } catch (error) {}
});
