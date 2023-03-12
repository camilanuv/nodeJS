'use strict'
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");
var usuarios = require('../models/usuarios');
var Sessions = require('../models/sessions');

var auth = {
    login: function(req, res){
    //Validamos los datos que se envian al endpoint
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let login_info = req.body

        usuarios.findOne({mail: login_info.mail, password: login_info.password}).exec((err, usuario) => {
                if(err) return res.status(500).json({status: 500,  mensaje: err});
                if(!usuario) return res.status(200).json({status: 200,  mensaje: "No se encontro el usuario :("});

                const payload = {
                    user_id : usuario.id              
                };
                const access_token = jwt.sign(payload, 'i1z16fcjgEUDEh3C74QYBcuts5eplQEbCpL8m8M5PFK6aDEG0V', {
                    expiresIn: '1d'
                });

                let update = {
                    user_id: usuario.id,
                    jwt: access_token
                }

                Sessions.findOneAndUpdate({user_id: usuario.id},update, {upsert:true, new:true}, (err, sessionsUpdate)=>{
                    if(err) return res.status(500).send({message:err});
                    if(!sessionsUpdate) return res.status(404).send({message:"Datos erroneos"});
                    return res.status(200).json({
                        status: 200, 
                        message: "Autenticación correcta", 
                        token: access_token
                    })
                } );    
        });
    },

    logout: function(req, res){
       console.log(req.decoded)
       Sessions.findOneAndRemove({user_id: req.decoded.user_id}, (err, sessionDelete) => {
        if(err) return res.status(500).send({message:err});
        if(!sessionDelete) return res.status(404).send({message:"No se logro hacer el logout"});
        return res.status(200).send({
            message: "Usuario logout"
        })
       })
    },  
};

module.exports = auth;