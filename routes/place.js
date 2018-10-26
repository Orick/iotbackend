const express = require('express');
const router = express.Router();
const models = require('../models');
const firebaseAdmin = require('../config/firebaseConfig');


router.post('/create',(req,res,next)=>{
        models.place.create({
            Nombre: req.body.nombre
        }).then(place => {
            if(place){
                res.json({
                    code: 1,
                    description:'Lugar creado'
                })
            }else{
                res.json({
                    code: 0,
                    description:'Lugar no creado',
                });    
            }
        }).catch(error => {
            res.json({
                code: 0,
                description:'Lugar no creado, error db',
                error
            });
        });
});

router.post('/asing',(req,res,next)=>{
    res.json({
        code: 0,
        description:'NADA ASING'
    });    
});





module.exports = router;
