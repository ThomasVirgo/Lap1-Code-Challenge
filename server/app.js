const express = require('express');
const cors = require('cors');
const app = express();


//MIDDLEWARE
app.use(cors());
app.use(express.json());


//ROUTES
app.get('/search', (req,res) => {
    res.json('Hi')
})

module.exports = { app };