// Initialize express and calles app.listen
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const startServer = (PORT) => {
    return new Promise((res) => {
        app.listen(PORT, () => console.log(`Server is running in PORT ${PORT}`))
    })
}

startServer(PORT);

module.exports = app; // to export to app.use routes and middlewares
