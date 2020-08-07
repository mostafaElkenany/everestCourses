const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

//mongoose set up
mongoose.connect(
    process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (error) => {
        if (error) throw error;
        console.log("MongoDB connection established");
    })

//express set up
const app = express();

app.use(express.json());
app.use(cors());


//routes set up
app.use("/", userRouter);

//error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server working on port ${port}`))

