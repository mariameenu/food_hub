require('dotenv').config();
var cors = require('cors');
const PORT = process.env.PORT || 5001 ; // Ensure PORT is defined


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const mongoose = require('mongoose');

var router = express.Router();


mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var orderRouter = require('./routes/orders');


var app = express();
app.use(cors());


app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/orders',orderRouter);



module.exports = app;


