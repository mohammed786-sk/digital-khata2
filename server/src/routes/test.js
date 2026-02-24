/*
3.2 Simplified routes/test.js
The route now simply triggers the utility and returns the result.
*/
const testRouter = require("express").Router();
const tester = require("../utils/test");

testRouter.get("/", async (req, res) => {
    const output = await tester();
    if (output.exist) {
        res.status(200).json({ 
            message: "Data fetched and synced to MongoDB", 
            data: output.data 
        });
    } else {
        res.status(500).json({ 
            message: "Sync failed", 
            error: output.error 
        });
    }
});

module.exports = testRouter;

/*
const testRouter = require("express").Router();
const tester = require("../utils/test");

testRouter.get("/", async (req, res) => {
  const output = await tester();
  if (output.exist) {
    res
      .status(200)
      .json({ message: `External API suceeded`, data: `${output.data}` });
  } else if (output.data == null) {
    res.status(400).json({ message: `External API is empty`, data: null });
  } else {
    res.status(500).json({ message: `Internal Error: ${output.error}` });
  }
});

module.exports = testRouter;
*/