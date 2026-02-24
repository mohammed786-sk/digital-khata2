const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    userID: { type: Number },
    id: { type: Number },
    title: { type: String },
    body: { type: String }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

testSchema.index({id:1}, {unique:true});
const test = mongoose.model("test", testSchema);

module.exports = test;
/*
Step 3 Refinement: Timestamp & Rate Limiting
To keep this minimal, we will use Mongoose's built-in timestamp feature and a simple "time-difference" check in the utility. This avoids adding a rate-limit package.
1. Update models/mongoTestSchema.js
We enable timestamps to automatically track updatedAt.
*/

/* const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    userID: {
        type: Number
    },
    id: {
        type: Number
    },
    title: {
        type: String
    },
    body: {
        type: String
    }
});
testSchema.index({id:1}, {unique:true});
const test = mongoose.model("test", testSchema);

module.exports = test;
*/
