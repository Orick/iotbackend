const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');


const indexRouter = require('./routes/index');
const userRouter =  require('./routes/user');
const groupRouter = require('./routes/groups');
const placeRouter = require('./routes/place');
const levelRouter = require('./routes/level');
const ibeaconRouter = require('./routes/ibeacon');
const positionRouter = require('./routes/position');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);



//  Orick  Begin //
app.use('/user', userRouter);
app.use('/groups', groupRouter);
app.use('/place', placeRouter);
app.use('/level', levelRouter);
app.use('/ibeacon', ibeaconRouter);
app.use('/position', positionRouter);

//  Orick  End //



// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
