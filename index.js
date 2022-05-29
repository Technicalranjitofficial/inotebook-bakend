require('dotenv').config();
const connectToMongose = require('./db')

connectToMongose();
const express = require('express')
const app = express()
var cors = require('cors');
const { route } = require('./routes/auth');

app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.json("Connected")
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
// app.use('/api/notes',require('./routes/notes'))
const PORT = process.env.PORT || 4000;
app.listen(PORT)