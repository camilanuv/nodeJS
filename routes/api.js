'use strict'
const express = require('express');
const api = express.Router();
const { body } = require('express-validator');

var WelcomeController = require('../controllers/welcome');
var MaestrosController = require('../controllers/maestros');
var MaestroController = require('../controllers/maestros');
let AuthController = require('../controllers/auth');

var userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get("/", WelcomeController.welcome);
api.get("/maestros", MaestrosController.maestros);
api.get("/maestro/:n_lista", MaestroController.maestro);
api.post("/crear-maestro",[
    body('n_cuenta').not().isEmpty(),
    body('Nombre').not().isEmpty(),
    body('Apellido').not().isEmpty(),
    body('Edad').not().isEmpty(),
    body('Materia').not().isEmpty(),
    body('Genero').not().isEmpty(),
    body('Año_Graduado').not().isEmpty()
], MaestrosController.crear_maestros);
api.put("/maestro/:n_lista",[
    body('Nombre').not().isEmpty(),
    body('Apellido').not().isEmpty(),
    body('Edad').not().isEmpty(),
    body('Materia').not().isEmpty(),
    body('Genero').not().isEmpty(),
    body('Año_Graduado').not().isEmpty()
], MaestrosController.update_maestros); 
api.delete("/maestro/:n_lista", MaestrosController.delete_maestros);


api.post("/login", [
    body('mail').not().isEmpty(),
    body('password').not().isEmpty()
],AuthController.login);
api.post("/logout",  userProtectUrl, AuthController.logout);

module.exports = api;