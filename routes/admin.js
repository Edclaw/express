const express = require('express');
const News = require('../models/news');
const {
    NotExtended
} = require('http-errors');
const router = express.Router();




router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');
        return;
    } // kiedy nie istnieje parametr admin sesji i dokonujemy przekierowania to kiedy jest next() to wywali błąd dlatego trzeba zakończyć returnem . '*' reprezentuje adres i oznacza że ta funkcja zadziała w całej przestrzeni nazw admin
    next();
}); // sprawdza czy istniej sesja(czy jest zalogowany czyli flaga jest 1 - true),jezeli nie istnieje to dokona przekierowania

/* GET home page. */
router.get('/', (req, res, ) => {

    console.log(req.session.admin)
    res.render('admin/index', {
        title: 'Admin'
    });
});

router.get('/news/add', (req, res, ) => {
    res.render('admin/news-form', {
        title: 'Dodaj news',
        body: {},
        errors: {}
    });
}) //formulaż dodawanie newsów

router.post('/news/add', (req, res, ) => {

    const body = req.body
    const newsData = new News(body);
    const errors = newsData.validateSync(); // tu będą błedy ktore mogą wystąpić

    newsData.save((err) => {
        console.log(err);
    }); // obsługuje zapisanie newsa na atlasie


    res.render('admin/news-form', {
        title: 'Dodaj news',
        errors,
        body
    });
}); // przechwytuje dane z formulaza i zapisuje w bazie

module.exports = router;