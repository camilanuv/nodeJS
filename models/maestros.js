'use stric'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaestrosSchema = Schema({
    n_cuenta: { type: Number, require: true, unique: true },
    Nombre: { type: String, require: true },
    Apellido: { type: String, require: true },
    Edad: { type: Number, require: true},
    Materia: { type: String, require: true },
    Genero: { type: String, require: true },
    Año_Graduado: { type: String, require: true }
});

module.exports = mongoose.model('maestros', MaestrosSchema);