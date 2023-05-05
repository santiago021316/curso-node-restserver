const {response,request}  = require('express')


const usuariosGet = (req = request, res = response) => {

    const query = req.query;
  
    res.json({
    msg:'get API - controlado Get',
    query
    })
}

const usuariosPost = (req = request, res = response) => {
    const {nombre,edad} = req.body
    
    res.json({
    msg:'get API - controlador Post',
    nombre,
    edad
    })
}

const usuariosPut = (req , res = response) => {

     const id = req.params.id;

    res.json({
     msg:'get API - Controlador Put',
     id
    })
}

const usuariosPatch = (req,res = response) => {
    res.json({
     msg:'get API - Controlador Patch'   
    })
}

const usuariosDelete = (req , res = response) => {
    res.json({
     msg:'get API - controlador Delete'   
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}