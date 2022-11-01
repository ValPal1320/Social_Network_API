// Require express and mongoose
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

// Connect mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Log mongoose queries
mongoose.set("debug", true);

// Listen on PORT 3001
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ${activity} running on port ${PORT}!`);
    });
});