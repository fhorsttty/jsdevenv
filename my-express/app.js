const bodyParser = require('body-parser');
const createError = require('http-errors');
const debug = require('debug')('app');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const config = require('./config');

const app = express();

// logging
app.use(morgan('short'));

// static files
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware: html body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routers
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = config.app.port || 3000;
app.listen(port);

debug(`listen on port: '${port}'`);
