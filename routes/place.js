const express = require('express');
const router = express.Router();
const models = require('../models');
const firebaseAdmin = require('../config/firebaseConfig');


router.post('/create',(req,res,next)=>{
        //req.body.nombre
        
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
    //req.body.idgroup
    //req.body.idplace
    models.groups.findOne({
        where:{
            id: req.body.idgroup
        }
    }).then(group => {
        if(group){
                models.place.findOne({
                    where:{
                        id: req.body.idplace
                    }
                }).then(place => {
                    if(place){
                            console.log("place encontrado");
                            group.setPlace(place);
                            console.log("place asociado");
                            res.json({
                                code: 1,
                                description:'group asociado a place '+req.body.idplace
                            });
                    }else{
                        res.json({
                            code: 0,
                            description:'Grupo no encontrado',
                        });    
                    }
                }).catch(error => {
                    res.json({
                        code: 0,
                        description:'Grupo encontrado, error db',
                        error
                    });
                })
        }else{
            res.json({
                code: 0,
                description:'Usuario no encontrado'
            });
        }
    }).catch(error => {
        res.json({
            code: 0,
            description:'Error DB',
            error
        });
    });
});


router.post('/getAll',(req,res,next)=>{
    //req.body.idgroup
    //req.body.idplace
    models.place.findAll({
        include:{
            model: models.level,
            as: 'placeLevel'
        }
    }).then(places => {
        if(places){
            res.json({
                code: 1,
                places
            });
        }else{
            res.json({
                code: 0,
                description:'No hay places'
            });
        }
    }).catch(error => {
        res.json({
            code: 0,
            description:'Error DB',
            error
        });
    });
});






module.exports = router;
