const express = require('express');
const router = require('./routes');
const app = express()
const DBConnect = require('./config/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const corsOption = {
    credentials: true,
    origin: "*",
}

app.use(express.json({ limit: '5mb' }))
app.use(cors(corsOption))
app.use(cookieParser())
app.use(router)
DBConnect()

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("My Store backend API Server is running")
    //res.status(200).json({ msg: 'My Store backend API' })
})

app.listen(PORT, () => {
    console.log('Server is running...')
})