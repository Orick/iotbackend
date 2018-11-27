const express = require('express');
const router = express.Router();
const models = require('../models');
const firebaseAdmin = require('../config/firebaseConfig');


router.post('/create',(req,res,next)=>{
    firebaseAdmin.auth().verifyIdToken(req.body.token)
    .then(decodedToken => {
        models.user.findOne({
            where:{
                token:decodedToken.uid
            }
        }).then(user => {
            if(user){
                    models.groups.create({
                        Nombre: req.body.nombre
                    }).then(group => {
                        if(group){
                                console.log("grupo creado");
                                user.addUserGroup(group);
                                console.log("grupo asociado");
                                res.json({
                                    code: 1,
                                    description:'Grupo creado y asociado'
                                })
                        }else{
                            res.json({
                                code: 0,
                                description:'Grupo no creado',
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

    }).catch(error =>{
        res.json({
            code:0,
            description:'error al verificar token de usuario',
            error
        });
    });
});

router.post('/asing',(req,res,next)=>{
    //req.body.idgroup
    //req.body.emailToAsing                
    models.user.findOne({
        where:{
            email:req.body.emailToAsing
        }
    }).then(user => {
        if(user){
                models.groups.findOne({
                    where:{
                        id: req.body.idgroup
                    }
                }).then(group => {
                    if(group){
                            console.log("grupo encontrado");
                            user.addUserGroup(group);
                            console.log("grupo asociado");
                            res.json({
                                code: 1,
                                description:'Grupo asociado a usuario '+req.body.emailToAsing
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


router.post('/getall',(req,res,next)=>{
    //req.body.token
    
    firebaseAdmin.auth().verifyIdToken(req.body.token)
    .then(decodedToken => {
        models.user.findOne({
            where:{
                token:decodedToken.uid
            },
            include:{
                model: models.groups,
                as: 'userGroup'
            }
        }).then(user => {
            if(user){
                res.json({
                    code: 1,
                    groups: user.userGroup
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
            code:0,
            description:'error al verificar token de usuario',
            error
        });
    });
});




module.exports = router;
