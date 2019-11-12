// Фреймворк веб-приложений.
const express = require('express');
const app = express();
// HTTP request logger middleware for node.js.
// Логгирование деталей запросов.
const morgan = require('morgan');
app.use(morgan('dev'));

require("dotenv").config();

const path = require('path');

// Обработка POST запросов.
// urlencoded.
app.use(express.urlencoded({ extended: true }));
// json.
app.use(express.json());

// Подключаем mongoose.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/venue-categories', { useNewUrlParser: true, useUnifiedTopology: true });

// Импорт маршрутов.
const indexRouter = require('./routes/index');

// Подключаем статику
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем views(hbs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/', indexRouter);

// Обработка ошибок.
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
