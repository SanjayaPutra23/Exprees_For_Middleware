const express = require('express');
const app = express();
morgan = require('morgan');

const ErrorHandler = require('./ErrorHandler');

app.use(morgan('dev'));
app.use((req, res, next) => {
    req.timeRequest = Date.now();
    console.log(req.method, req.url);
    next();
})

const auth = (req, res, next) => {
    const { password } = req.query;
    if (password === 'AdaUdang') {
        next();
    }
    // res.send('Perlu masukkan password');
    throw new ErrorHandler('Perlu masukkan password', 401);
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/halaman', (req, res) => {
    console.log(req.timeRequest);
    res.send('Hello Halaman!');
});

app.get('/erorr', (req, res) => {
    bird.fly();
});

app.get('/admin', auth, (req, res) => {
    res.send('Hello admin!');
});

app.get('/general/error', (req, res) => {
    throw new Errorhandler();
});

// app.use((err, req, res, next) => {
//     console.log('****************************');
//     console.log('***********ERROR************');
//     console.log('****************************');
//     next(err);
// });

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
});

app.use((res, res) => {
    res.statusCode(404).send('Page Not Found')
});



app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})