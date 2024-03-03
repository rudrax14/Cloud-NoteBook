const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config()
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.get('/', (req, res) => {
    res.send('Hello World');
});


// middleware
app.use(express.json());
app.use(cors());

// db connection
const dbConnection = require('./db/dbConnection');
dbConnection();

// mounting rote 
const user = require("./routes/User.routes");
const notes = require("./routes/Note.routes");
app.use("/api/v1", user);
app.use("/api/v1", notes);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
});

