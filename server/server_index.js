// Initialize express and calles app.listen
const express = require('express');
const apiRouter = require('./routes/routes_index');

const app = express();

app.use('/api', apiRouter);

const startServer = (PORT) => {
    return new Promise ((res) => {
        app.listen(PORT, () => {
            console.log(`Server is now running at PORT: ${PORT}`);
        })
    })
}

module.exports = app;