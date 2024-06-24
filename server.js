const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./srcnode/db/db');
const appModalRoutes = require('./srcnode/router/router');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
connectDB();

// Use routes
app.use(appModalRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});