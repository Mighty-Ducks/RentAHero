// app.use for all the diffrent routes
const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => { // send index.html to root page
    res.sendFile(path.join(__dirname, '../index.html'));
})

app.use('/assets', express.static(path.join(__dirname, '../assets')));


