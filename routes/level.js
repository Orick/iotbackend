const express = require('express');
const router = express.Router();
const models = require('../models');
const firebaseAdmin = require('../config/firebaseConfig');


router.post('/create',(req,res,next)=>{
    models.place.findOne({
        where:{
            id: req.body.placeId
        }
    }).then(place => {
        if (place){
            models.level.create({
                nombre: req.body.nombre,
                mapa: req.body.mapa
            }).then(level => {
                if(level){
                        place.addPlaceLevel(level);
                        res.json({
                            code: 1,
                            description:'Level creado y asociado'
                        })
                }else{
                    res.json({
                        code: 0,
                        description:'Level no creado',
                    });    
                }
            }).catch(error => {
                res.json({
                    code: 0,
                    description:'Level no creado, error db',
                    error
                });
            })
        }else{
            res.json({
                code: 0,
                description:'Level no creado',
            });
        }
    }).catch(error =>{
        res.json({
            code: 0,
            description:'Level no creado, error db',
            error
        });
    })
});

module.exports = router;