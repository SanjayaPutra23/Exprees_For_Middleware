const express = require('express');
const app = express();
morgan = require('morgan');

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
    res.send('Perlu masukkan password');
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/halaman', (req, res) => {
    console.log(req.timeRequest);
    res.send('Hello Halaman!');
});

app.get('/admin', auth, (req, res) => {
    res.send('Hello admin!');
});

app.use((res, res) => {
    res.statusCode(404).send('Page Not Found')
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})