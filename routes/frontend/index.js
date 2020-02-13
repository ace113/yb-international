const express = require('express')
const router = require('express-promise-router')();

router.route('/')
.get((req,res)=> res.render('frontend/index', {layout: 'frontend_layout'}))

module.exports = router;