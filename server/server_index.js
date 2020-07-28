// Initialize express and calles app.listen
const express = require('express');
const path = require('path');
const applyRoutes = require('./routes/routes_index');

const app = express();

const PORT = process.env.PORT || 3000;

const DIST_PATH = path.join(__dirname, '../dist');
const PUBLIC_PATH = path.join(__dirname, '../public');

applyRoutes(app);

app.use('/dist', express.static(DIST_PATH));
app.use(express.static(PUBLIC_PATH));

app.listen(PORT, () => console.log(`Server is running in PORT ${PORT}`));
