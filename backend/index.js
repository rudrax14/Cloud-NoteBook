require('dotenv').config()
const connectToMongo = require('./db')
connectToMongo()
const express = require('express')
const app = express()
//cors
const cors = require('cors')
app.use(cors())


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use(express.json())


// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

