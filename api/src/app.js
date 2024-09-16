const express = require('express')
const app = express()

require("dotenv").config()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(process.env.API_PORT, "0.0.0.0", () => {
    console.log(`Server running on http://127.0.0.1:${process.env.API_PORT}`)
})