var createError = require('http-errors');
var cookieSession = require('cookie-session')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // służy do zrzucania logóww trybie developperskim
var config = require('./routes/config'); // importuje dane o cookies z pliku
const mongoose = require('mongoose');

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


mongoose.connection.on('connected', function () {
  console.log('polączyło z bazą')
});
// sprawdza połączenie
mongoose.connection.on('error', function () {
  console.log('Nie połączyło z bazą')
});


var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');
var quizRouter = require('./routes/quiz');
var adminRouter = require('./routes/admin');


var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: config.keySessions,
  // jako value importuje wartości z routes/config.js
  // Cookie Options
  maxAge: config.maxAgeSession
}))
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  res.locals.path = req.path; // dzięki przekazaniu req.path do locals będzie on dostępny globalnie. jest to zrobione po to aby przenieść ścieżkę do szablonu pug, a że req.path to zmienna lokalna to nie może być przekazana inaczej niż przez zmienną globalną locals. tak więc ściezka jest teraz dostępna w szablonach a path w res.locals jest zmienną do której się odwołujemy i może mieć dowolną nazwę
  next()
})

app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;