require('dotenv').config();
const mysqlDB = require("./config/db_mysql");

const custId = 10;
const lastItemSql =
  "SELECT * FROM transactions WHERE customer_id = ? ORDER BY id DESC";
const print = async () => {
  try {
    const [lastDebtItem] = await mysqlDB.execute(lastItemSql, [custId]);
    console.log(lastDebtItem);
    const lastItemName = lastDebtItem[2].item_name;
    console.log(lastItemName);
  } catch (error) {
    console.error(error.message);
  }
};
(async () => {
  await print();
  await mysqlDB.end(); 
})();
