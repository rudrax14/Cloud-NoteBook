const express = require('express');
const app = express();
require("dotenv").config()

app.get('/', (req, res) => {
    res.send('Hello World');
});


// middleware
app.use(express.json());

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

