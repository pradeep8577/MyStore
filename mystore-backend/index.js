const express = require('express');
const router = require('./routes');
const app = express()
const DBConnect = require('./config/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['https://mystore-dashboard.vercel.app','*','lohttp://localhost:4000'],
    credentials: true,
  })
);


app.use(cookieParser())
app.use(router)
DBConnect()

const PORT = process.env.PORT || 5000;

// // middlewares
app.use((req, res, next) => {
  console.log("http method->" + req.method + ",URL->" + req.url);
  next();
});


app.get('/', (req, res) => {
    res.send("My Store backend API Server is running")
    //res.status(200).json({ msg: 'My Store backend API' })
})

app.listen(PORT, () => {
    console.log('Server is running...')
})