'use strict'
const jwt = require('jsonwebtoken');
let Sessions = require('../models/sessions')

const middlewares = {
    userProtectUrl: function(req, res, next){
        const token = req.headers['access-token'];
        if(token){
            jwt.verify(token, 'i1z16fcjgEUDEh3C74QYBcuts5eplQEbCpL8m8M5PFK6aDEG0V', (err, decoded) => {
                if(err){
                    return res.status(403).json({message: "Token not valido"});
                } else {
                    req.decoded = decoded;
                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err, session)=>{
                        if(err) return res.status(500).send({message: "Error al devolver los datos"});
                        if(!session) return res.status(404).send({message: "Los datos de autenticación no son validos"});
                            
                        next();
                    });
                
                }
            });
        } else {
            res.status(403).send({
                message: "Token invalido"
            });
        }
    }
};

module.exports = middlewares;