'use strict'
const { validationResult } = require('express-validator');

var MaestrosM = require('../models/maestros');

var controller = {
    maestros: function(req, res){
        MaestrosM.find({}).exec((err, maestros) => {
            if(err) return res.status(500).json({status: 500,  mensaje: err});
            if(!maestros) return res.status(200).json({status: 200,  mensaje: "No hay maestros"});
            return res.status(200).json({status: 200, data: maestros})
        });
    },
    maestro: function(req, res){
        let n_lista = req.params.n_lista;
        MaestrosM.findOne({n_cuenta: n_lista}).exec((err, maestro) => {
            if(err) return res.status(500).json({status: 500,  mensaje: err});
            if(!maestro) return res.status(200).json({status: 200,  mensaje: "No se encontro el maestro"});
            return res.status(200).json({status: 200, data: maestro})
        });
    },  
    crear_maestros: function(req, res){
        //validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        let user_info = req.body;

        console.log(user_info)
        MaestrosM.findOne({n_cuenta: user_info.n_cuenta}).exec((err, maestro) => {
            if(err) return res.status(500).json({status: 500,  mensaje: err});
            if(maestro) return res.status(200).json({status: 200,  mensaje: "El número de cuenta del Maestro ya existe"}); 

            let maestros_model = new MaestrosM();

            maestros_model.n_cuenta = user_info.n_cuenta
            maestros_model.Nombre = user_info.Nombre
            maestros_model.Apellido = user_info.Apellido
            maestros_model.Edad = user_info.Edad
            maestros_model.Materia = user_info.Materia
            maestros_model.Genero = user_info.Genero
            maestros_model.Año_Graduado = user_info.Año_Graduado

            maestros_model.save((err, maestroStored) => {
                if(err) return res.status(500).json({status: 500,  mensaje: err});
                if(!maestroStored) return res.status(200).json({status: 200,  mensaje: "No se logro almacenar el maestro"});
            });
            
            return res.status(200).json({
                status: 200,
                menssage: "Usuario almacenado" 
            });

        });
    }, 
    update_maestros: function(req, res){
        //validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        let n_lista = req.params.n_lista;
        let user_info = req.body;

        let maestro_info_update = {
            Nombre : user_info.Nombre,
            Apellido : user_info.Apellido,
            Edad : user_info.Edad,
            Materia : user_info.Materia,
            Genero : user_info.Genero,
            Año_Graduado : user_info.Año_Graduado
        }

        MaestrosM.findOneAndUpdate({n_cuenta: n_lista}, maestro_info_update, {new:true}, (err, maestroUpdate) => {
            if(err) return res.status(500).json({message: 'Error al actualizar'});
            if(!maestroUpdate) return res.status(404).json({message: 'No existe el maestro para actualizar'});

            return res.status(200).json({
                Nombre : maestroUpdate.Nombre,
                Apellido : maestroUpdate.Apellido,
                Edad : maestroUpdate.Edad,
                Materia : maestroUpdate.Materia,
                Genero : maestroUpdate.Genero,
                Año_Graduado : maestroUpdate.Año_Graduado
            });
        });
    },  
    delete_maestros: function(req, res){
        let n_lista = req.params.n_lista;

        MaestrosM.findOneAndRemove({n_cuenta: n_lista}, (err, maestroDelete) => {
            if(err) return res.status(500).json({message: 'Error al eliminar'});
            if(!maestroDelete) return res.status(404).json({message: 'No existe el maestro para Eliminar'});

            return res.status(200).json({
                message: "Maestro Eliminado de la Data"
            });
        })
    }

};

module.exports = controller;