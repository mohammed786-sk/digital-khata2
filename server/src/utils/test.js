const axios = require('axios');
const mongoTest = require('../models/mongoTestSchema');

const tester = async () => {
    try {
        // Simple Rate Limit: Check if the specific ID was updated in the last 60 seconds
        const existingDoc = await mongoTest.findOne({ id: 1 });
        if (existingDoc && (new Date() - existingDoc.updatedAt < 60000)) {
            return { exist: false, error: "Sync rate limit reached. Try again in a minute." };
        }

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        const { userId, id, title, body } = response.data;

        const savedData = await mongoTest.findOneAndUpdate(
            { id: id },
            { userID: userId, title: title, body: body },
            { upsert: true, new: true }
        );

        return { exist: true, data: savedData };
    } catch (error) {
        return { exist: false, error: error.message };
    }
};

module.exports = tester;
/*
2. Update utils/test.js (With Rate Limit Logic)
We check the updatedAt field before making the external call.
*/
/*
const tester = async () => {
    try {
        // 1. Fetch from External API
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        const { userId, id, title, body } = response.data;

        // 2. Map & Save to MongoDB (Upsert logic)
        // This finds a doc with API 'id', updates it with new data, or creates it if missing.
        const savedData = await mongoTest.findOneAndUpdate(
            { id: id }, // Filter by API ID
            { userID: userId, title: title, body: body }, // Update fields
            { upsert: true, new: true } // Create if missing, return the updated doc
        );

        return { exist: true, data: savedData };
    } catch (error) {
        console.error("External API Persistence failed: ", error.message);
        return { exist: false, error: error.message };
    }
};
*/


/*
The Implementation Plan:
Refactor Utility: Update utils/test.js to handle the data mapping.
Idempotency (Upsert): Use MongoDB's findOneAndUpdate with upsert: true. This ensures that if you hit the external API multiple times, you don't create duplicate records for the same API ID.
Route Integration: Ensure routes/test.js returns the newly saved/updated document.
3.1 Updated utils/test.js
We will fetch the data and persist it immediately.
*/

/*
const axios = require('axios');
const mongoTest = require('../models/mongoTestSchema');
const express = require('express');

const app = express();
app.use(express.json());

const tester = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        const {userID, id, title, body} = response.data;
        const newTest_input = new mongoTest({userID, id, title, body} );
        const tested = await newTest_input.save();
        console.log(tested);
        if(tested.length == 0){
            return {exist:false, data: null};
        } else{
            return {exist:false, data: tested};
        }
        
    } catch (error) {
        console.error("External API failed: ", error.message);
        return {error: error.message};
    }
};

module.exports = tester;
*/