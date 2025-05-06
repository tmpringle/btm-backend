// local setup
require('dotenv').config()

// setup
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.use(cors());

// Get weather code ID for weather at passed in latitude and longitude
app.get('/weather-code-id', (req, res) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    
    fetch(getApiUrl(latitude, longitude))
        .then((response) => response.json())
        .then((data) => {
            fetchedWeatherCode =
                data.data.timelines[0].intervals[0].values.weatherCode;

            const responseData = { "weatherCode": fetchedWeatherCode };
            res.json(responseData);
        })
        .catch(() => {
            res.status(500).json({ error: "Error fetching data from Tomorrow.io API" });
        })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function getApiUrl(lat, lon) {
    return `https://api.tomorrow.io/v4/timelines?location=${lat}%2C%20${lon}&fields=weatherCode&timesteps=current&apikey=${API_KEY}`
}