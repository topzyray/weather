import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = "8e9bc7649677991abb22cec8c1e3cdc9";
const URL = "http://api.openweathermap.org/data/2.5/weather"

// http://api.openweathermap.org/data/2.5/weather?q=Akure&appid=8e9bc7649677991abb22cec8c1e3cdc9

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post("/", async (req, res) => {
    let city = req.body.city;

    try {
        const response = await axios.get(`${URL}?q=${city}&appid=${apiKey}`)
        const result = response.data;

        res.render('index.ejs', {
            city,
            content: result,
            icon: `<img src=https://openweathermap.org/img/w/${result.weather[0].icon}.png alt=${result.weather[0].description}`,
            mapUrl: `https://openweathermap.org/weathermap?zoom=12&lat=${result.coord.lat}&lon=${result.coord.lon}`
        })
    } catch (error) {
        console.log(error.message);
        res.render('index.ejs', {
            error: error.message,
        })
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})