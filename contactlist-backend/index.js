const express = require('express');
const mongoose = require('mongoose');
const userRoute = require("./routes/auth")
const contactRoute = require("./routes/contacts")
const cors = require("cors");
const auth = require('./middleware/auth');

const app = express();

require('dotenv').config();

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());
// ------------------------------------------------

app.use(cors({
    origin: '*'
}))
app.use("/api/auth", userRoute);
app.use("/api/contacts", contactRoute);
app.get("/protected", auth, (req,res) =>{
    return res.json({user: req.user});
})


// -------------------------------------------------

app.listen(8800, () => {
    console.log(`Server Started at ${3000}`)
})
