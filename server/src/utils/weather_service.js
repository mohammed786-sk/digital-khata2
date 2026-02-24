const axios = require('axios');
const mongoTest = require('../models/mongoTestSchema');

const getWeather = async (city) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        const temp = 30;
        const condition = 'sunny';
        return{city, temp, condition};
    } catch (error) {
        console.error("External weather API failed: ", error.message);
        return null;
    }
};

module.exports = getWeather;