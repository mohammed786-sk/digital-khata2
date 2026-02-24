const getWeather = require('../utils/weather_service');

const advice = async (req,res) => {
    const weather = await getWeather("Khanapur");

    if(!weather){
        return res.status(500).json({error: "Could not connect to external weather service"});
    };

    let stockadvice = "Keep regular stock";
    if(weather.temp > 30) stockadvice = "Stock more Cool Drinks";
    if(weather.condition == "raining") stockadvice = "Stock Umbrellas";
    res.json({
        current_weather: weather,
        advice: stockadvice
    });
};

module.exports = advice;