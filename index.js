
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//API 리스트
const membernew = require('./routes/membernew');
const login = require('./routes/login');
const accountnew = require('./routes/accountnew');
const send = require('./routes/send');
const getbalance = require('./routes/getbalance');
const transaction = require('./routes/transaction');


/*
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieSession = require('cookie-session');
const flash = require('connect-flash');



//세션은 1시간!!
app.use(cookieSession({
  keys: ['node_yun'],
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));

app.use(flash());

//passport를 시행
app.use(passport.initialize());
app.use(passport.session());
*/

// 망고디비에 연결
mongoose.connect('mongodb://localhost/1')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

//사용할 API
app.use(express.json());
app.use('/API/membernew', membernew);
app.use('/API/login', login);
app.use('/API/accountnew',accountnew);
app.use('/API/send',send);
app.use('/API/getbalance',getbalance);
app.use('/API/transaction',transaction);


//포트 연결
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
