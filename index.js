
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const membernew = require('./routes/membernew');
const login = require('./routes/login');
const express = require('express');
const app = express();
// 망고디비에 연결
mongoose.connect('mongodb://localhost/1')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/API/membernew', membernew);
app.use('/API/login', login);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
