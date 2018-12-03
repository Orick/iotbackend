const express = require('express');
const router = express.Router();
const models = require('../models');
const firebaseAdmin = require('../config/firebaseConfig');


router.post('/poss',(req,res,next)=>{
    //req.body.token
    //req.body.poss,
    //req.body.idibeacon,
    
    firebaseAdmin.auth().verifyIdToken(req.body.token)
    .then(decodedToken => {
        models.user.findOne({
            where:{
                token:decodedToken.uid
            }
        }).then(user => {
            if(user){
                models.ibeacon.findOne({
                    where:{
                        id:req.body.idibeacon
                    }
                }).then(ibeacon => {
                    if(ibeacon){
                        models.position.create({
                            distancia: req.body.poss
                        }).then(position => {
                            if(position){
                                    console.log("position creado");
                                    user.addUserPosition(position);
                                    position.setIbeacon(ibeacon);
                                    res.json({
                                        code: 1,
                                        description:'position creado'
                                    })
                            }else{
                                res.json({
                                    code: 0,
                                    description:'position no creado',
                                });    
                            }
                        }).catch(error => {
                            res.json({
                                code: 0,
                                description:'position no creado, error db',
                                error
                            });
                        })

                    }else{
                        res.json({
                            code: 0,
                            description:'ibeacon no encontrado'
                        });
                    }
                }).catch(error => {
                    res.json({
                        code: 0,
                        description:'Error DB',
                        error
                    });
                });
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

    }).catch(error =>{
        res.json({
            code:'0',
            description:'error al verificar token de usuario',
        });
    });
});

// posicion de todos los del grupo 
router.post('/getgroup',(req,res,next)=>{
    //req.body.idgroup

    ///////////////
    
    models.groups.findOne({
        where:{
            id:req.body.idgroup
        },
        include:{
            model : models.user,
            as: 'userGroup',
            include:{
                model:models.position,
                as: 'userPosition'
            }
        }
    }).then(poss => {
        if(poss){
            res.json({
                code: 1,
                position:poss
            })
        }else{
            res.json({
                code: 0,
                description:'Poss no encontrado'
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
