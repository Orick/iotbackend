const express = require('express');
const router = express.Router();
const models = require('../models');
/* GET home page. */
router.get('/', (req, res) => {
    res.json({
        title: 'Nothing?'
    })
});

module.exports = router;


