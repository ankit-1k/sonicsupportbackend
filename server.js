const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to require the path module
const connectDB = require('./srcnode/db/db');
const appModalRoutes = require('./srcnode/router/router');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
connectDB();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Use routes
app.use(appModalRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
