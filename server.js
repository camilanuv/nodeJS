'use strict'
const mongoose = require('mongoose');
const app = require('./app');
const port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Proyecto-final',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Conectado a BD")
        //Crear el Servidor
        var server = app.listen(port, () =>{
            console.log("Servidor corriendo correctamente en la url: http://localhost:"+port);
        });
    })
    .catch(err => console.log(err));