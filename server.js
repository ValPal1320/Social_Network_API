// Require express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

// Log mongoose queries
mongoose.set("debug", true);

// Listen on PORT 3001
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});