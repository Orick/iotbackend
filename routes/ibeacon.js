const express = require('express');
const router = express.Router();
const models = require('../models');
const firebaseAdmin = require('../config/firebaseConfig');


router.post('/create',(req,res,next)=>{
    models.ibeacon.create({
        id: req.body.id,
        posx: req.body.posx,
        posy: req.body.posy
    }).then(ibeacon => {
        if(ibeacon){
                console.log("ibeacon creado");
                res.json({
                    code: 1,
                    description:'ibeacon creado'
                })
        }else{
            res.json({
                code: 0,
                description:'ibeacon no creado',
            });    
        }
    }).catch(error => {
        res.json({
            code: 0,
            description:'ibeacon no creado, error db',
            error
        });
    })
});

router.post('/asing',(req,res,next)=>{
    //req.body.idibeacon
    //req.body.idlevel                
    models.ibeacon.findOne({
        where:{
            email:req.body.idibeacon
        }
    }).then(ibeacon => {
        if(ibeacon){
                models.level.findOne({
                    where:{
                        id: req.body.idlevel
                    }
                }).then(level => {
                    if(level){
                            console.log("level encontrado");
                            level.addLevelIbeacon(ibeacon);
                            console.log("ibeacon asociado");
                            res.json({
                                code: 1,
                                description:'ibeacon asociado a level '+req.body.idlevel
                            })
                    }else{
                        res.json({
                            code: 0,
                            description:'Grupo no encontrado',
                        });    
                    }
                }).catch(error => {
                    res.json({
                        code: 0,
                        description:'Grupo no creado, error db',
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

module.exports = router;
