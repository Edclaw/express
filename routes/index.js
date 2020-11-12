const express = require('express');
const router = express.Router();
const login = 'admin'
const password = '123'

/* GET home page. */
router.get('/', (req, res, ) => {
  res.render('index', {
    title: 'Strona główna'
  });
});

router.get('/login', (req, res, ) => {
  res.render('login', {
    title: 'Logowanie'
  });
});

router.post('/login', (req, res, ) => {
  const body = req.body;
  if (body.login === login && body.password === password) {
    req.session.admin = 1; // gdzie admin to nazwa sesji a 1 to flaga która będzie aktywna tylko kiedy uda się zalogować do panelu amina, a samo req.session przechowuje informacje o sesji i jest z expressa, chyba
    res.redirect('/admin')
  } else {
    res.redirect('/login')
  } // jeżeli hasło się zgadza to przekieruj do admin, jeżeli nie to przekiruj ponownie do login

  console.log(req.body) // dane z fromularza o logowaniu przechowywane są w req.body


});


module.exports = router;