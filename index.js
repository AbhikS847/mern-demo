const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

const dotenv = require('dotenv');

const homeRoute = require('./routes/homepage');

const reigsterRoute = require('./routes/register');

const loginRoute = require('./routes/login');

const connectDB = require('./data/db');

dotenv.config();

connectDB();

app.use(express.json({extended:false}));

app.listen(port, () => {console.log(`Server is successfully running on port ${port}`)});

app.use('/',homeRoute);
app.use('/register',reigsterRoute);
app.use('/login',loginRoute);
