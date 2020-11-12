const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, ) => {
    console.log(req.session.admin)
    res.render('admin', {
        title: 'Admin'
    });
});

module.exports = router;