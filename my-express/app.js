const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const morgran = require('morgran');
const config = require('./config');

const app = express();

// static files
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// html body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routers
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

const port = config.app.port || 3000;
app.listen(port);

debug(`listen on port: '${port}'`);
