const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

require('dotenv').config();


//express set up
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server working on port ${port}`))

//mongoose set up
mongoose.connect(
    process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error) => {
        if (error) throw error;
        console.log("MongoDB connection established");
    })

//routes set up
app.use("/users", userRouter);
